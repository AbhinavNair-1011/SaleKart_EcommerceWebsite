import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  Boxes,
  Package,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";

import LogoutButton from "../../features/auth/components/LogoutButton";

const links = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: Boxes,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: User,
  },
];

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-5">
          <h1 className="text-2xl font-bold text-indigo-600">SaleKart</h1>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LogoutButton />
            </div>

            <button
              className="md:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <nav className="hidden border-t px-6 py-3 md:flex md:justify-center md:gap-3">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={18} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {open && (
          <nav className="space-y-2 border-t p-4 md:hidden">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/admin"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />

                  {link.name}
                </NavLink>
              );
            })}

            <div className="pt-3">
              <LogoutButton />
            </div>
          </nav>
        )}
      </header>

      <main className="p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
