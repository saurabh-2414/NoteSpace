# 📝 NoteSpace

NoteSpace is a full-stack note management web application that allows users to securely create, manage, search, edit, and delete their personal notes.

The application includes JWT-based authentication, password reset functionality through email, form validation, protected APIs, and a responsive Bootstrap interface.

## 🚀 Project Overview

NoteSpace provides a simple and secure platform for managing personal notes.

Users can:

- Create an account
- Login securely
- Create notes
- View their notes
- Search notes
- Edit existing notes
- Delete notes with confirmation
- Reset their password through email
- Logout securely

Each user's notes are protected using JWT authentication, ensuring users can access and modify only their own notes.

## ✨ Features

### 🔐 Authentication

- User registration
- User login/logout
- JWT authentication
- Protected routes and APIs
- Password hashing using bcrypt
- JWT token expiration
- Session expiration handling

### 📝 Note Management

- Add new notes
- View all personal notes
- Edit notes
- Delete notes
- Delete confirmation modal
- Search notes by title or description
- Tag support

### 🔑 Password Management

- Forgot password functionality
- Password reset through email
- Secure reset token generation
- Reset token expiration
- Password confirmation validation
- Show/hide password functionality

### 🎨 User Interface

- Responsive design
- Bootstrap 5 styling
- Loading states
- Success and error alerts
- Responsive navigation bar
- Clean note cards
- Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Context API
- Bootstrap 5
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Express Validator
- Nodemailer
- CORS

### Development Tools

- Git
- GitHub
- npm
- Nodemon

## 📂 Project Structure

```text
NoteSpace/
│
├── Backend/
│   ├── middleware/
│   │   └── fetchuser.js
│   │
│   ├── models/
│   │   ├── Notes.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   │
│   ├── db.js
│   ├── index.js
│   └── .env
│
├── public/
│   ├── index.html
│   ├── nav.png
│   └── logo-note.png
│
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── Addnote.js
│   │   ├── Alert.js
│   │   ├── ForgotPassword.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── Noteitem.js
│   │   ├── Notes.js
│   │   ├── ResetPassword.js
│   │   └── Signup.js
│   │
│   ├── context/
│   │   └── notes/
│   │       ├── NoteState.js
│   │       └── noteContext.js
│   │
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── .gitignore
├── package.json
└── README.md
