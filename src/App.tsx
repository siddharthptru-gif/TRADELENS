import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans flex flex-col">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
