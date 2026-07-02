import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";

import HomePage from "../../features/home/pages/HomePage";

import CategoryPage from "../../features/admin/categories/pages/CategoryPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserRoute from "./UserRoute";

import ProfilePage from "../../features/profile/pages/ProfilePage";
import ProductPage from "../../features/products/pages/ProductPage";
import CartPage from "../../features/cart/pages/CartPage";

import OrdersPage from "../../features/orders/pages/OrdersPage";
import OrderDetailsPage from "../../features/orders/pages/OrderDetailsPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

import AdminOrdersPage from "../../features/admin/orders/pages/AdminOrdersPage";
import AdminOrderDetailsPage from "../../features/admin/orders/pages/AdminOrderDetailsPage";
import AdminProductPage from "../../features/admin/product/pages/AdminProductPage";
import AdminDashboardPage from "../../features/admin/dashboard/pages/AdminDashboardPage";
import UsersPage from "../../features/admin/users/pages/UsersPage";

import NotFoundPage from "../../pages/NotFountPage";
import VerifyEmailPage from "../../features/auth/pages/VerifyEmailPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../../features/auth/pages/ResetPasswordPage";

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
          {
            path: "/verify-email",
            element: <VerifyEmailPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage/>,
          },

          {
            path: "/reset-password",
            element: <ResetPasswordPage/>,
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
              {
                path: "/checkout",
                element: <CheckoutPage />,
              },
              {
                path: "/orders",
                element: <OrdersPage />,
              },
              {
                path: "/orders/:id",
                element: <OrderDetailsPage />,
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
              {
                path: "/admin/orders",
                element: <AdminOrdersPage />,
              },
              {
                path: "/admin/users",
                element: <UsersPage />,
              },
              {
                path: "/admin/orders/:id",
                element: <AdminOrderDetailsPage />,
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
