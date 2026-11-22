
import React, { useEffect, useMemo, useState } from "react";
import { Plus, Download, RefreshCw } from "lucide-react";

import SupplierStats from "../components/SupplierStats";
import SupplierFilters from "../components/SupplierFilters";
import SupplierTable from "../components/SupplierTable";
import SupplierForm from "../components/SupplierForm";
import SupplierView from "./SupplierView";

import {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from "../api/supplierApi";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [viewSupplier, setViewSupplier] = useState(null);
  const [error, setError] = useState("");

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error("Supplier loading failed:", err);
      setError("Unable to load suppliers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        supplier.companyName?.toLowerCase().includes(searchText) ||
        supplier.supplierCode?.toLowerCase().includes(searchText) ||
        supplier.phone?.includes(searchText) ||
        supplier.gstin?.toLowerCase().includes(searchText);

      const matchesType =
        type === "ALL" || supplier.supplierType === type;

      const matchesStatus =
        status === "ALL" || supplier.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [suppliers, search, type, status]);

  const handleSave = async (payload) => {
    try {
      setError("");

      if (editingSupplier) {
        await updateSupplier(editingSupplier.id, payload);
      } else {
        await addSupplier(payload);
      }

      setShowForm(false);
      setEditingSupplier(null);
      await loadSuppliers();
    } catch (err) {
      setError(err.message || "Unable to save supplier.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this supplier?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteSupplier(id);
      await loadSuppliers();
    } catch (err) {
      setError(err.message || "Unable to deactivate supplier.");
    }
  };

  const exportCSV = () => {
    const headers = [
      "Supplier Code",
      "Company Name",
      "Supplier Type",
      "Contact Person",
      "Mobile",
      "Email",
      "GSTIN",
      "City",
      "Payment Terms",
      "Credit Limit",
      "Outstanding",
      "Status",
    ];

    const rows = filteredSuppliers.map((item) => [
      item.supplierCode,
      item.companyName,
      item.supplierType,
      item.contactPerson,
      item.phone,
      item.email,
      item.gstin,
      item.city,
      item.paymentTerms,
      item.creditLimit,
      item.outstanding,
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
    link.download = "suppliers-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Supplier Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage oil distributors, manufacturers and supplier payments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={loadSuppliers}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:bg-slate-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:bg-slate-50"
          >
            <Download size={17} />
            Export
          </button>

          <button
            onClick={() => {
              setEditingSupplier(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Supplier
          </button>
        </div>
      </div>

      <SupplierStats suppliers={suppliers} />

      <SupplierFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-slate-800">
          Supplier Directory
        </h2>

        <span className="text-sm text-slate-500">
          {filteredSuppliers.length} records
        </span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-slate-500">
          Loading suppliers...
        </div>
      ) : (
        <SupplierTable
          suppliers={filteredSuppliers}
          onView={setViewSupplier}
          onEdit={(supplier) => {
            setEditingSupplier(supplier);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <SupplierForm
          supplier={editingSupplier}
          onClose={() => {
            setShowForm(false);
            setEditingSupplier(null);
          }}
          onSave={handleSave}
        />
      )}

      {viewSupplier && (
        <SupplierView
          supplier={viewSupplier}
          onClose={() => setViewSupplier(null)}
        />
      )}
    </div>
  );
};

export default SupplierList;
