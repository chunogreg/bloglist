# Bloglist - Full-Stack Blog App

Full-stack blog application from Full Stack Open (Parts 4, 5, 7, 11, 13).
Users can register, login, create blogs, like, comment, and delete their own blogs.

**Frontend:** React + TanStack Query + React Router  
**Backend:** Node.js + Express + JWT

## Features

- User authentication with JWT, password hashing with bcrypt
- Create, like, comment, delete blogs (only owner can delete)
- Users view, single blog view with React Router
- Notifications, sorting by likes
- State management with TanStack Query
- Tests: Vitest + Playwright (E2E), Supertest for API
- CI/CD with GitHub Actions, Docker, Health Check endpoint

## Tech Stack

| Layer    | Tech                                              |
| -------- | ------------------------------------------------- |
| Frontend | React, TanStack Query, React Router, Vite, Vitest |
| Backend  | Node.js, Express, MongoDB                         |

## How To Run Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Structure

backend

- Express API, auth, blogs, users, comments

frontend

- React app, Redux store, components, views.

## What I Learned

JWT auth, testing pyramid (unit, integration, E2E), Redux vs local state.
