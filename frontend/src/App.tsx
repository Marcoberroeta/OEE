import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RealTimePage from './pages/RealTimePage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MetricsPage from './pages/MetricsPage';
import DatabasesPage from './pages/DatabasesPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/realtime" replace />} />
          <Route path="/realtime" element={<RealTimePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/databases" element={<DatabasesPage />} />
          <Route path="/view-alerts" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
