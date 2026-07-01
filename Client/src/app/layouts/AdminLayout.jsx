import { Outlet } from "react-router-dom";

import AdminNavbar from "../../shared/components/admin/AdminNavbar";
import AdminSidebar from "../../shared/components/admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminNavbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;