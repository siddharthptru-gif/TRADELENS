import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Upload from '../pages/Upload';
import ScanLoading from '../pages/ScanLoading';
import Report from '../pages/Report';
import SavedReports from '../pages/SavedReports';
import Journal from '../pages/Journal';
import Watchlist from '../pages/Watchlist';
import Pricing from '../pages/Pricing';
import Settings from '../pages/Settings';
import Help from '../pages/Help';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AppShell } from '../components/layout/AppShell';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/help" element={<Help />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/scan/:scanId/loading" element={<ScanLoading />} />
        <Route path="/report/:reportId" element={<Report />} />
        <Route path="/reports" element={<SavedReports />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
