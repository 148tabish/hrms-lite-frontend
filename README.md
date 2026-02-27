# HRMS Lite — Frontend

A lightweight Human Resource Management System frontend built with React + Zustand.

## Tech Stack

- **React 18** — UI framework
- **Vite** — build tool
- **React Router v6** — client-side routing
- **Zustand** — state management
- **Axios** — HTTP client
- **TailwindCSS** — styling
- **React Hot Toast** — notifications
- **Lucide React** — icons
- **date-fns** — date formatting

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your FastAPI backend URL:

```
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Run development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
  api/            — axios instance with interceptors
  stores/         — Zustand stores (employees, attendance, reports)
  hooks/          — thin selector hooks over stores
  pages/          — page-level components (Dashboard, Employees, Attendance, Reports)
  components/
    layout/       — Sidebar, TopBar, Layout
    employees/    — EmployeeTable, EmployeeForm, EmployeeDeleteModal
    attendance/   — AttendanceTable, AttendanceForm, AttendanceFilters
    reports/      — SummaryTable, RangeReport
    ui/           — Button, Input, Select, Modal, Badge, Spinner, EmptyState, ErrorState, PageHeader
```

## Deployment (Vercel)

The included `vercel.json` handles SPA routing fallback automatically.

1. Push to GitHub
2. Import project in Vercel
3. Set `VITE_API_BASE_URL` in Vercel environment variables
4. Deploy

## Assumptions

- Backend runs at the URL set in `VITE_API_BASE_URL`
- Backend follows the response envelope: `{ success, data }` / `{ success, error }`
- No authentication required (single admin)
