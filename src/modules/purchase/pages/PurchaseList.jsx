
import React, { useEffect, useMemo, useState } from "react";
import { Plus, Download, RefreshCw } from "lucide-react";

import PurchaseStats from "../components/PurchaseStats";
import PurchaseFilters from "../components/PurchaseFilters";
import PurchaseTable from "../components/PurchaseTable";
import PurchaseForm from "../components/PurchaseForm";
import PurchaseView from "./PurchaseView";

import {
  getPurchases,
  addPurchase,
  updatePurchase,
  deletePurchase,
} from "../api/purchaseApi";

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [showForm, setShowForm] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);
  const [viewPurchase, setViewPurchase] = useState(null);

  const loadPurchases = async () => {
    try {
      setLoading(true);
      const response = await getPurchases();
      setPurchases(response);
    } catch (error) {
      console.error("Failed to load purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        purchase.purchaseNo?.toLowerCase().includes(searchText) ||
        purchase.supplier?.toLowerCase().includes(searchText) ||
        purchase.supplierInvoice?.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "ALL" || purchase.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [purchases, search, status]);

  const handleSave = async (payload) => {
    try {
      if (editingPurchase) {
        await updatePurchase(editingPurchase.id, payload);
      } else {
        await addPurchase(payload);
      }

      setShowForm(false);
      setEditingPurchase(null);
      await loadPurchases();
    } catch (error) {
      console.error("Failed to save purchase:", error);
      alert("Unable to save purchase.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this purchase?"
    );

    if (!confirmed) return;

    try {
      await deletePurchase(id);
      await loadPurchases();
    } catch (error) {
      console.error("Failed to delete purchase:", error);
      alert("Unable to delete purchase.");
    }
  };

  const handleEdit = (purchase) => {
    setEditingPurchase(purchase);
    setShowForm(true);
  };

  const exportCSV = () => {
    const headers = [
      "Purchase No",
      "Date",
      "Supplier",
      "Supplier Invoice",
      "Total",
      "Paid",
      "Due",
      "Status",
    ];

    const rows = filteredPurchases.map((item) => [
      item.purchaseNo,
      item.purchaseDate,
      item.supplier,
      item.supplierInvoice,
      item.total,
      item.paidAmount,
      item.dueAmount,
      item.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "purchase-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Purchase Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage supplier purchases, stock entries and payments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={loadPurchases}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            <Download size={17} />
            Export
          </button>

          <button
            onClick={() => {
              setEditingPurchase(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            New Purchase
          </button>
        </div>
      </div>

      <PurchaseStats purchases={purchases} />

      <PurchaseFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">
          Purchase History
        </h2>

        <span className="text-sm text-slate-500">
          {filteredPurchases.length} records
        </span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-slate-500">
          Loading purchases...
        </div>
      ) : (
        <PurchaseTable
          purchases={filteredPurchases}
          onView={setViewPurchase}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <PurchaseForm
          purchase={editingPurchase}
          onClose={() => {
            setShowForm(false);
            setEditingPurchase(null);
          }}
          onSave={handleSave}
        />
      )}

      {viewPurchase && (
        <PurchaseView
          purchase={viewPurchase}
          onClose={() => setViewPurchase(null)}
        />
      )}
    </div>
  );
};

export default PurchaseList;
