
import React from "react";
import { formatCurrency } from "../utils/salesHelpers";

const SalesInvoice = ({ sale }) => {
  if (!sale) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow popups to print the invoice.");
      return;
    }

    const rows = sale.items.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.productName}</td>
        <td>${item.unit}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>${item.gst}%</td>
        <td>₹${item.quantity * item.price}</td>
      </tr>
    `).join("");

    printWindow.document.write(`
      <html>
      <head>
        <title>${sale.invoiceNo}</title>
        <style>
          body { font-family: Arial; padding: 35px; color: #222; }
          h1 { color: #E53935; }
          .header { display:flex; justify-content:space-between; }
          table { width:100%; border-collapse:collapse; margin-top:25px; }
          th,td { border:1px solid #ddd; padding:11px; text-align:left; }
          th { background:#f4f4f4; }
          .total { width:320px; margin-left:auto; margin-top:25px; }
          .total p { display:flex; justify-content:space-between; }
          @media print { button { display:none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>LUBEFLOW</h1>
            <p>Oil & Lubricants</p>
          </div>
          <div>
            <h2>SALES INVOICE</h2>
            <p>Invoice: ${sale.invoiceNo}</p>
            <p>Date: ${sale.date}</p>
          </div>
        </div>

        <hr/>

        <h3>Customer Details</h3>
        <p>Name: ${sale.customer}</p>
        <p>Mobile: ${sale.phone || "-"}</p>
        <p>Sale Type: ${sale.saleType}</p>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Price</th>
              <th>GST</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <div class="total">
          <p>Subtotal: <b>₹${sale.subtotal.toFixed(2)}</b></p>
          <p>Discount: <b>₹${sale.discount.toFixed(2)}</b></p>
          <p>GST: <b>₹${sale.gstAmount.toFixed(2)}</b></p>
          <hr/>
          <p>Grand Total: <b>₹${sale.total.toFixed(2)}</b></p>
          <p>Received: <b>₹${sale.paid.toFixed(2)}</b></p>
          <p>Balance Due: <b>₹${sale.due.toFixed(2)}</b></p>
        </div>

        <p style="margin-top:50px;text-align:center">
          Thank you for your business!
        </p>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="hidden"
    >
      Print Invoice
    </button>
  );
};

export default SalesInvoice;
