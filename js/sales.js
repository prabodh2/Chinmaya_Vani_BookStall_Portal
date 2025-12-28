document.addEventListener("DOMContentLoaded", loadSales);

function loadSales() {
  const sales = getSales();
  const bills = getBills();
  const tbody = document.getElementById("salesTableBody");

  tbody.innerHTML = "";

  if (sales.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">No sales found</td>
      </tr>
    `;
    return;
  }

  sales.forEach(sale => {
    const bill = bills.find(b => b.invoiceNo === sale.invoiceNo);

    let bookDetails = "-";

    if (bill && bill.items.length > 0) {
      bookDetails = bill.items
        .map(item => `${item.name} (${item.quantity})`)
        .join("<br>");
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sale.invoiceNo}</td>
      <td>${sale.date}</td>
      <td>${bookDetails}</td>
      <td>₹${sale.totalAmount}</td>
      <td>
        <button class="btn" onclick="reprint('${sale.invoiceNo}')">
          Reprint
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function reprint(invoiceNo) {
  localStorage.setItem("currentInvoice", invoiceNo);
  window.location.href = "bill.html";
}