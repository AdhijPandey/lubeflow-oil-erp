
import React, { useEffect, useMemo, useState } from "react";
import {
  RefreshCw,
  Download,
  History,
} from "lucide-react";

import InventoryStats from "../components/InventoryStats";
import InventoryFilters from "../components/InventoryFilters";
import InventoryTable from "../components/InventoryTable";
import StockAdjustmentForm from "../components/StockAdjustmentForm";
import StockMovement from "./StockMovement";

import {
  getInventory,
  getStockMovements,
  adjustStock,
} from "../api/inventoryApi";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [adjustmentItem, setAdjustmentItem] = useState(null);
  const [adjustmentType, setAdjustmentType] = useState("IN");
  const [showMovements, setShowMovements] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [inventoryData, movementData] = await Promise.all([
        getInventory(),
        getStockMovements(),
      ]);

      setInventory(inventoryData);
      setMovements(movementData);
    } catch (error) {
      console.error("Inventory loading failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.productName.toLowerCase().includes(searchText) ||
        item.sku.toLowerCase().includes(searchText) ||
        item.brand.toLowerCase().includes(searchText);

      const currentStatus =
        Number(item.availableStock) <= 0
          ? "OUT_OF_STOCK"
          : Number(item.availableStock) <= Number(item.minStock)
          ? "LOW_STOCK"
          : "IN_STOCK";

      return (
        matchesSearch &&
        (status === "ALL" || currentStatus === status)
      );
    });
  }, [inventory, search, status]);

  const handleAdjustment = async (payload) => {
    await adjustStock(payload);
    setAdjustmentItem(null);
    await loadData();
  };

  const exportCSV = () => {
    const headers = [
      "Product",
      "SKU",
      "Brand",
      "Packaging",
      "Available Stock",
      "Minimum Stock",
      "Purchase Rate",
      "Stock Value",
    ];

    const rows = filteredInventory.map((item) => [
      item.productName,
      item.sku,
      item.brand,
      item.packaging,
      item.availableStock,
      item.minStock,
      item.purchaseRate,
      item.availableStock * item.purchaseRate,
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
    link.download = "inventory-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Inventory Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor stock levels, adjustments and product availability.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowMovements((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:bg-slate-50"
          >
            <History size={17} />
            {showMovements ? "Inventory List" : "Stock History"}
          </button>

          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:bg-slate-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download size={17} />
            Export
          </button>
        </div>
      </div>

      <InventoryStats inventory={inventory} />

      {showMovements ? (
        <StockMovement movements={movements} />
      ) : (
        <>
          <InventoryFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />

          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">
              Available Inventory
            </h2>
            <span className="text-sm text-slate-500">
              {filteredInventory.length} products
            </span>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl p-12 text-center text-slate-500">
              Loading inventory...
            </div>
          ) : (
            <InventoryTable
              inventory={filteredInventory}
              onAdjust={(item, type) => {
                setAdjustmentItem(item);
                setAdjustmentType(type);
              }}
            />
          )}
        </>
      )}

      {adjustmentItem && (
        <StockAdjustmentForm
          item={adjustmentItem}
          type={adjustmentType}
          onClose={() => setAdjustmentItem(null)}
          onSave={handleAdjustment}
        />
      )}
    </div>
  );
};

export default InventoryList;
