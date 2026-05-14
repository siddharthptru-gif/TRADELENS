import React, { useEffect } from 'react';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { useNavigate, useParams } from 'react-router-dom';

export default function ScanLoading() {
  const { scanId } = useParams();
  const navigate = useNavigate();

  // Mock loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/report/${scanId || 'demo'}`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, scanId]);

  return <LoadingScreen />;
}
