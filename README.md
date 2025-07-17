# 📝 BlogIt

BlogIt is a full-stack blogging platform built as an end-of-Month 2 project. It allows users to sign up, create and manage their own blogs, and update their personal profile information. This project demonstrates authentication, CRUD operations, user-specific content, and form handling—all essential full-stack web development skills.

## 🚀 Features

### ✅ User Authentication
- Register with: first name, last name, username, email, and password
- Login with email or username
- Passwords are hashed (bcrypt)
- JWT-based authentication (no refresh tokens for now)
- Protected routes for authenticated users
- Logout functionality

### 📝 Blogging System
- Create blogs with:
  - Featured image
  - Title
  - Synopsis
  - Markdown content
- Blog post card includes:
  - Featured image
  - Title
  - Short synopsis
  - Author’s name and avatar (based on initials)
  - "Read More" button linking to the full post
- Blog content is rendered using Markdown-to-HTML
- Blogs marked `isDeleted: true` are hidden from views
- One-to-many relationship: One user → Many blogs

### 👤 User Profile Page
- View all authored blogs (non-deleted only)
- Edit or delete your blogs
- Update primary details (first name, last name, username, email)
- Update password securely (requires current password)
- Logout option

### 🎨 UI / UX
- Responsive and clean layout
- Material UI components
- Landing page for unauthenticated users
- Authenticated users see:
  - Welcome message (e.g., “Welcome back, John”)
  - Navigation: All Blogs | New Blog | Profile
- Profile image upload (optional feature)

## 🔐 Protected Routes
Certain pages such as creating blogs, editing profiles, and viewing personal blogs are only accessible to logged-in users.

## 🛠 Tech Stack

### Frontend (`blogit-client`)
- React
- Material UI (MUI)
- React Router DOM
- Markdown rendering (`react-markdown`)
- Axios for HTTP requests
- JWT for authentication

### Backend (`blogit-server`)
- Node.js
- Express.js
- PostgreSQL (via Prisma ORM)
- bcryptjs (for password hashing)
- jsonwebtoken (for JWT handling)
- dotenv for environment management

## 📦 API Endpoints

### Auth Routes
- `POST /api/auth/register` – Register a user
- `POST /api/auth/login` – Login a user
- `POST /api/auth/logout` – Logout a user

### Blog Routes
- `GET /api/blogs` – Get all blogs
- `POST /api/blogs` – Create a new blog
- `GET /api/blogs/:blogId` – Get a single blog by ID
- `PATCH /api/blogs/:blogId` – Update a blog
- `DELETE /api/blogs/:blogId` – Soft delete a blog

### User Routes
- `GET /api/user/blogs` – Get blogs created by the authenticated user
- `PATCH /api/user` – Update user profile information
- `PATCH /api/user/password` – Update password (with current password validation)

## 🧑‍💻 Running the Project Locally

### Prerequisites
- Node.js
- PostgreSQL
- Yarn or npm

### 1. Clone the Repository

```bash
git clone https://github.com/FaizaSuraw/blogit.git
cd blogit
```
### 2. Set up the Backend
```bash
cd blogit-server
npm install
npx prisma migrate dev
npm run dev
```

### 3. Set up the Frontend
```bash
cd blogit-client
npm install
npm run dev
```

## Preview 
![Preview](/Assets/image.png)