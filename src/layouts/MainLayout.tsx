import { useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import LeftBar from '@/components/LeftBar';
import Navbar from '@/components/Navbar';
import RightBar from '@/components/RightBar';
import ScrollToTop from '@/components/ScrollToTop';
import { DarkModeContext } from '@/contexts/DarkModeContext';

const MainLayout = () => {
  const location = useLocation();
  const darkModeContext = useContext(DarkModeContext);
  const { setMode, isSystemTheme } = darkModeContext || {};
  useEffect(() => {
    if (!setMode) {
      return;
    }
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches);
    };

    if (isSystemTheme) {
      darkQuery.addEventListener('change', handleChange);
    }
    return () => {
      darkQuery.removeEventListener('change', handleChange);
    };
  }, [isSystemTheme, setMode]);
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="flex justify-between bg-(--background-primary)">
        {location.pathname.includes('/profile') ? null : <LeftBar />}
        <Outlet />
        {location.pathname.includes('/profile') ? null : <RightBar />}
      </div>
    </>
  );
};

export default MainLayout;
