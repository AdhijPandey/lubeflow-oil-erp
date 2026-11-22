
import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  ShoppingCart,
  Download,
} from "lucide-react";

import SalesStats from "../components/SalesStats";
import SalesFilters from "../components/SalesFilters";
import SalesTable from "../components/SalesTable";
import SalesForm from "../components/SalesForm";
import SalesView from "./SalesView";

import {
  getSales,
  createSale,
  updateSale,
  deleteSale,
} from "../api/salesApi";

import { getSalesStats } from "../utils/salesHelpers";

const PAGE_SIZE = 10;

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [saleType, setSaleType] = useState("ALL");

  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [viewSale, setViewSale] = useState(null);

  const [invoiceSale, setInvoiceSale] = useState(null);
  const [message, setMessage] = useState("");

  const loadSales = async () => {
    try {
      setLoading(true);
      const response = await getSales();
      setSales(response);
    } catch (error) {
      console.error("Unable to load sales:", error);
      setMessage("Unable to load sales records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  const stats = useMemo(
    () => getSalesStats(sales),
    [sales]
  );

  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const searchMatch = [
        sale.invoiceNo,
        sale.customer,
        sale.phone,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        status === "ALL" ||
        sale.status === status;

      const typeMatch =
        saleType === "ALL" ||
        sale.saleType === saleType;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [sales, search, status, saleType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSales.length / PAGE_SIZE)
  );

  const paginatedSales = filteredSales.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search, status, saleType]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // NEW SALE
  const handleAdd = () => {
    setSelectedSale(null);
    setShowForm(true);
  };

  // EDIT SALE
  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setShowForm(true);
  };

  // SAVE SALE
  const handleSave = async (payload) => {
    try {
      if (selectedSale) {
        await updateSale(selectedSale.id, payload);
        setMessage("Sales invoice updated successfully.");
      } else {
        await createSale(payload);
        setMessage("New sale created successfully.");
      }

      setShowForm(false);
      setSelectedSale(null);

      await loadSales();
    } catch (error) {
      console.error("Unable to save sale:", error);
      setMessage("Unable to save sales invoice.");
    }
  };

  // DELETE SALE
  const handleDelete = async (sale) => {
    const confirmed = window.confirm(
      `Delete invoice ${sale.invoiceNo}?`
    );

    if (!confirmed) return;

    try {
      await deleteSale(sale.id);
      setMessage("Sales invoice deleted successfully.");
      await loadSales();
    } catch (error) {
      console.error("Unable to delete sale:", error);
      setMessage("Unable to delete sales invoice.");
    }
  };

  // EXPORT CSV
  const handleExport = () => {
    const headers = [
      "Invoice No",
      "Date",
      "Customer",
      "Phone",
      "Sale Type",
      "Total",
      "Received",
      "Due",
      "Status",
    ];

    const rows = filteredSales.map((sale) => [
      sale.invoiceNo,
      sale.date,
      sale.customer,
      sale.phone,
      sale.saleType,
      sale.total,
      sale.paid,
      sale.due,
      sale.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "lubeflow-sales.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-[#E53935]" />

            <h1 className="text-2xl font-bold text-gray-900">
              Sales Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Manage retail sales, wholesale orders, invoices and payments.
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
            className="flex items-center gap-2 rounded-xl bg-[#E53935] px-5 py-3 text-sm font-semibold text-white hover:bg-[#C62828]"
          >
            <Plus size={18} />
            New Sale
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      {/* STATS */}
      <SalesStats stats={stats} />

      {/* FILTERS */}
      <SalesFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        saleType={saleType}
        setSaleType={setSaleType}
        onClear={() => {
          setSearch("");
          setStatus("ALL");
          setSaleType("ALL");
          setPage(1);
        }}
      />

      {/* SALES TABLE */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Sales Transactions
          </h2>
          <p className="text-xs text-gray-500">
            {filteredSales.length} sales records found
          </p>
        </div>

        {loading ? (
          <div className="rounded-xl border bg-white py-20 text-center text-sm text-gray-500">
            Loading sales...
          </div>
        ) : (
          <>
            <SalesTable
              sales={paginatedSales}
              onView={setViewSale}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onInvoice={setInvoiceSale}
            />

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-gray-500">
                Showing {filteredSales.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
                {" "}to {Math.min(page * PAGE_SIZE, filteredSales.length)}
                {" "}of {filteredSales.length}
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-lg bg-[#E53935] px-4 py-2 text-sm font-semibold text-white">
                  {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* NEW / EDIT SALE */}
      {showForm && (
        <SalesForm
          sale={selectedSale}
          onClose={() => {
            setShowForm(false);
            setSelectedSale(null);
          }}
          onSubmit={handleSave}
        />
      )}

      {/* VIEW SALE */}
      <SalesView
        sale={viewSale}
        onClose={() => setViewSale(null)}
      />

      {/* PRINT INVOICE */}
      {invoiceSale && (
        <InvoicePrintHandler
          sale={invoiceSale}
          onDone={() => setInvoiceSale(null)}
        />
      )}

    </div>
  );
};

// Invoice print helper
const InvoicePrintHandler = ({ sale, onDone }) => {
  const { default: SalesInvoice } = require("./SalesInvoice");

  return (
    <SalesInvoice
      sale={sale}
      onDone={onDone}
    />
  );
};

export default SalesList;
