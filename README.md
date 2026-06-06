# TeamFlow Frontend

### 👨‍💻 Developed By

**Udit U Gunagi**

A modern project and task management platform built with Next.js, TypeScript, Tailwind CSS, and Axios that helps teams organize projects, manage tasks, and collaborate efficiently through a centralized dashboard.

---

## 🚀 Overview

TeamFlow Frontend provides a clean and responsive interface for managing projects and tracking team productivity.

Users can:

* Register organizations and teams
* Login securely using JWT authentication
* Create and manage projects
* Create, update, and delete tasks
* Track task progress
* Filter and search tasks
* Organize work across multiple projects

This frontend communicates with the TeamFlow backend using JWT authentication and REST APIs.

---

## 🔗 Links

### 🌐 Live Demo

https://teamflow-frontend-one.vercel.app/

### 💻 Frontend Repository

https://github.com/code-udit/teamflow-frontend.git

### ⚙️ Backend Repository

https://github.com/code-udit/teamflow-backend.git

---

## 🛠 Tech Stack

* Next.js 15
* TypeScript
* Tailwind CSS
* Axios
* React Hooks
* JWT Authentication
* Responsive UI

---

## 📁 Project Structure

```bash
teamflow-frontend/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── projects/
│   │   └── [id]/
│   ├── layout.tsx
│   └── page.tsx
│
├── services/
│   ├── auth.service.ts
│   └── project.service.ts
│
├── utils/
│   └── api.ts
│
├── types/
│   └── project.ts
│
├── public/
├── middleware.ts
└── globals.css
```

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Token Authentication
* Session Persistence
* Protected Routes

### 🏢 Organization Management

* Organization-Based Workspace
* Team Registration
* Organization Dashboard
* Workspace Isolation

### 📁 Project Management

* Create Projects
* View Projects
* Delete Projects
* Project Details Page

### ✅ Task Management

* Create Tasks
* Update Task Status
* Delete Tasks
* Mark Tasks as Complete
* Project-Based Task Organization

### 🔍 Task Filtering & Search

* Search Tasks
* Status Filtering
* Sorting Options
* Pagination Support

### 🎨 UI Features

* Responsive Dashboard
* Modern Design
* Loading States
* Error Handling
* Mobile Friendly Interface

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/code-udit/teamflow-frontend.git
cd teamflow-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:3000
```

---

## 🔌 Backend Connection

Make sure the backend server is running before starting the frontend.

Backend API:

```bash
http://localhost:5000/api
```

---

## 📸 Dashboard Modules

### Dashboard Overview

Displays:

* Organization Information
* Project List
* Project Creation Panel
* Workspace Management

### Project Management

Users can:

* Create New Projects
* View Existing Projects
* Open Project Details
* Delete Projects

### Task Management

Tracks:

* Task Creation
* Task Completion Status
* Task Updates
* Task Deletion

### Task Search & Filtering

Provides:

* Search Functionality
* Status Filters
* Sorting Controls
* Paginated Results

---

## 🔐 Authentication Flow

1. User registers an organization account
2. User logs into the platform
3. Backend returns JWT token
4. Token stored in local storage
5. Protected routes are validated
6. Axios attaches token automatically
7. User accesses dashboard resources

---

## 🔄 Application Workflow

1. User creates an organization account
2. User logs into TeamFlow
3. Projects are created within the organization
4. Tasks are added to projects
5. Tasks are updated as work progresses
6. Team tracks project completion through the dashboard

---

## 📈 Future Improvements

* Real-Time Collaboration
* Team Member Invitations
* Role-Based Access Control
* Activity Logs
* Notifications System
* File Attachments
* Kanban Board View
* Dark Mode Support

---

## 👨‍💻 Author

Developed by **Udit U Gunagi**
