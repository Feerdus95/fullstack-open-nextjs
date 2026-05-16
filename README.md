# NextNotes

A full-stack blog reader built with Next.js 16, Drizzle ORM, PostgreSQL, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** PostgreSQL via Neon + Drizzle ORM
- **Authentication:** NextAuth v5 (Credentials provider, JWT)
- **Styling:** Tailwind CSS v4.3 (dark theme, SaaS-inspired)
- **Language:** TypeScript

## Features

- Browse and search blogs
- User registration and login
- Create and like blogs
- Personal reading list (unread/read tracking)
- API token generation
- Static homepage via MDX

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Start the dev server and run E2E tests
npm run test:e2e
```

Environment variables for testing go in `.env.local`:

```
DATABASE_URL=your_neon_database_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
app/
├── actions/        # Server Actions
├── api/            # Route Handlers (/api/me, /api/testing)
├── blogs/          # Blog list, detail, creation pages
├── components/     # Navbar, Notification, Forms
├── lib/            # Data access layer (Drizzle queries)
├── login/          # Login page
├── me/             # Profile, reading list, API token
├── register/       # Registration page
├── services/       # Session utilities
└── users/          # User list and profile pages
db/                 # Schema and migrations
tests/              # Playwright E2E tests
```

## Deployment

Deployed on [Vercel](https://fullstack-open-nextjs.vercel.app).
