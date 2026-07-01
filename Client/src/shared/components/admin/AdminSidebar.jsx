import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Boxes,
  Package,
  ShoppingCart,
} from "lucide-react";

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
];

function AdminSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white shadow-sm">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-indigo-600">
          SaleKart
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
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
      </nav>
    </aside>
  );
}

export default AdminSidebar;