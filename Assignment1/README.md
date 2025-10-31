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
   ✅ API: http://localhost:5000
   ✅ Swagger: http://localhost:5000/swagger
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
http://localhost:5000/api
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

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Compilation errors:**
```bash
dotnet clean
dotnet restore
dotnet build
```

### Frontend Issues

**CORS errors:**
- Ensure backend is running on port 5000
- Check frontend is accessing correct URL
- Verify CORS policy in Program.cs

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 in use:**
- Edit `vite.config.ts` to change port
- Or use: `npm run dev -- --port 3001`

---

## 📊 Development Time

**Estimated:** 3-6 hours

**Breakdown:**
- Backend API: 1-2 hours
- Frontend Components: 1-2 hours
- Styling & Polish: 1-2 hours

---

## 🚀 Deployment

### Backend (Render/Railway/Azure)

**Build Command:**
```bash
dotnet publish -c Release -o out
```

**Start Command:**
```bash
cd out && dotnet TaskManagerApi.dll
```

### Frontend (Vercel/Netlify)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

**Environment Variable:**
```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

---

## 💡 Key Learning Points

### Backend
- RESTful API design principles
- In-memory data management
- CORS configuration
- Dependency injection in .NET
- Swagger/OpenAPI documentation

### Frontend
- React Hooks (useState, useEffect)
- TypeScript type safety
- Component composition
- State management
- API integration with Axios
- CSS with Tailwind

---

## ✅ Features Checklist

### Core Requirements ✓
- [x] Display list of tasks
- [x] Add new tasks with description
- [x] Mark tasks as completed/uncompleted
- [x] Delete tasks
- [x] RESTful API with .NET 8
- [x] In-memory data storage
- [x] React with TypeScript
- [x] State management with Hooks

### Enhancements ✓
- [x] Task filtering (All/Active/Completed)
- [x] Tailwind CSS styling
- [x] localStorage persistence
- [x] Loading indicators
- [x] Error handling
- [x] Mobile responsive design
- [x] Task counter display

---

## 📝 Notes

### Data Persistence
- Backend uses in-memory storage (resets on restart)
- Frontend uses localStorage (persists across sessions)
- localStorage serves as fallback when backend unavailable

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Best Practices Implemented
- ✅ Component-based architecture
- ✅ TypeScript for type safety
- ✅ Separation of concerns
- ✅ Error boundaries
- ✅ Loading states
- ✅ Responsive design
- ✅ Clean code structure

---

## 🆘 Common Issues

### Issue: Tasks disappear after backend restart
**Solution:** This is expected - in-memory storage is temporary. Tasks in localStorage remain.

### Issue: CORS error in browser console
**Solution:** 
1. Ensure backend is running
2. Check frontend is on port 3000
3. Verify CORS policy includes `http://localhost:3000`

### Issue: Can't add empty tasks
**Solution:** This is by design - validation prevents empty tasks

---

## 📚 Resources

- **.NET Documentation:** https://docs.microsoft.com/dotnet/
- **React Documentation:** https://react.dev/
- **TypeScript Documentation:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs

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