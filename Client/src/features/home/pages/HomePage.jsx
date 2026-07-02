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
    <div className="space-y-10">
      <div className="bg-mist-200 p-3">
        <h1 className="text-3xl font-bold text-center pt-5 ">Welcome {userName} </h1>

        <p className="mt-2 text-gray-500 text-center">
          Discover great products and enjoy shopping.
        </p>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Categories</h2>

          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category.id}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Products</h2>

          <Link to="/products">
            <Button>View All</Button>
          </Link>
        </div>

        <ProductList products={products} />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold text-center p-2">Quick Actions</h2>

        <div className="flex justify-center gap-5 flex-1 p-2">
          <Link to="/cart">
            <Button className="w-full bg-gray-600 ">Cart</Button>
          </Link>

          <Link to="/orders">
            <Button className="w-full bg-gray-600">My Orders</Button>
          </Link>

      

          <Link to="/profile">
            <Button className="w-full bg-gray-600">Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
