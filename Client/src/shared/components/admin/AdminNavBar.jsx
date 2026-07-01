import { LogOut } from "lucide-react";

function AdminNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-xl font-semibold">
        Admin Dashboard
      </h1>

      <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}

export default AdminNavbar;