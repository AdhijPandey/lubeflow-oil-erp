
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export const formatReportValue = (key, value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const currencyFields = [
    "total",
    "paidAmount",
    "dueAmount",
    "purchaseRate",
    "stockValue",
    "creditLimit",
    "outstanding",
    "amount",
  ];

  if (currencyFields.includes(key)) {
    return formatCurrency(value);
  }

  return String(value);
};

export const getDefaultDateRange = () => {
  const today = new Date();
  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const toISO = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return {
    fromDate: toISO(firstDay),
    toDate: toISO(today),
  };
};

export const downloadCSV = (columns, rows, filename) => {
  const headers = columns.map((column) => column.label);

  const data = rows.map((row) =>
    columns.map((column) => row[column.key] ?? "")
  );

  const csv = [headers, ...data]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
