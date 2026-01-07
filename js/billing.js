let bill = [];

/* ---------- ADD BOOK ---------- */
function addToBill() {
    const name = sellName.value.trim();
    const qty = Number(document.getElementById("sellQty").value);
  
    if (!name || qty <= 0) {
      alert("Enter valid book name and quantity");
      return;
    }
  
    const books = getBooks();
    const book = books.find(b => b.name === name);
  
    if (!book) {
      alert("Book not found");
      return;
    }
  
    if (book.quantity < qty) {
      alert(`Only ${book.quantity} books available`);
      return;
    }
  
    // 🔥 THIS DECREASES STORAGE STOCK
    book.quantity -= qty;
    saveBooks(books);
  
    const item = bill.find(i => i.name === name);
  
    if (item) {
      item.quantity += qty;
      item.total += book.price * qty;
    } else {
      bill.push({
        name: book.name,
        quantity: qty,
        price: book.price,
        total: book.price * qty
      });
    }
  
    renderBill();
    sellName.value = "";
    document.getElementById("sellQty").value = 1;
  }
  
  

/* ---------- RENDER BILL ---------- */
function renderBill() {
  const tbody = document.getElementById("bill");
  tbody.innerHTML = "";

  let sum = 0;

  bill.forEach(item => {
    sum += item.total;
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>₹${item.total}</td>
      </tr>
    `;
  });

  total.innerText = sum;
}

/* ---------- COMPLETE SALE ---------- */
function completeSale() {
  if (bill.length === 0) {
    alert("Add at least one book");
    return;
  }
  document.getElementById("paymentModal").style.display = "flex";
}

/* ---------- CONFIRM PAYMENT ---------- */
function confirmPayment() {
  const paymentMode =
    document.querySelector('input[name="payment"]:checked').value;

  document.getElementById("paymentModal").style.display = "none";
  finalizeSale(paymentMode);
}

/* ---------- FINALIZE ---------- */
function finalizeSale(paymentMode) {
  const invoiceNo = generateInvoiceNo();
  const date = new Date().toLocaleString();
  const grandTotal = bill.reduce((s, i) => s + i.total, 0);

  const billData = {
    invoiceNo,
    date,
    items: bill,
    grandTotal,
    paymentMode
  };

  saveBill(billData);
  saveSale({
    invoiceNo,
    date,
    totalAmount: grandTotal,
    paymentMode
  });

  localStorage.setItem("currentInvoice", invoiceNo);
  window.location.href = "bill.html";
}
