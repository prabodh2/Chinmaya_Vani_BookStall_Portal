let bill = [];

function addToBill() {
  const name = sellName.value;
  const books = getBooks();
  const book = books.find(b => b.name === name);
  if (!book || book.qty <= 0) return alert("Not available");

  book.qty--;
  saveBooks(books);

  const item = bill.find(i => i.name === name);
  if (item) {
    item.quantity++;
    item.total += book.price;

  } else {
    bill.push({
        name: book.name,
        quantity: 1,
        price: book.price,
        total: book.price
      });
      
  }
  render();
}

function render() {
  bill.innerHTML = "";
  let sum = 0;
  bill.forEach(i => {
    sum += i.total;
    document.getElementById("bill").innerHTML +=
      `<tr><td>${i.name}</td><td>${i.qty}</td><td>${i.total}</td></tr>`;
  });
  total.innerText = sum;
}

function completeSale() {
    if (bill.length === 0) {
      alert("Bill is empty");
      return;
    }
  
    const invoiceNo = generateInvoiceNo();
    const date = new Date().toLocaleString();
    const grandTotal = bill.reduce((sum, i) => sum + i.total, 0);
  
    const billData = {
      invoiceNo,
      date,
      items: bill,
      grandTotal
    };
  
    saveBill(billData);
    saveSale({
      invoiceNo,
      date,
      totalAmount: grandTotal
    });
  
    localStorage.setItem("currentInvoice", invoiceNo);
    window.location.href = "bill.html";
  }