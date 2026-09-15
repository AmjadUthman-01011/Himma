# Hemma | Student Management Portal

A full-stack academic management platform designed to manage
students, teachers, courses, chapters, tests, submissions,
grades, and notifications.

## Features

### Authentication
- JWT authentication
- Login / Register
- Refresh tokens
- Logout
- Session management
- Role-based access control

### Admin
- User management
- Student management
- Teacher management
- Course management
- Test management
- Notifications

### Teacher
- Manage assigned courses
- Upload chapters
- Upload PDF resources
- Upload videos
- Create tests
- Manage questions
- Review submissions
- Grade students

### Student
- View enrolled courses
- View chapters
- Watch course videos
- Download resources
- Take tests
- Submit answers
- View grades
- Receive notifications

## Tech Stack

### Frontend
- Next.js
- React
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma
- MySQL
- JWT
- Zod

## Architecture

Frontend → REST API → Express → Prisma → MySQL

## Roles

ADMIN
TEACHER
STUDENT

## Project Structure

```text
Hemma/
├── frontend/
└── backend/
