import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../../../shared/components/Button";
import Loader from "../../../../shared/components/Loader";

import ProductModal from "../components/ProductModal";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import useProducts from "../hooks/useProducts";
import useCreateProduct from "../hooks/useCreateProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";
import useDeleteProduct from "../hooks/useDeleteProduct";

import useCategories from "../../categories/hooks/useCategories";

function AdminProductPage() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const { data, isLoading } = useProducts();

  const { data: categoryData } = useCategories();

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const { mutate: deleteProduct } = useDeleteProduct();

  if (isLoading) return <Loader />;

  const products = data?.data?.products ?? [];

  const categories = categoryData?.data?.categories ?? [];

  function handleCreate(formData) {
    createProduct(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });

        toast.success("Product created.");

        setOpen(false);
      },
    });
  }

  function handleUpdate(formData) {
    updateProduct(
      {
        id: editingProduct.id,
        data: formData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });

          toast.success("Product updated.");

          setEditingProduct(null);

          setOpen(false);
        },
      },
    );
  }

  function handleDelete(product) {
    if (!confirm("Delete this product?")) return;

    deleteProduct(product.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });

        toast.success("Product deleted.");
      },
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <Button
          onClick={() => {
            setEditingProduct(null);
            setOpen(true);
          }}
        >
          + Add Product
        </Button>
      </div>

      <ProductTable
        products={products}
        onEdit={(product) => {
          setEditingProduct({
            ...product,
            categoryId: product.Category.id,
          });

          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      {open && (
        <ProductModal
          title={editingProduct ? "Edit Product" : "Add Product"}
          onClose={() => setOpen(false)}
        >
          <ProductForm
            defaultValues={editingProduct}
            categories={categories}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            isPending={isCreating || isUpdating}
            buttonText={editingProduct ? "Update Product" : "Create Product"}
          />
        </ProductModal>
      )}
    </div>
  );
}

export default AdminProductPage;
