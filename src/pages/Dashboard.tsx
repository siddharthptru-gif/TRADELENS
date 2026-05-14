import React from 'react';
import { DashboardShell } from '../components/dashboard/DashboardShell';
import { PageTransition } from '../components/ui/PageTransition';

export default function Dashboard() {
  return (
    <PageTransition>
      <DashboardShell />
    </PageTransition>
  );
}

