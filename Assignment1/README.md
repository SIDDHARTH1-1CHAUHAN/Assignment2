# Assignment 1 - Basic Task Manager

A simple, elegant full-stack task management application built with C# .NET 8 and React with TypeScript.

## 🎯 Credits: 10

---

## ✨ Features

### Core Features
- ✅ **Display Tasks** - View all your tasks in a clean list
- ✅ **Add Tasks** - Create new tasks with descriptions
- ✅ **Toggle Completion** - Mark tasks as complete/incomplete
- ✅ **Delete Tasks** - Remove tasks you no longer need
- ✅ **RESTful API** - Clean backend with proper endpoints
- ✅ **In-Memory Storage** - Fast, no database setup needed

### Enhancement Features
- ✅ **Task Filtering** - View All, Active, or Completed tasks
- ✅ **localStorage Persistence** - Tasks saved in browser
- ✅ **Tailwind CSS Styling** - Modern, beautiful UI
- ✅ **Loading Indicators** - Visual feedback during operations
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Mobile Responsive** - Works on all screen sizes
- ✅ **Task Counter** - See active and completed task counts

---

## 🛠 Tech Stack

### Backend
- **C# .NET 8** - Latest LTS version
- **ASP.NET Core Web API** - RESTful API framework
- **In-Memory Storage** - No database required
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React 18** - Modern UI library
- **TypeScript 5** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **Tailwind CSS 3** - Utility-first CSS framework

---

## 📁 Project Structure

```
Assignment1/
├── Backend/
│   ├── Controllers/
│   │   └── TasksController.cs           # API endpoints
│   ├── Models/
│   │   └── TaskItem.cs                  # Task data model
│   ├── Services/
│   │   └── TaskService.cs               # Business logic
│   ├── Program.cs                       # App configuration
│   ├── TaskManagerApi.csproj            # Project file
│   └── appsettings.json                 # Settings
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList.tsx             # Task list component
    │   │   ├── TaskItem.tsx             # Individual task
    │   │   ├── TaskForm.tsx             # Add task form
    │   │   └── TaskFilter.tsx           # Filter buttons
    │   ├── services/
    │   │   └── taskService.ts           # API client
    │   ├── types/
    │   │   └── Task.ts                  # TypeScript types
    │   ├── App.tsx                      # Main component
    │   ├── App.css                      # Styles
    │   └── main.tsx                     # Entry point
    ├── package.json                      # Dependencies
    ├── vite.config.ts                   # Vite config
    ├── tailwind.config.js               # Tailwind config
    └── index.html                       # HTML template
```

---

## 🚀 Setup Instructions

### Prerequisites

**Required:**
- ✅ .NET 8 SDK - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- ✅ Node.js 18+ - [Download](https://nodejs.org/)

**Verify Installation:**
```bash
dotnet --version   # Should show 8.x.x
node --version     # Should show 18.x.x or higher
npm --version      # Should show 9.x.x or higher
```

---

### Backend Setup

1. **Navigate to Backend directory:**
   ```bash
   cd Assignment1/Backend
   ```

2. **Restore NuGet packages:**
   ```bash
   dotnet restore
   ```

3. **Run the API:**
   ```bash
   dotnet run
   ```

4. **Verify it's running:**
   ```
   ✅ API: http://localhost:50XX
   ✅ Swagger: http://localhost:50XX/swagger
   ```

---

### Frontend Setup

1. **Navigate to Frontend directory:**
   ```bash
   cd Assignment1/Frontend
   ```

2. **Install npm packages:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Verify it's running:**
   ```
   ✅ App: http://localhost:3000
   ```

---

## 📖 Usage Guide

### Starting the Application

**Terminal 1 - Backend:**
```bash
cd Assignment1/Backend
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd Assignment1/Frontend
npm run dev
```

**Open Browser:**
```
http://localhost:3000
```

---

### Using the App

#### 1. Add a Task
1. Type task description in the input field
2. Click "Add Task" or press Enter
3. ✅ Task appears in the list

#### 2. Mark Task as Complete
1. Click the checkbox next to any task
2. ✅ Task gets strikethrough style
3. ✅ Moves to completed category

#### 3. Filter Tasks
- Click **"All"** - View all tasks
- Click **"Active"** - View incomplete tasks only
- Click **"Completed"** - View completed tasks only

#### 4. Delete a Task
1. Click "Delete" button on any task
2. ✅ Task is removed immediately

#### 5. Data Persistence
- Tasks are automatically saved to browser localStorage
- Refresh the page - your tasks remain!
- Works even when backend is offline (as fallback)

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:50XX/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/tasks` | Get all tasks | None |
| POST | `/tasks` | Create new task | `{ "description": "string", "isCompleted": false }` |
| PUT | `/tasks/{id}` | Update task | `{ "description": "string", "isCompleted": bool }` |
| DELETE | `/tasks/{id}` | Delete task | None |

### Example Requests

**Get All Tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Buy groceries","isCompleted":false}'
```

**Update Task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"description":"Buy groceries","isCompleted":true}'
```

**Delete Task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/{id}
```

---

## 🎨 UI Features

### Visual Design
- ✅ **Modern gradient background** - Beautiful purple gradient
- ✅ **Clean card layout** - Task list in centered card
- ✅ **Smooth animations** - Hover effects and transitions
- ✅ **Intuitive icons** - Clear visual feedback
- ✅ **Color-coded filters** - Active filter highlighted

### Responsive Design
- ✅ **Desktop (1200px+)** - Full-width layout
- ✅ **Tablet (768px-1199px)** - Adjusted spacing
- ✅ **Mobile (480px-767px)** - Single column, stacked buttons
- ✅ **Small Mobile (320px+)** - Optimized for smallest screens

### User Feedback
- ✅ **Loading states** - Spinner during API calls
- ✅ **Error messages** - Red banner with error details
- ✅ **Empty state** - Helpful message when no tasks
- ✅ **Task counter** - Shows active/completed counts

---

## 🧪 Testing

### Manual Testing Checklist

#### Basic Operations
- [ ] Add a task - enters in list
- [ ] Add multiple tasks - all appear
- [ ] Check a task - gets strikethrough
- [ ] Uncheck a task - strikethrough removed
- [ ] Delete a task - disappears immediately

#### Filtering
- [ ] Click "All" - see all tasks
- [ ] Click "Active" - see only incomplete
- [ ] Click "Completed" - see only completed
- [ ] Add task while filtered - still works

#### Persistence
- [ ] Add tasks
- [ ] Refresh page - tasks remain
- [ ] Close and reopen browser - tasks remain
- [ ] Clear browser data - tasks cleared

#### Error Handling
- [ ] Stop backend - see error message
- [ ] Start backend - functionality restored
- [ ] Try empty task - prevented

#### Mobile Responsive
- [ ] Open DevTools (F12)
- [ ] Toggle device mode (Ctrl+Shift+M)
- [ ] Test at 320px width
- [ ] Test at 768px width
- [ ] Test at 1920px width

---

## 🎉 Summary

**Assignment 1** is a complete, working task manager with:
- ✅ Full CRUD operations
- ✅ Modern, responsive UI
- ✅ Task filtering
- ✅ Data persistence
- ✅ Error handling
- ✅ Loading states

**Total Credits: 10** ✨

**Ready to run, test, and deploy!** 🚀

---

**Quick Start:**
```bash
# Terminal 1 - Backend
cd Assignment1/Backend && dotnet run

# Terminal 2 - Frontend
cd Assignment1/Frontend && npm install && npm run dev

# Open: http://localhost:3000
```