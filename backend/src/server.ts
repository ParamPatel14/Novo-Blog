import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import net from 'net';
import { connectDB } from './db';
import User from './models/User';
import Post from './models/Post';
import { signinInput, signupInput, createBlogInput, updateBlogInput } from '@parampatel12/medium-comman';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const preferredPort = Number(process.env.PORT || 4000);

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => tester.close(() => resolve(true)))
      .listen(port, '0.0.0.0');
  });
}

async function getAvailablePort(startPort: number) {
  for (let port = startPort; port < startPort + 20; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`No free port found starting from ${startPort}`);
}

function generateToken(payload: object) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return jwt.sign(payload, secret);
}

async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = String(req.headers['authorization'] || '');
  try {
    const user = jwt.verify(authHeader, process.env.JWT_SECRET || '');
    // @ts-ignore
    req.userId = (user as any).id;
    next();
  } catch (e) {
    res.status(403).json({ message: 'You are not logged in' });
  }
}

app.post('/api/v1/user/signup', async (req, res) => {
  const body = req.body;
  const parsed = signupInput.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Inputs not correct',
      issues: parsed.error.issues,
    });
  }

  try {
    const hashed = await bcrypt.hash(body.password, 10);
    const user = await User.create({ email: body.email, password: hashed, name: body.name });
    const token = generateToken({ id: user._id.toString() });
    return res.json({ token });
  } catch (e) {
    console.error(e);
    if (e instanceof Error && e.message.includes('duplicate key')) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: 'Invalid' });
  }
});

app.post('/api/v1/user/signin', async (req, res) => {
  const body = req.body;
  const parsed = signinInput.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Inputs not correct',
      issues: parsed.error.issues,
    });
  }

  try {
    const user = await User.findOne({ email: body.email }).exec();
    if (!user) return res.status(403).json({ message: 'Incorrect creds' });
    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) return res.status(403).json({ message: 'Incorrect creds' });
    const token = generateToken({ id: user._id.toString() });
    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Invalid' });
  }
});

// Blog routes (protected)
app.post('/api/v1/blog', authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = createBlogInput.safeParse(body);
  if (!success) return res.status(411).json({ message: 'Inputs not correct' });
  // @ts-ignore
  const authorId = req.userId;
  try {
    const blog = await Post.create({ title: body.title, content: body.content, author: authorId });
    return res.json({ id: blog._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error creating blog' });
  }
});

app.put('/api/v1/blog', authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateBlogInput.safeParse(body);
  if (!success) return res.status(411).json({ message: 'Inputs not correct' });
  try {
    const blog = await Post.findByIdAndUpdate(body.id, { title: body.title, content: body.content }, { new: true }).exec();
    return res.json({ id: blog?._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error updating blog' });
  }
});

app.get('/api/v1/blog/bulk', authMiddleware, async (req, res) => {
  try {
    const blogs = await Post.find().select('title content author').populate({ path: 'author', select: 'name' }).exec();
    return res.json({ blogs });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error fetching blogs' });
  }
});

app.get('/api/v1/blog/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Post.findById(id).populate({ path: 'author', select: 'name' }).exec();
    return res.json({ blog });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error while fetching blog post' });
  }
});

async function startServer() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const port = await getAvailablePort(preferredPort);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
}

startServer();
