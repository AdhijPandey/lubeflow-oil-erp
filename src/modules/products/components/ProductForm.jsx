
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const initialForm = {
  sku: "",
  name: "",
  brand: "",
  category: "",
  viscosity: "",
  unit: "",
  purchasePrice: "",
  retailPrice: "",
  wholesalePrice: "",
  stock: "",
  minStock: "",
  gst: "18",
  status: "ACTIVE",
};

const ProductForm = ({
  open,
  product,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(product ? { ...initialForm, ...product } : initialForm);
      setError("");
    }
  }, [product, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.sku.trim() ||
      !form.name.trim() ||
      !form.brand.trim() ||
      !form.category ||
      !form.unit ||
      form.purchasePrice === "" ||
      form.retailPrice === "" ||
      form.wholesalePrice === ""
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (
      Number(form.purchasePrice) < 0 ||
      Number(form.retailPrice) < 0 ||
      Number(form.wholesalePrice) < 0 ||
      Number(form.stock) < 0 ||
      Number(form.minStock) < 0
    ) {
      setError("Price and stock values cannot be negative.");
      return;
    }

    if (
      Number(form.retailPrice) < Number(form.purchasePrice)
    ) {
      setError("Retail price cannot be lower than purchase price.");
      return;
    }

    if (
      Number(form.wholesalePrice) < Number(form.purchasePrice)
    ) {
      setError("Wholesale price cannot be lower than purchase price.");
      return;
    }

    onSubmit({
      ...form,
      purchasePrice: Number(form.purchasePrice),
      retailPrice: Number(form.retailPrice),
      wholesalePrice: Number(form.wholesalePrice),
      stock: Number(form.stock || 0),
      minStock: Number(form.minStock || 0),
      gst: Number(form.gst),
    });
  };

  const fields = [
    { name: "sku", label: "SKU Code", required: true },
    { name: "name", label: "Product Name", required: true },
    { name: "brand", label: "Brand", required: true },
    { name: "viscosity", label: "Viscosity / Grade" },
    { name: "purchasePrice", label: "Purchase Price", type: "number", required: true },
    { name: "retailPrice", label: "Retail Price", type: "number", required: true },
    { name: "wholesalePrice", label: "Wholesale Price", type: "number", required: true },
    { name: "stock", label: "Opening Stock", type: "number" },
    { name: "minStock", label: "Minimum Stock", type: "number" },
  ];

  const renderField = (field) => (
    <div key={field.name}>
      <label className="mb-2 block text-xs font-semibold text-gray-600">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>

      <input
        name={field.name}
        type={field.type || "text"}
        min={field.type === "number" ? "0" : undefined}
        value={form[field.name]}
        onChange={handleChange}
        className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-100"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6">

      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Enter product information and pricing details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">

          <div className="flex-1 space-y-6 overflow-y-auto p-6">

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <section>
              <h3 className="mb-4 text-sm font-bold text-gray-800">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {renderField(fields[0])}
                {renderField(fields[1])}
                {renderField(fields[2])}
                {renderField(fields[3])}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E53935]"
                  >
                    <option value="">Select Category</option>
                    <option>Bike Engine Oil</option>
                    <option>Car Engine Oil</option>
                    <option>Tractor Engine Oil</option>
                    <option>Gear Oil</option>
                    <option>Industrial Oil</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Packaging / Unit *
                  </label>
                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E53935]"
                  >
                    <option value="">Select Unit</option>
                    <option>1 Litre Bottle</option>
                    <option>5 Litre Can</option>
                    <option>15 Litre Tin</option>
                    <option>Open / Loose Oil</option>
                    <option>200 Litre Drum</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-bold text-gray-800">
                Pricing Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {renderField(fields[4])}
                {renderField(fields[5])}
                {renderField(fields[6])}
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-bold text-gray-800">
                Stock & Tax Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {renderField(fields[7])}
                {renderField(fields[8])}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    GST (%)
                  </label>
                  <select
                    name="gst"
                    value={form.gst}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E53935]"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E53935]"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>
            </section>

          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#E53935] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#C62828]"
            >
              {product ? "Update Product" : "Save Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductForm;
