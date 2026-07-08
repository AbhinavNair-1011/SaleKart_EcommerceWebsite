import { useState } from "react";

import { NavLink, Outlet } from "react-router-dom";

import { Menu, X, ShoppingCart, User } from "lucide-react";

import LogoutButton from "../../features/auth/components/LogoutButton";
import useCart from "../../features/cart/hooks/useCart";

import Footer from "../../shared/components/Footer";

function UserLayout() {
  const [open, setOpen] = useState(false);

  const { data } = useCart();

  const cart = data?.data?.cart ?? [];

  const cartCount = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <NavLink to="/" className="text-3xl font-bold text-indigo-600">
            SaleKart
          </NavLink>
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/products">Products</NavLink>

            <NavLink to="/orders">Orders</NavLink>

            <NavLink to="/cart" className="flex items-center gap-2">
              <ShoppingCart size={20} />
              Cart
              {cartCount > 0 && (
                <span className="-ml-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/profile" className="flex items-center gap-2">
              <User size={20} />
              Profile
            </NavLink>
          </nav>

          <div className="hidden md:block">
            <LogoutButton />
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-2 border-t px-6 py-5 md:hidden">
            {[
              ["/", "Home"],
              ["/products", "Products"],
              ["/orders", "Orders"],
            ].map(([path, name]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            <NavLink
              to="/cart"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <ShoppingCart size={20} />
              Cart
              {cartCount > 0 && (
                <span className="-ml-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <User size={20} />
              Profile
            </NavLink>

            <div className="pt-2">
              <LogoutButton />
            </div>
          </nav>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default UserLayout;
