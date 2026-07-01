import { Navigate, Outlet } from "react-router-dom";

import Loader from "../../shared/components/Loader";
import { useMe } from "../../features/auth/hooks/useMe";

function UserRoute() {
  const {
    data: user,
    isLoading,
    isError,
  } = useMe();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default UserRoute;