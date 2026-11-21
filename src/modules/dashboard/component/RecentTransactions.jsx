import React from "react";
import { ArrowRight, ReceiptText } from "lucide-react";
import { recentTransactions } from "../data/dashboardData";

const RecentTransactions = ({ onViewReports }) => {
  return (
    <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-[#20252D]">Recent Transactions</h2>
          <p className="mt-1 text-xs text-gray-500">
            Latest sales and purchase activities
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
          <ReceiptText size={21} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
              <th className="px-3 py-3 font-semibold">Transaction ID</th>
              <th className="px-3 py-3 font-semibold">Customer / Supplier</th>
              <th className="px-3 py-3 font-semibold">Type</th>
              <th className="px-3 py-3 font-semibold">Amount</th>
              <th className="px-3 py-3 font-semibold">Time</th>
              <th className="px-3 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/70"
              >
                <td className="px-3 py-4 text-xs font-bold text-[#20252D]">
                  {transaction.id}
                </td>

                <td className="px-3 py-4 text-xs font-medium text-gray-700">
                  {transaction.customer}
                </td>

                <td className="px-3 py-4">
                  <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${
                    transaction.type === "Sale"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-purple-50 text-purple-600"
                  }`}>
                    {transaction.type}
                  </span>
                </td>

                <td className="px-3 py-4 text-xs font-bold text-gray-800">
                  {transaction.amount}
                </td>

                <td className="px-3 py-4 text-xs text-gray-500">
                  {transaction.time}
                </td>

                <td className="px-3 py-4">
                  <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${
                    transaction.status === "Paid" ||
                    transaction.status === "Completed"
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-orange-700"
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={onViewReports}
        className="mt-4 flex items-center gap-2 text-xs font-bold text-[#E53935] hover:text-[#C62828]"
      >
        View All Transactions
        <ArrowRight size={15} />
      </button>
    </section>
  );
};

export default RecentTransactions;