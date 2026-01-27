import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Register from '@/pages/Register';
import type { RootState } from '@/store';

interface Props {
  children: React.ReactNode;
}
const ProtectRouter = ({ children }: Props) => {
  const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);
  if(!isAuthChecked) {
    return null
  }
  if (!user) {
    return <Navigate to={'/login'} replace/>;
  }
  return children;
};
const GuestRouter = ({ children }: Props) => {
  const { user, isAuthChecked } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthChecked) {return null;}

  if (user) {return <Navigate to="/" replace />;}

  return children;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectRouter>
      <MainLayout />
    </ProtectRouter>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestRouter>
      <AuthLayout />
    </GuestRouter>,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
