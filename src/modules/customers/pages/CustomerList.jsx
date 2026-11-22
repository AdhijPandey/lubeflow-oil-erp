
import React, { useEffect, useMemo, useState } from "react";
import { Plus, Download, RefreshCw } from "lucide-react";

import CustomerStats from "../components/CustomerStats";
import CustomerFilters from "../components/CustomerFilters";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";
import CustomerView from "./CustomerView";

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);

  const [error, setError] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Customer loading failed:", err);
      setError("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        customer.name?.toLowerCase().includes(searchText) ||
        customer.customerCode?.toLowerCase().includes(searchText) ||
        customer.phone?.includes(searchText) ||
        customer.gstin?.toLowerCase().includes(searchText);

      const matchesType =
        type === "ALL" || customer.type === type;

      const matchesStatus =
        status === "ALL" || customer.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [customers, search, type, status]);

  const handleSave = async (payload) => {
    try {
      setError("");

      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, payload);
      } else {
        await addCustomer(payload);
      }

      setShowForm(false);
      setEditingCustomer(null);
      await loadCustomers();
    } catch (err) {
      console.error("Customer save failed:", err);
      setError(err.message || "Unable to save customer.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this customer?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteCustomer(id);
      await loadCustomers();
    } catch (err) {
      setError(err.message || "Unable to deactivate customer.");
    }
  };

  const exportCSV = () => {
    const headers = [
      "Customer Code",
      "Name",
      "Type",
      "Mobile",
      "Email",
      "GSTIN",
      "City",
      "Credit Limit",
      "Outstanding",
      "Status",
    ];

    const rows = filteredCustomers.map((item) => [
      item.customerCode,
      item.name,
      item.type,
      item.phone,
      item.email,
      item.gstin,
      item.city,
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
    link.download = "customers-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Customer Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage retail and wholesale customers, credit and balances.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={loadCustomers}
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
              setEditingCustomer(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Customer
          </button>
        </div>
      </div>

      <CustomerStats customers={customers} />

      <CustomerFilters
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
          Customer Directory
        </h2>

        <span className="text-sm text-slate-500">
          {filteredCustomers.length} records
        </span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-slate-500">
          Loading customers...
        </div>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onView={setViewCustomer}
          onEdit={(customer) => {
            setEditingCustomer(customer);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <CustomerForm
          customer={editingCustomer}
          onClose={() => {
            setShowForm(false);
            setEditingCustomer(null);
          }}
          onSave={handleSave}
        />
      )}

      {viewCustomer && (
        <CustomerView
          customer={viewCustomer}
          onClose={() => setViewCustomer(null)}
        />
      )}
    </div>
  );
};

export default CustomerList;
