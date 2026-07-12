# AssetFlow ERP - Screens 3, 6, 7

Complete VS Code project for AssetFlow Enterprise Asset Management System.

## 📁 Project Structure

```
assetflow-screens-3-6-7/
├── index.html              # Entry HTML file
├── package.json            # Dependencies & scripts
├── vite.config.ts          # Vite bundler config
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── src/
│   ├── main.tsx            # App entry point
│   ├── App.tsx             # Router & routes
│   ├── index.css           # Global styles (Tailwind)
│   ├── types/
│   │   └── index.ts        # All TypeScript interfaces
│   ├── lib/
│   │   ├── constants.ts    # App constants & enums
│   │   ├── validators.ts   # Zod validation schemas
│   │   └── mockData.ts     # Comprehensive mock data
│   ├── hooks/
│   │   ├── useOrganization.ts  # Screen 3 state logic
│   │   ├── useBookings.ts      # Screen 6 state logic
│   │   └── useMaintenance.ts   # Screen 7 state logic
│   ├── components/
│   │   ├── layout/
│   │   │   └── AppLayout.tsx   # Sidebar + navigation
│   │   ├── shared/
│   │   │   ├── StatusChip.tsx      # Colored status badges
│   │   │   ├── ConfirmDialog.tsx   # Confirmation modals
│   │   │   └── EmptyState.tsx      # Empty state UI
│   │   ├── organization/
│   │   │   ├── DepartmentTab.tsx   # Screen 3 - Tab A
│   │   │   └── CategoryTab.tsx     # Screen 3 - Tab B
│   │   ├── booking/
│   │   │   ├── BookingCalendar.tsx # Screen 6 - Calendar
│   │   │   └── BookingForm.tsx     # Screen 6 - Booking form
│   │   └── maintenance/
│   │       ├── KanbanBoard.tsx     # Screen 7 - Kanban
│   │       └── RaiseRequestForm.tsx # Screen 7 - Request form
│   └── screens/
│       ├── OrganizationScreen.tsx  # Screen 3 wrapper
│       ├── BookingScreen.tsx       # Screen 6 wrapper
│       └── MaintenanceScreen.tsx   # Screen 7 wrapper
```

## 🚀 How to Run

### Step 1: Install Node.js
Make sure you have Node.js 18+ installed:
```bash
node --version   # Should show v18.x.x or higher
npm --version    # Should show 9.x.x or higher
```

Download from: https://nodejs.org/ (LTS version)

### Step 2: Open in VS Code
```bash
# Open the project folder in VS Code
code assetflow-screens-3-6-7

# Or open the folder manually in VS Code:
# File → Open Folder → select "assetflow-screens-3-6-7"
```

### Step 3: Install Dependencies
Open VS Code terminal (`` Ctrl+` ``) and run:
```bash
npm install
```

This installs:
- React 18 + React DOM
- React Router DOM (navigation)
- Vite (build tool)
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Zod (validation)

### Step 4: Start Development Server
```bash
npm run dev
```

The app will open automatically at: **http://localhost:5173**

### Step 5: Explore the Screens

| Screen | Path | What to Test |
|--------|------|-------------|
| **Screen 3: Organization** | `/organization` | Create departments, add categories with custom fields, promote employees |
| **Screen 6: Booking** | `/booking` | Book resources, check overlap validation, view calendar |
| **Screen 7: Maintenance** | `/maintenance` | Raise requests, move through Kanban columns |

Use the **sidebar** to switch between screens.

## 📜 Available Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔧 Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
# Or modify vite.config.ts: server: { port: 3000 }
```

### TypeScript errors in VS Code
1. Press `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Or reload window: `Ctrl+Shift+P` → "Developer: Reload Window"

### Tailwind styles not working
Make sure `src/index.css` has these lines at the top:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🏗️ Building for Production

```bash
npm run build
```

Output goes to `dist/` folder. Deploy to:
- Vercel: `npx vercel dist`
- Netlify: Drag `dist` folder to netlify.com
- GitHub Pages: Use `gh-pages` package

## 📝 Key Features Implemented

### Screen 3: Organization Setup (Admin Only)
- **Tab A - Departments**: Create/edit/deactivate, assign heads, parent hierarchy
- **Tab B - Categories**: Create with custom fields (text/number/date/boolean)
- **Tab C - Employees**: Directory, promote to Department Head/Asset Manager

### Screen 6: Resource Booking
- **Calendar View**: Day/Week toggle, time-slot visualization
- **Overlap Validation**: Prevents double-booking same resource
- **Conflict Rules**: 9:00-10:00 blocks 9:30-10:30, allows 10:00-11:00
- **Status Lifecycle**: Upcoming → Ongoing → Completed/Cancelled

### Screen 7: Maintenance Management
- **Kanban Board**: 5 columns (Pending → Approved → Technician Assigned → In Progress → Resolved)
- **Approval Workflow**: Asset Manager approves before work starts
- **Auto Status Updates**: Asset → Under Maintenance on approval, → Available on resolve
- **Photo Attachments**: Up to 5 images per request

## 🎨 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first CSS |
| React Router | Client-side routing |
| Zod | Schema validation |
| Lucide React | Icons |

## 📄 License

MIT - Hackathon project
