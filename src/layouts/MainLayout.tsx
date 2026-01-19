import { Outlet } from 'react-router-dom';

import LeftBar from '@/components/LeftBar';
import Navbar from '@/components/Navbar';
import RightBar from '@/components/RightBar';

const MainLayout = () => (
  <>
    <Navbar />
    <div className="flex justify-between bg-(--background-primary)">
      <LeftBar />
      <Outlet />
      <RightBar />
    </div>
  </>
);

export default MainLayout;
