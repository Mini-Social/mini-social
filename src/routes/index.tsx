import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from '@/pages/Login';
import Register from '@/pages/Register';

const router = createBrowserRouter([
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
