
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
    <div className="flex h-screen w-screen items-center justify-center bg-linear-to-t from-sky-500 to-indigo-500">
      <Outlet />
    </div>
  );
export default AuthLayout;
