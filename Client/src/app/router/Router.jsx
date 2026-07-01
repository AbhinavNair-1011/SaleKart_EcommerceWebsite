import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";

import HomePage from "../../features/home/pages/HomePage";

import AdminDashboardPage from "../../features/admin/dashboard/AdminDashboardPage";
import CategoryPage from "../../features/admin/categories/pages/CategoryPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";

import NotFoundPage from "../../pages/NotFountPage";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserRoute from "./UserRoute";
import ProfilePage from "../../features/profile/pages/ProfilePage";
import ProductPage from "../../features/products/pages/ProductPage";
import CartPage from "../../features/cart/pages/CartPage";
import AdminProductPage from "../../features/admin/product/pages/AdminProductPage";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <UserRoute />,
        children: [
          {
            element: <UserLayout />,
            children: [
              {
                path: "/",
                element: <HomePage />,
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
              {
                path: "/products",
                element: <ProductPage />,
              },
               {
                path: "/cart",
                element: <CartPage />,
              },
            ],
          },
        ],
      },

      {
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/admin",
                element: <AdminDashboardPage />,
              },
              {
                path: "/admin/categories",
                element: <CategoryPage />,
              },
              {
                path: "/admin/products",
                element: <AdminProductPage />,
              },
             
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
