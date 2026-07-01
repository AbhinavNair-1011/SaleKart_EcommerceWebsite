import { Navigate, Outlet } from "react-router-dom";

import { useMe } from "../../features/auth/hooks/useMe";

function AdminRoute() {
  const { data: user } = useMe();

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;