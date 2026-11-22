
import React, { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

import { calculateSaleTotals, formatCurrency, generateInvoiceNumber } from "../utils/salesHelpers";

const demoProducts = [
  {
    id: 1,
    name: "Castrol Power1 Ultimate",
    sku: "ENG-001",
    unit: "1 Litre Bottle",
    price: 550,
    wholesalePrice: 510,
    gst: 18,
  },
  {
    id: 2,
    name: "Mobil Super 1000",
    sku: "ENG-002",
    unit: "5 Litre Can",
    price: 1550,
    wholesalePrice: 1450,
    gst: 18,
  },
  {
    id: 3,
    name: "Shell Spirax Gear Oil",
    sku: "GEAR-001",
    unit: "1 Litre Bottle",
    price: 420,
    wholesalePrice: 390,
    gst: 18,
  },
  {
    id: 4,
    name: "HP Milcy Turbo",
    sku: "TRC-001",
    unit: "15 Litre Tin",
    price: 2600,
    wholesalePrice: 2450,
    gst: 18,
  },
];

const emptyItem = {
  productId: "",
  productName: "",
  sku: "",
  unit: "",
  quantity: 1,
  price: 0,
  gst: 18,
};

const SalesForm = ({ sale, onClose, onSubmit }) => {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [saleType, setSaleType] = useState("RETAIL");
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [discount, setDiscount] = useState(0);
  const [paid, setPaid] = useState(0);
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [error, setError] = useState("");

  useEffect(() => {
    if (sale) {
      setCustomer(sale.customer || "");
      setPhone(sale.phone || "");
      setSaleType(sale.saleType || "RETAIL");
      setItems(
        sale.items?.map((item) => {
          const product = demoProducts.find(
            (p) => p.sku === item.sku
          );

          return {
            ...item,
            productId: product?.id || "",
          };
        }) || [{ ...emptyItem }]
      );
      setDiscount(sale.discount || 0);
      setPaid(sale.paid || 0);
      setPaymentMode(sale.paymentMode || "CASH");
    } else {
      setCustomer("");
      setPhone("");
      setSaleType("RETAIL");
      setItems([{ ...emptyItem }]);
      setDiscount(0);
      setPaid(0);
      setPaymentMode("CASH");
    }

    setError("");
  }, [sale]);

  const totals = useMemo(
    () => calculateSaleTotals({ items, discount }),
    [items, discount]
  );

  const due = Math.max(0, totals.total - Number(paid || 0));

  const handleProductChange = (index, productId) => {
    const product = demoProducts.find(
      (p) => p.id === Number(productId)
    );

    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              productId,
              productName: product?.name || "",
              sku: product?.sku || "",
              unit: product?.unit || "",
              price: product
                ? saleType === "WHOLESALE"
                  ? product.wholesalePrice
                  : product.price
                : 0,
              gst: product?.gst || 0,
            }
          : item
      )
    );
  };

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, { ...emptyItem }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;

    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaleTypeChange = (value) => {
    setSaleType(value);

    setItems((prev) =>
      prev.map((item) => {
        const product = demoProducts.find(
          (p) => p.id === Number(item.productId)
        );

        if (!product) return item;

        return {
          ...item,
          price:
            value === "WHOLESALE"
              ? product.wholesalePrice
              : product.price,
        };
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer.trim()) {
      setError("Please enter customer name.");
      return;
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (items.some((item) => !item.productId)) {
      setError("Please select a product for every row.");
      return;
    }

    if (items.some(
      (item) =>
        Number(item.quantity) <= 0 ||
        Number(item.price) < 0
    )) {
      setError("Please enter valid quantity and price.");
      return;
    }

    if (Number(discount) < 0 || Number(discount) > totals.subtotal) {
      setError("Discount must be between zero and subtotal.");
      return;
    }

    if (Number(paid) < 0 || Number(paid) > totals.total) {
      setError("Received amount cannot exceed invoice total.");
      return;
    }

    const payload = {
      invoiceNo: sale?.invoiceNo || generateInvoiceNumber(),
      date: sale?.date || new Date().toISOString().slice(0, 10),
      customer: customer.trim(),
      phone,
      saleType,
      items: items.map(({ productId, ...item }) => ({
        ...item,
        quantity: Number(item.quantity),
        price: Number(item.price),
        gst: Number(item.gst),
      })),
      ...totals,
      paid: Number(paid),
      due,
      paymentMode,
      status: due <= 0 ? "PAID" : Number(paid) > 0 ? "PARTIAL" : "UNPAID",
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6">

      <div className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {sale ? "Edit Sales Invoice" : "Create New Sale"}
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Add customer, products and payment information.
            </p>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">

          <div className="flex-1 space-y-6 overflow-y-auto p-5">

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* CUSTOMER INFORMATION */}
            <section>
              <h3 className="mb-4 text-sm font-bold text-gray-800">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Customer Name *
                  </label>
                  <input
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Enter customer name"
                    className="h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#E53935]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Mobile Number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    placeholder="10 digit mobile number"
                    className="h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#E53935]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Sale Type
                  </label>
                  <select
                    value={saleType}
                    onChange={(e) => handleSaleTypeChange(e.target.value)}
                    className="h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#E53935]"
                  >
                    <option value="RETAIL">Retail</option>
                    <option value="WHOLESALE">Wholesale</option>
                  </select>
                </div>
              </div>
            </section>

            {/* PRODUCT INFORMATION */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">
                  Sale Products
                </h3>

                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-[#E53935]"
                >
                  <Plus size={15} />
                  Add Item
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-gray-50">
                    <tr className="text-xs font-semibold text-gray-500">
                      <th className="p-3">Product</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">GST %</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3">
                          <select
                            value={item.productId}
                            onChange={(e) =>
                              handleProductChange(index, e.target.value)
                            }
                            className="h-10 w-56 rounded-lg border px-2 text-xs"
                          >
                            <option value="">Select Product</option>

                            {demoProducts.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="p-3 text-xs text-gray-600">
                          {item.unit || "-"}
                        </td>

                        <td className="p-3">
                          <input
                            type="number"
                            min="0.001"
                            step="0.001"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(index, "quantity", e.target.value)
                            }
                            className="h-10 w-20 rounded-lg border px-2 text-xs"
                          />
                        </td>

                        <td className="p-3">
                          <input
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) =>
                              updateItem(index, "price", e.target.value)
                            }
                            className="h-10 w-24 rounded-lg border px-2 text-xs"
                          />
                        </td>

                        <td className="p-3 text-xs">
                          {item.gst}%
                        </td>

                        <td className="p-3 text-xs font-semibold text-gray-800">
                          {formatCurrency(
                            Number(item.quantity) * Number(item.price)
                          )}
                        </td>

                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* PAYMENT */}
            <section>
              <h3 className="mb-4 text-sm font-bold text-gray-800">
                Payment Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Discount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#E53935]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Payment Mode
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#E53935]"
                  >
                    <option value="CASH">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="BANK">Bank Transfer</option>
                    <option value="CARD">Card</option>
                    <option value="CREDIT">Credit</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Amount Received (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    className="h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#E53935]"
                  />
                </div>

              </div>

              <div className="mt-5 ml-auto max-w-md rounded-xl bg-gray-50 p-4">

                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>

                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span>{formatCurrency(totals.discount)}</span>
                </div>

                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">GST</span>
                  <span>{formatCurrency(totals.gstAmount)}</span>
                </div>

                <div className="my-2 border-t border-gray-200" />

                <div className="flex justify-between py-2 font-bold text-gray-900">
                  <span>Grand Total</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>

                <div className="flex justify-between py-2 text-sm text-green-700">
                  <span>Received</span>
                  <span>{formatCurrency(paid)}</span>
                </div>

                <div className="flex justify-between py-2 text-sm font-bold text-red-600">
                  <span>Balance Due</span>
                  <span>{formatCurrency(due)}</span>
                </div>
              </div>
            </section>

          </div>

          <div className="flex justify-end gap-3 border-t bg-gray-50 p-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#E53935] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#C62828]"
            >
              {sale ? "Update Sale" : "Save Sale"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SalesForm;
