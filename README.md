# Bloglist – Full-Stack Blog Application

A full-stack blogging application developed as part of the Full Stack Open course.

Users can register, log in, create blog posts, like and comment on posts, and delete their own blogs.

## Technologies

**Frontend:** React, TanStack Query, React Router, Vite

**Backend:** Node.js, Express, MongoDB, JWT, bcrypt

## Features

- User registration and authentication
- JWT-based authentication and password hashing
- Create and manage blog posts
- Like and comment on blog posts
- Delete blogs owned by the authenticated user
- View all blogs and individual blog details
- Notifications and sorting by likes

## Project Structure

```text
bloglist/
├── backend/
└── frontend/
```

## Running Locally

clone the repository

```bash
git clone https://github.com/chunogreg/bloglist.git
cd bloglist
```

Install dependencies and start the application:

```bash
npm install
npm run dev
```

## Testing

See the individual frontend and backend directories for their test instructions.

## What I Learned

- Building and integrating REST APIs
- User authentication and authorization
- Managing server state with TanStack Query
- Client-side routing
- Automated testing of frontend and backend applications
