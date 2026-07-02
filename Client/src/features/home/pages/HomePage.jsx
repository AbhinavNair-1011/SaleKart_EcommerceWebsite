import { Link } from "react-router-dom";

import Loader from "../../../shared/components/Loader";
import Button from "../../../shared/components/Button";

import ProductList from "../../products/components/ProductList";

import { useMe } from "../../auth/hooks/useMe";
import useProducts from "../../products/hooks/useProducts";
import useCategories from "../../admin/categories/hooks/useCategories";

function HomePage() {
  const { data: meData } = useMe();

  const { data: productData, isLoading } = useProducts({
    page: 1,
    limit: 8,
  });

  const { data: categoryData } = useCategories();

  if (isLoading) {
    return <Loader />;
  }

  const userName = meData?.name;

  const products = productData?.data?.products ?? [];

  const categories = categoryData?.data?.categories ?? [];

  return (
   <div className="mx-auto max-w-[90%] space-y-12 py-8">
  <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-10 py-14 text-white">
    <div className="max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
        Welcome Back
      </p>

      <h1 className="text-4xl font-bold leading-tight">
        Hello, {userName}
      </h1>

      <p className="mt-4 text-lg text-slate-300">
        Discover premium products, exclusive deals, and everything you need in
        one place.
      </p>

      <div className="mt-8 flex gap-4">
        <Link to="/products">
          <Button className="bg-gray-700 text-black ">
            Shop Now
          </Button>
        </Link>

        <Link to="/orders">
          <Button className="bg-slate-700 hover:bg-slate-600">
            My Orders
          </Button>
        </Link>
      </div>
    </div>
  </section>
    <section>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Quick Actions
      </h2>

      <p className="mt-1 text-gray-500">
        Access your shopping essentials.
      </p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        to="/cart"
        className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Shopping Cart
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Review products you've added before checkout.
        </p>
      </Link>

      <Link
        to="/orders"
        className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          My Orders
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Track orders and view your purchase history.
        </p>
      </Link>

      <Link
        to="/profile"
        className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Profile
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Manage your account information and addresses.
        </p>
      </Link>
    </div>
  </section>

 

<section className="mt-12 overflow-hidden rounded-2xl bg-white p-8 shadow-sm">
  <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
    <div>
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
        New Arrivals
      </span>


      <p className="mt-2 max-w-2xl text-gray-500">
        Explore the newest additions to our collection. Carefully selected
        products with premium quality and great value.
      </p>
    </div>

    <Link to="/products">
      <Button className="rounded-lg bg-slate-900 px-6 py-2.5 hover:bg-slate-800">
        View All Products →
      </Button>
    </Link>
  </div>

  <ProductList products={products} />
</section>

</div>
  );
}

export default HomePage;
