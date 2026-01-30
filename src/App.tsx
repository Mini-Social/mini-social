import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { DarkmodeContextProvider } from '@/contexts/DarkmodeProvider';
import { checkAuth } from '@/features/auth/auth.api.slice';
import AppRouter from '@/routes';
import { UseAppDispatch } from '@/store';

const App = () => {
  const dispatch = UseAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <DarkmodeContextProvider>
      <AppRouter />
      <ToastContainer />
    </DarkmodeContextProvider>
  );
};

export default App;
