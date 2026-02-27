import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import LeftBar from '@/components/LeftBar';
import ModelMessage from '@/components/ModelMessage';
import Navbar from '@/components/Navbar';
import RightBar from '@/components/RightBar';
import ScrollToTop from '@/components/ScrollToTop';
import { DarkModeContext } from '@/contexts/DarkModeContext';
import { socket } from '@/socket';
import type { RootState } from '@/store';

const MainLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const openModelMessage = useSelector(
    (state: RootState) => state.conversation.conversationId,
  );
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
  useEffect(() => {
    const onConnect = () => {
      if (user?._id) {
        socket.emit('addUser', user?._id);
      }
    };
    const onDisconnect = () => {
      socket.on('getUser', onGetUsers);
    };
    const onGetUsers = (users: { userId: string; socketId: string }[]) => {
      console.log('Danh sách users online từ server:', users);
    };
    if (socket.connected && user?._id) {
      socket.emit('addUser', user?._id);
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('getUser', onGetUsers);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('getUser', onGetUsers);
    };
  }, [user?._id]);
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="flex justify-between bg-(--background-primary)">
        {location.pathname.includes('/profile') ? null : <LeftBar />}
        <Outlet />
        {location.pathname.includes('/profile') ? null : <RightBar />}
        {openModelMessage && <ModelMessage />}
      </div>
    </>
  );
};

export default MainLayout;
