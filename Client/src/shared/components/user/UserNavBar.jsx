import { NavLink } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

function UserNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <NavLink
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          SaleKart
        </NavLink>

        <nav className="flex items-center gap-8">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/products">Products</NavLink>

          <NavLink to="/orders">Orders</NavLink>

          <NavLink
            to="/cart"
            className="flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Cart
          </NavLink>

          <NavLink
            to="/profile"
            className="flex items-center gap-2"
          >
            <User size={20} />
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default UserNavbar;