import React from 'react';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';
import { Outlet } from 'react-router-dom';

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-[#020403] text-white overflow-hidden relative">
      {/* Background ambient glow matching premium theme */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8CFF3F]/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <AppSidebar />
      
      <div className="flex-1 flex flex-col w-full min-w-0 h-screen overflow-hidden">
        <AppTopbar />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 outline-none">
          <div className="max-w-7xl mx-auto w-full pb-20 md:pb-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
