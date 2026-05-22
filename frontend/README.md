# Pulsar OEE - Frontend (React)

Modern manufacturing dashboard built with React 18, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── Header.tsx          # Top header
│   └── RealTime/
│       ├── MachineCard.tsx     # Machine status card
│       ├── StatusBar.tsx       # Summary status bar
│       └── TimelineBar.tsx     # Production timeline
├── pages/
│   ├── RealTimePage.tsx        # Real-time monitoring
│   ├── DashboardPage.tsx       # General dashboard
│   ├── AnalyticsPage.tsx       # Analytics & reports
│   ├── MetricsPage.tsx         # Metrics table
│   ├── DatabasesPage.tsx       # Data management
│   ├── NotificationsPage.tsx   # Alerts
│   └── ReportsPage.tsx         # Report generation
├── types/
│   └── index.ts                # TypeScript interfaces
├── data/
│   ├── api.ts                  # API client & endpoints
│   └── mockMachines.ts         # Mock data
├── App.tsx                     # Main app component
├── main.tsx                    # App entry point
└── index.css                   # Global styles
```

## 🎨 Design System

- **Colors**: Brand green (#1AA673), Yellow (#FFE683)
- **Typography**: Lato, Rubik, Segoe UI
- **Components**: Lucide React icons
- **Styling**: Tailwind CSS v3

## 🔌 API Integration

The app connects to Odoo backend via REST APIs:

- `GET /api/machines` - Get all machines
- `GET /api/machines/{id}` - Get machine details
- `POST /api/machines/{id}/status` - Update machine status
- `GET /api/machines/{id}/metrics` - Get OEE metrics
- `GET /api/stops` - Get machine stops
- `GET /api/production-orders` - Get production orders
- `GET /api/dashboard/summary` - Get dashboard summary

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 📝 Features

- ✅ Real-time machine monitoring
- ✅ OEE calculation and tracking
- ✅ Production order management
- ✅ Machine stop logging
- ✅ Analytics and reporting
- ✅ Responsive design
- ✅ Dark/Light mode ready

## 🔧 Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Lucide React
- Axios
