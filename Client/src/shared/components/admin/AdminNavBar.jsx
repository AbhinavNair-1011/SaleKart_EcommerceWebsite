import { LogOut } from "lucide-react";
import LogoutButton from "../../../features/auth/components/LogoutButton";

function AdminNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-xl font-semibold">
        Admin Dashboard
      </h1>

    <LogoutButton/>
    </header>
  );
}

export default AdminNavbar;