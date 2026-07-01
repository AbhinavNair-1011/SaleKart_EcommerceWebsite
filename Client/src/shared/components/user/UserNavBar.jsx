import { NavLink } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import LogoutButton from "../../../features/auth/components/LogoutButton";
import useCart from "../../../features/cart/hooks/useCart";

function UserNavbar() {
  const { data } = useCart();

  const cart = data?.data?.cart ?? [];

  const cartCount = cart.reduce((acc,item)=>{

return acc= acc + item.quantity 

  }, 0)

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
          SaleKart
        </NavLink>

        <nav className="flex items-center gap-8">
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

        <LogoutButton />
      </div>
    </header>
  );
}

export default UserNavbar;
