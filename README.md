# Novo-Blog

Small blogging platform with a React + Vite frontend and a Node + Express backend using MongoDB.

**Tech stack (summary)**
- Frontend: React + TypeScript, Vite, Tailwind CSS, React Router, Axios
- Backend: TypeScript, Express (Node), Mongoose (MongoDB)
- Database: MongoDB (configured via `MONGODB_URI`)
- Auth: JWT-based authentication (signed with `JWT_SECRET`, returned as token and stored in `localStorage`)

**Quick facts**
- Frontend code: frontend/
- Backend code: backend/
 - Backend code: backend/
 - Backend routes: `backend/src/server.ts` (converted from Hono)

Important implementation notes:
- The backend issues JWTs on signup/signin and verifies them for protected blog routes.
- Passwords are hashed using `bcryptjs` on signup and compared on signin.

Getting started (local)

1) MongoDB
- Ensure you have a running MongoDB instance or MongoDB Atlas cluster.
- Example `.env` values (replace credentials):

```
MONGODB_URI=mongodb+srv://user:password@cluster0.example.mongodb.net/novoblog
JWT_SECRET=super-secret-jwt-key
PORT=4000
```

Create a `.env` file inside `backend/` with those variables (or use the provided `.env.example`).

2) Backend (Node + Express + Mongoose)

```
cd backend
npm install
npm run dev
```

Notes:
- `npm run dev` uses `ts-node-dev` to run the TypeScript server locally.
- Set `MONGODB_URI` and `JWT_SECRET` in your environment before running.

3) Frontend (React + Vite)

```
cd frontend
npm install
npm run dev
```

The frontend expects a backend URL configured in `frontend/src/config.ts` as `BACKEND_URL`. For local testing, set `VITE_BACKEND_URL` or rely on the default `http://localhost:4000`.

If port `4000` is already taken, the backend will automatically try the next free port and print it in the terminal.

Authentication flow
- `POST /api/v1/user/signup` — creates a user (hashed password) and returns a JSON `{ token }`.
- `POST /api/v1/user/signin` — authenticates user and returns a JSON `{ token }`.
- Frontend stores the JWT in `localStorage` (`localStorage.setItem('token', token)`) and sends it in the `Authorization` header for protected requests.

Security recommendations (urgent)
- Hash passwords before storing (use `bcrypt` or `argon2`).
- Return JSON responses for auth (currently backend returns raw token text). Consider returning JSON `{ token: "..." }` for consistency.
- Consider using `HttpOnly` cookies for tokens to mitigate XSS risks instead of `localStorage`.

- Deployment
- Backend: build and deploy the Node server to your chosen host (Heroku, Fly, Vercel Serverless, Docker, etc.). This repo no longer deploys with Wrangler/Cloudflare Workers.
- Frontend: build with `npm run build` in `frontend` and deploy to your chosen static host.

Where to look in the repo
- Backend entry: [backend/src/server.ts](backend/src/server.ts)
- Backend models: [backend/src/models](backend/src/models)
- Frontend auth UI: [frontend/src/components/Auth.tsx](frontend/src/components/Auth.tsx)

If you want, I can:
- Update the auth flow to hash passwords and return JSON tokens.
- Add a `.env.example` and a short script to seed test data.
