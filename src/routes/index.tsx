import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

interface Props {
  children: React.ReactNode;
}
const ProtectRouter = ({ children }: Props) => {
  const currentUser = true;

  if (!currentUser) {
    return <Navigate to={'/login'} />;
  }
  return children;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectRouter>
        <MainLayout />
      </ProtectRouter>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
