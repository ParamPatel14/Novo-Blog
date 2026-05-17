"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const net_1 = __importDefault(require("net"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const User_1 = __importDefault(require("./models/User"));
const Post_1 = __importDefault(require("./models/Post"));
const medium_comman_1 = require("@parampatel12/medium-comman");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const preferredPort = Number(process.env.PORT || 4000);
function isPortAvailable(port) {
    return new Promise((resolve) => {
        const tester = net_1.default.createServer()
            .once('error', () => resolve(false))
            .once('listening', () => tester.close(() => resolve(true)))
            .listen(port, '0.0.0.0');
    });
}
async function getAvailablePort(startPort) {
    for (let port = startPort; port < startPort + 20; port += 1) {
        if (await isPortAvailable(port)) {
            return port;
        }
    }
    throw new Error(`No free port found starting from ${startPort}`);
}
function generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET not set');
    return jsonwebtoken_1.default.sign(payload, secret);
}
async function authMiddleware(req, res, next) {
    const authHeader = String(req.headers['authorization'] || '');
    try {
        const user = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_SECRET || '');
        // @ts-ignore
        req.userId = user.id;
        next();
    }
    catch (e) {
        res.status(403).json({ message: 'You are not logged in' });
    }
}
app.post('/api/v1/user/signup', async (req, res) => {
    const body = req.body;
    const parsed = medium_comman_1.signupInput.safeParse(body);
    if (!parsed.success) {
        return res.status(400).json({
            message: 'Inputs not correct',
            issues: parsed.error.issues,
        });
    }
    try {
        const hashed = await bcryptjs_1.default.hash(body.password, 10);
        const user = await User_1.default.create({ email: body.email, password: hashed, name: body.name });
        const token = generateToken({ id: user._id.toString() });
        return res.json({ token });
    }
    catch (e) {
        console.error(e);
        if (e instanceof Error && e.message.includes('duplicate key')) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Invalid' });
    }
});
app.post('/api/v1/user/signin', async (req, res) => {
    const body = req.body;
    const parsed = medium_comman_1.signinInput.safeParse(body);
    if (!parsed.success) {
        return res.status(400).json({
            message: 'Inputs not correct',
            issues: parsed.error.issues,
        });
    }
    try {
        const user = await User_1.default.findOne({ email: body.email }).exec();
        if (!user)
            return res.status(403).json({ message: 'Incorrect creds' });
        const valid = await bcryptjs_1.default.compare(body.password, user.password);
        if (!valid)
            return res.status(403).json({ message: 'Incorrect creds' });
        const token = generateToken({ id: user._id.toString() });
        return res.json({ token });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Invalid' });
    }
});
app.get('/api/v1/user/me', authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const user = await User_1.default.findById(userId).select('name email').exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error fetching user' });
    }
});
app.put('/api/v1/user/me', authMiddleware, async (req, res) => {
    const body = req.body;
    const nextName = String(body.name || '').trim();
    if (!nextName) {
        return res.status(400).json({ message: 'Name is required' });
    }
    try {
        // @ts-ignore
        const userId = req.userId;
        const user = await User_1.default.findByIdAndUpdate(userId, { name: nextName }, { new: true }).select('name email').exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error updating user' });
    }
});
app.get('/api/v1/blog/bulk', async (_req, res) => {
    try {
        const blogs = await Post_1.default.find().select('title content author').populate({ path: 'author', select: 'name' }).exec();
        return res.json({
            blogs: blogs.map((blog) => ({
                id: blog._id.toString(),
                title: blog.title,
                content: blog.content,
                author: {
                    name: blog.author?.name || 'Anonymous',
                },
            })),
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error fetching blogs' });
    }
});
app.get('/api/v1/blog/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid blog id' });
    }
    try {
        const blog = await Post_1.default.findById(id).populate({ path: 'author', select: 'name' }).exec();
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.json({
            blog: {
                id: blog._id.toString(),
                title: blog.title,
                content: blog.content,
                author: {
                    name: blog.author?.name || 'Anonymous',
                },
            },
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error while fetching blog post' });
    }
});
// Blog routes (protected)
app.post('/api/v1/blog', authMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = medium_comman_1.createBlogInput.safeParse(body);
    if (!success)
        return res.status(411).json({ message: 'Inputs not correct' });
    // @ts-ignore
    const authorId = req.userId;
    try {
        const blog = await Post_1.default.create({ title: body.title, content: body.content, author: authorId });
        return res.json({ id: blog._id.toString() });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error creating blog' });
    }
});
app.put('/api/v1/blog', authMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = medium_comman_1.updateBlogInput.safeParse(body);
    if (!success)
        return res.status(411).json({ message: 'Inputs not correct' });
    try {
        const blog = await Post_1.default.findByIdAndUpdate(body.id, { title: body.title, content: body.content }, { new: true }).exec();
        return res.json({ id: blog?._id?.toString() });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error updating blog' });
    }
});
async function startServer() {
    try {
        await (0, db_1.connectDB)();
        console.log('Connected to MongoDB');
        const port = await getAvailablePort(preferredPort);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (err) {
        console.error('MongoDB connection error', err);
        process.exit(1);
    }
}
startServer();
