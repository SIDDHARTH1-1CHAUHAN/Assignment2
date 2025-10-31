# Task Manager Assignments

Two progressive full-stack applications built with **C# .NET 8** and **React with TypeScript**.

---

## 🌟 Key Feature: Smart Scheduler with Kahn's Algorithm

**Assignment 2** includes an intelligent task scheduler that uses **Kahn's Algorithm** (topological sorting) to automatically determine the optimal order for completing tasks based on:

- ✅ **Dependencies** - Ensures prerequisites are completed first
- ✅ **Due Dates** - Prioritizes urgent tasks
- ✅ **Effort Estimates** - Balances workload distribution
- ✅ **Circular Detection** - Identifies impossible dependency chains

**Plus: Complete Frontend UI** - Not just an API! Beautiful web interface for visual task scheduling.

**Algorithm Complexity:** O(V + E) - Industry-standard graph algorithm  
**Real-World Uses:** Package managers (npm, pip), build systems (Maven, Gradle), course prerequisites

---

## 🚀 Quick Start

### Assignment 1
```bash
# Backend
cd Assignment1/Backend && dotnet run
# → http://localhost:50XX

# Frontend (new terminal)
cd Assignment1/Frontend && npm install && npm run dev
# → http://localhost:3000
```

### Assignment 2
```bash
# Backend
cd Assignment2/Backend && dotnet run
# → http://localhost:50XX

# Frontend (new terminal)
cd Assignment2/Frontend && npm install && npm run dev
# → http://localhost:3000
```

**To use Smart Scheduler:** Login → Open Project → Click "🎯 Smart Scheduler" button

---

## 📁 Structure

```
TaskManagerAssignments/
├── Assignment1/                    # Basic Task Manager (10 credits)
│   ├── Backend/                   # .NET 8 Web API
│   ├── Frontend/                  # React + TypeScript
│   └── README.md
│
├── Assignment2/                    # Project Manager (30 credits)
│   ├── Backend/
│   │   └── Services/
│   │       └── SmartSchedulerService.cs    # 🧠 Kahn's Algorithm
│   ├── Frontend/
│   │   └── pages/
│   │       └── SmartScheduler.tsx          # 🎯 Visual Interface
│   └── README.md
│
└── README.md                       # This file
```

---

## 🛠 Tech Stack

**Backend:** .NET 8, ASP.NET Core Web API, Entity Framework Core, SQLite, JWT Auth  
**Frontend:** React 18, TypeScript 5, React Router, Axios, Tailwind CSS, Vite  
**Algorithm:** Kahn's Algorithm for Topological Sorting

---

## ✨ Features Overview

### Assignment 1 - Basic Task Manager
- CRUD operations (Create, Read, Update, Delete)
- Task filtering (All/Active/Completed)
- localStorage persistence
- Mobile responsive UI

### Assignment 2 - Project Manager
**Core Features (20 credits):**
- JWT Authentication & Authorization
- Project & Task Management
- Progress Tracking with Visual Indicators
- Mobile-First Responsive Design
- Loading States & User Feedback

**Bonus Feature (10 credits):**
- 🧠 **Smart Scheduler API** - Kahn's Algorithm implementation
- 🎯 **Smart Scheduler UI** - Interactive frontend interface with:
  - Visual task builder with dependency checkboxes
  - Example scenarios (Simple, Complex, Parallel)
  - Beautiful results display
  - Print functionality

---

## 📖 Documentation

Each assignment has detailed documentation:

- **[Assignment 1 README](./Assignment1/README.md)** - Complete guide with setup & API docs
- **[Assignment 2 README](./Assignment2/README.md)** - Comprehensive guide with all features
- **[Smart Scheduler API Guide](./Assignment2/SMART_SCHEDULER_GUIDE.md)** - API testing with examples
- **[Smart Scheduler UI Guide](./Assignment2/SMART_SCHEDULER_FRONTEND_GUIDE.md)** - Frontend usage tutorial

---

## 🧪 Quick Test

### Assignment 1
1. Start both servers (see Quick Start)
2. Open `http://localhost:3000`
3. Add tasks, check them off, test filters

### Assignment 2
1. Start both servers
2. Register/Login at `http://localhost:3000`
3. Create project, add tasks
4. **Try Smart Scheduler:**
   - Open project → Click "🎯 Smart Scheduler"
   - Click "Load Simple Example"
   - Click "Generate Optimal Schedule"
   - See the optimized task order!

---

## 🎯 What Makes This Special

✅ **Progressive Learning** - Start simple, advance to complex  
✅ **Production Quality** - Error handling, loading states, validation  
✅ **Modern Stack** - Latest .NET 8, React 18, TypeScript 5  
✅ **Complete UI** - Full frontend, not just APIs  
✅ **Kahn's Algorithm** - Industry-standard graph algorithm + visual interface  
✅ **Comprehensive Docs** - 5+ detailed guides  
✅ **Mobile Responsive** - Works on all devices  

---

## 📚 Prerequisites

- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download](https://nodejs.org/)

---

## 🎉 Summary

Two complete full-stack applications:
- **40 credits** of features
- **Kahn's Algorithm** implementation with frontend UI
- **Production-ready** code with best practices
- **Fully documented** with multiple guides

**Ready to run, test, and deploy!** 🚀

---

**For detailed instructions, see the README in each assignment folder.**

**Made with ❤️ using .NET 8, React, and Kahn's Algorithm**