
import React, { useEffect, useMemo, useState } from "react";
import { Plus, Package, Download } from "lucide-react";

import ProductStats from "../components/ProductStats";
import ProductFilters from "../components/ProductFilters";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import ProductView from "./ProductView";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

import { getProductStats } from "../utils/productHelpers";

const PAGE_SIZE = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const [message, setMessage] = useState("");

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response);
    } catch (error) {
      console.error("Product loading failed:", error);
      setMessage("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // PRODUCT STATS
  const stats = useMemo(
    () => getProductStats(products),
    [products]
  );

  // SEARCH AND FILTER
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch = [
        product.name,
        product.brand,
        product.sku,
        product.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "ALL" || product.category === category;

      const statusMatch =
        status === "ALL" || product.status === status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [products, search, category, status]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search, category, status]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ADD PRODUCT
  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  // SAVE PRODUCT
  const handleSave = async (payload) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, payload);
        setMessage("Product updated successfully.");
      } else {
        await createProduct(payload);
        setMessage("Product added successfully.");
      }

      setShowForm(false);
      setSelectedProduct(null);

      await loadProducts();
    } catch (error) {
      console.error("Product save failed:", error);
      setMessage("Unable to save product.");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteProduct(product.id);

      setMessage("Product deleted successfully.");

      await loadProducts();
    } catch (error) {
      console.error("Product deletion failed:", error);
      setMessage("Unable to delete product.");
    }
  };

  // CLEAR FILTERS
  const handleClear = () => {
    setSearch("");
    setCategory("ALL");
    setStatus("ALL");
    setPage(1);
  };

  // EXPORT CSV
  const handleExport = () => {
    const headers = [
      "SKU",
      "Product",
      "Brand",
      "Category",
      "Unit",
      "Purchase Price",
      "Retail Price",
      "Wholesale Price",
      "Stock",
      "Status",
    ];

    const rows = filteredProducts.map((p) => [
      p.sku,
      p.name,
      p.brand,
      p.category,
      p.unit,
      p.purchasePrice,
      p.retailPrice,
      p.wholesalePrice,
      p.stock,
      p.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) =>
          `"${String(value ?? "").replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "lubeflow-products.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <div className="flex items-center gap-2">
            <Package size={23} className="text-[#E53935]" />
            <h1 className="text-2xl font-bold text-gray-900">
              Product Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Manage your oil products, brands, packaging and pricing.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            <Download size={17} />
            Export CSV
          </button>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-xl bg-[#E53935] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#C62828]"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

      </div>

      {/* MESSAGE */}
      {message && (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}

          <button onClick={() => setMessage("")}>
            ×
          </button>
        </div>
      )}

      {/* STATS */}
      <ProductStats stats={stats} />

      {/* FILTERS */}
      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        onClear={handleClear}
      />

      {/* PRODUCT TABLE */}
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Product List
            </h2>

            <p className="text-xs text-gray-500">
              {filteredProducts.length} products found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white py-20 text-center text-sm text-gray-500">
            Loading products...
          </div>
        ) : (
          <>
            <ProductTable
              products={paginatedProducts}
              onView={setViewProduct}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* PAGINATION */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <p className="text-sm text-gray-500">
                Showing{" "}
                {filteredProducts.length === 0
                  ? 0
                  : (page - 1) * PAGE_SIZE + 1}
                {" "}to{" "}
                {Math.min(page * PAGE_SIZE, filteredProducts.length)}
                {" "}of {filteredProducts.length} products
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-lg bg-[#E53935] px-4 py-2 text-sm font-semibold text-white">
                  {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>

            </div>
          </>
        )}

      </div>

      {/* ADD / EDIT MODAL */}
      <ProductForm
        open={showForm}
        product={selectedProduct}
        onClose={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSave}
      />

      {/* VIEW MODAL */}
      <ProductView
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />

    </div>
  );
};

export default ProductList;
