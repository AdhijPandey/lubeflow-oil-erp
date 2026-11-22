
import React, { useEffect, useMemo, useState } from "react";
import {
  Download,
  Printer,
  RefreshCw,
  FileBarChart,
} from "lucide-react";

import ReportTypeSelector from "../components/ReportTypeSelector";
import ReportFilters from "../components/ReportFilters";
import ReportSummaryCards from "../components/ReportSummaryCards";
import ReportChart from "../components/ReportChart";
import ReportTable from "../components/ReportTable";

import { getReportData } from "../api/reportsApi";

import {
  downloadCSV,
  getDefaultDateRange,
} from "../utils/reportsHelpers";

const ReportsDashboard = () => {
  const defaultDates = getDefaultDateRange();

  const [reportType, setReportType] = useState("SALES");
  const [fromDate, setFromDate] = useState(defaultDates.fromDate);
  const [toDate, setToDate] = useState(defaultDates.toDate);
  const [search, setSearch] = useState("");

  const [report, setReport] = useState({
    summary: {},
    columns: [],
    rows: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateReport = async () => {
    if (fromDate && toDate && fromDate > toDate) {
      setError("From date cannot be later than To date.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getReportData({
        reportType,
        fromDate,
        toDate,
      });

      setReport(result);
    } catch (err) {
      console.error("Report generation failed:", err);
      setError(err.message || "Unable to generate report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateReport();
  }, [reportType]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return report.rows;

    return report.rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )
    );
  }, [report.rows, search]);

  const handleExport = () => {
    if (!report.columns.length) return;

    downloadCSV(
      report.columns,
      filteredRows,
      `${reportType.toLowerCase()}-report.csv`
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Reports & Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Business performance, sales, purchase and inventory reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={generateReport}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

          <button
            onClick={handleExport}
            disabled={!filteredRows.length}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            <Download size={17} />
            Export CSV
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Printer size={17} />
            Print
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 print:hidden">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <FileBarChart size={24} />
        </div>
        <div>
          <h2 className="font-semibold text-slate-800">
            Select Report Type
          </h2>
          <p className="text-xs text-slate-500">
            Choose the report you want to generate.
          </p>
        </div>
      </div>

      <div className="print:hidden">
        <ReportTypeSelector
          value={reportType}
          onChange={setReportType}
        />
      </div>

      <div className="print:hidden">
        <ReportFilters
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          search={search}
          setSearch={setSearch}
          onGenerate={generateReport}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm print:hidden">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            {reportType.replace("_", " ")} REPORT
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Period: {fromDate || "All dates"} to {toDate || "All dates"}
          </p>
        </div>
        <span className="text-xs text-slate-400">
          Generated: {new Date().toLocaleDateString("en-IN")}
        </span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border p-12 text-center text-slate-500">
          Generating report...
        </div>
      ) : (
        <>
          <ReportSummaryCards
            summary={report.summary}
            reportType={reportType}
          />

          <div className="print:hidden">
            <ReportChart
              rows={filteredRows}
              reportType={reportType}
            />
          </div>

          <ReportTable
            columns={report.columns}
            rows={filteredRows}
          />
        </>
      )}

      <style>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          .print\\:hidden {
            display: none !important;
          }

          table, table * {
            visibility: visible;
          }

          #root, #root * {
            visibility: visible;
          }

          @page {
            size: landscape;
            margin: 12mm;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportsDashboard;
