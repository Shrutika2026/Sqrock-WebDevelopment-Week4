# CodeLearn - AI-Powered LMS & Online Coding Platform

A modern, full-stack Learning Management System with AI-powered features, live coding IDE, course management, progress tracking, and certificate generation.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

### Student Features
- Register/Login with JWT authentication
- Browse and enroll in courses
- Watch video lectures and read notes
- Live coding IDE (JavaScript, Python, Java, C++)
- AI Doubt Assistant (Gemini-powered)
- Quiz system with auto-scoring
- Progress tracking with charts
- Certificate generation on completion

### Instructor Features
- Create/Edit/Delete courses with modules & lessons
- Publish/Unpublish courses
- Student analytics dashboard
- AI Quiz Generator
- Track student progress

### Platform Features
- Dark/Light mode toggle
- Fully responsive (Mobile, Tablet, Desktop)
- Role-based access control
- Secure password encryption (bcrypt)
- Protected API routes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| Backend | Next.js API Routes, Node.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| AI | Google Gemini API |
| Code Editor | Monaco Editor |
| Charts | Recharts |
| Icons | Lucide React |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
copy .env.example .env.local
# Edit .env.local with your values

# 3. Seed the database with demo data
npm run seed

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Instructor | instructor@codelearn.com | password123 |
| Student | student@codelearn.com | password123 |

### Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/codelearn-lms
JWT_SECRET=your-super-secret-jwt-key
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** The AI assistant works without a Gemini API key (uses intelligent fallbacks). Add your key for full AI capabilities.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # REST API endpoints
│   ├── dashboard/         # Student dashboard
│   ├── instructor/        # Instructor dashboard
│   ├── courses/           # Course browsing & learning
│   ├── coding/            # Coding practice IDE
│   └── certificates/      # Certificate viewer
├── components/            # Reusable UI components
├── lib/                   # Utilities (auth, db, ai, code runner)
├── models/                # MongoDB/Mongoose schemas
├── types/                 # TypeScript type definitions
└── scripts/               # Database seed script
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |
| GET | /api/auth/me | Get current user |
| GET/POST | /api/courses | List/Create courses |
| GET/PUT/DELETE | /api/courses/[id] | Course CRUD |
| POST | /api/courses/[id]/enroll | Enroll in course |
| GET/POST | /api/coding | List/Create problems |
| POST | /api/coding/[id] | Submit code solution |
| GET/POST | /api/quizzes | List/Create quizzes |
| POST | /api/ai | AI assistant chat |
| GET | /api/dashboard/stats | Student analytics |
| GET | /api/instructor/stats | Instructor analytics |
| GET | /api/certificates | User certificates |

## For Judges / Presentation Tips

1. **Demo Flow:** Login as student → Enroll in course → Watch video → Mark complete → Solve coding problem → View dashboard progress
2. **Instructor Demo:** Login as instructor → Show analytics → Create course → Publish
3. **AI Feature:** Click the AI bot (bottom-right) → Ask a coding question
4. **Dark Mode:** Toggle theme in navbar
5. **Responsive:** Resize browser to show mobile layout

## Future Enhancements

- Payment gateway integration
- Live video classes (WebRTC)
- Discussion forum
- Leaderboard & gamification badges
- Judge0 API for multi-language code execution
- Cloudinary for video/image uploads
- Push notifications

## License

Built for educational purposes as an internship project.

## Deployment

Recommended: Vercel (best support for Next.js)

- Create a GitHub repository and push the project:
	```bash
	git init
	git add .
	git commit -m "Initial commit"
	git branch -M main
	git remote add origin <your-repo-url>
	git push -u origin main
	```
- On Vercel: Import the repository, set Environment Variables (see section below), and deploy. Vercel will run `npm run build` automatically.

Alternative hosts: Render, DigitalOcean App Platform, Heroku, or a Docker-based setup. Ensure the host can reach your MongoDB instance.

MongoDB Atlas (recommended for production)

- Create a free cluster at https://www.mongodb.com/atlas
- Whitelist your deployment IP(s) or allow access from anywhere (for quick testing)
- Create a database user and copy the connection string
- Set `MONGODB_URI` in your host's environment variables

Environment variables (set these in Vercel or your host's settings):

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=long-random-secret
GEMINI_API_KEY=your-gemini-api-key (optional)
NEXT_PUBLIC_APP_URL=https://your-production-domain
```

Seeding data in production

- If you want demo data on a fresh deployment, run the seed script locally while pointed at your production/test DB (be careful — this will delete existing data):
```
# locally
npm run seed
```

Notes

- Never commit `.env.local` or secrets. Use `.env.example` as a template.
- If the app uses AI features, ensure `GEMINI_API_KEY` is set. The app has fallbacks, but full features require the API key.
- If you see client chunk errors after redeploying, clear the browser cache or do a hard reload.

