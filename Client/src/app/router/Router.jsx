import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));

const RegisterPage = lazy(
  () => import("../../features/auth/pages/RegisterPage"),
);

const VerifyEmailPage = lazy(
  () => import("../../features/auth/pages/VerifyEmailPage"),
);

const ForgotPasswordPage = lazy(
  () => import("../../features/auth/pages/ForgotPasswordPage"),
);

const ResetPasswordPage = lazy(
  () => import("../../features/auth/pages/ResetPasswordPage"),
);

const HomePage = lazy(() => import("../../features/home/pages/HomePage"));

const ProfilePage = lazy(
  () => import("../../features/profile/pages/ProfilePage"),
);

const ProductPage = lazy(
  () => import("../../features/products/pages/ProductPage"),
);

const CartPage = lazy(() => import("../../features/cart/pages/CartPage"));

const CheckoutPage = lazy(() => import("../../features/checkout/CheckoutPage"));

const OrdersPage = lazy(() => import("../../features/orders/pages/OrdersPage"));

const OrderDetailsPage = lazy(
  () => import("../../features/orders/pages/OrderDetailsPage"),
);

const AdminDashboardPage = lazy(
  () => import("../../features/admin/dashboard/pages/AdminDashboardPage"),
);

const CategoryPage = lazy(
  () => import("../../features/admin/categories/pages/CategoryPage"),
);

const AdminProductPage = lazy(
  () => import("../../features/admin/product/pages/AdminProductPage"),
);

const AdminOrdersPage = lazy(
  () => import("../../features/admin/orders/pages/AdminOrdersPage"),
);

const AdminOrderDetailsPage = lazy(
  () => import("../../features/admin/orders/pages/AdminOrderDetailsPage"),
);

const UsersPage = lazy(
  () => import("../../features/admin/users/pages/UsersPage"),
);

const NotFoundPage = lazy(() => import("../../pages/NotFountPage"));

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: withSuspense(LoginPage),
          },
          {
            path: "/register",
            element: withSuspense(RegisterPage),
          },
          {
            path: "/verify-email",
            element: withSuspense(VerifyEmailPage),
          },
          {
            path: "/forgot-password",
            element: withSuspense(ForgotPasswordPage),
          },
          {
            path: "/reset-password",
            element: withSuspense(ResetPasswordPage),
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
                element: withSuspense(HomePage),
              },
              {
                path: "/profile",
                element: withSuspense(ProfilePage),
              },
              {
                path: "/products",
                element: withSuspense(ProductPage),
              },
              {
                path: "/cart",
                element: withSuspense(CartPage),
              },
              {
                path: "/checkout",
                element: withSuspense(CheckoutPage),
              },
              {
                path: "/orders",
                element: withSuspense(OrdersPage),
              },
              {
                path: "/orders/:id",
                element: withSuspense(OrderDetailsPage),
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
                element: withSuspense(AdminDashboardPage),
              },
              {
                path: "/admin/categories",
                element: withSuspense(CategoryPage),
              },
              {
                path: "/admin/products",
                element: withSuspense(AdminProductPage),
              },
              {
                path: "/admin/orders",
                element: withSuspense(AdminOrdersPage),
              },
              {
                path: "/admin/users",
                element: withSuspense(UsersPage),
              },
              {
                path: "/admin/orders/:id",
                element: withSuspense(AdminOrderDetailsPage),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: withSuspense(NotFoundPage),
  },
]);

export default router;
