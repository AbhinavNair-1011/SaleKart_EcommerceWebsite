import { Outlet } from "react-router-dom";

import UserNavbar from "../../shared/components/user/UserNavbar";
import Footer from "../../shared/components/user/Footer";

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default UserLayout;