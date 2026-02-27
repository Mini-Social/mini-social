import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { DarkmodeContextProvider } from '@/contexts/DarkmodeProvider';
import LanguageProvider from '@/contexts/LanguageProvider';
import { checkAuth } from '@/features/auth/auth.api.slice';
import AppRouter from '@/routes';
import { UseAppDispatch } from '@/store';

console.log(import.meta.env)
const App = () => {
  const dispatch = UseAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <LanguageProvider>
      <DarkmodeContextProvider>
        <AppRouter />
        <ToastContainer />
      </DarkmodeContextProvider>
    </LanguageProvider>
  );
};

export default App;
