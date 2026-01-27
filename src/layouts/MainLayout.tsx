import { Outlet, useLocation } from 'react-router-dom';

import LeftBar from '@/components/LeftBar';
import Navbar from '@/components/Navbar';
import RightBar from '@/components/RightBar';

const MainLayout = () => {
  const location = useLocation();
  return (
    <>
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
