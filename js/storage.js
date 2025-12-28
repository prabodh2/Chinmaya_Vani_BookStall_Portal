const BOOKS_KEY = "books";
const SALES_KEY = "sales";
const BILLS_KEY = "bills";

function getBooks() {
  return JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
}

function saveBooks(books) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

function getSales() {
  return JSON.parse(localStorage.getItem(SALES_KEY)) || [];
}

function saveSale(sale) {
  const sales = getSales();
  sales.push(sale);
  localStorage.setItem(SALES_KEY, JSON.stringify(sales));
}

function getBills() {
  return JSON.parse(localStorage.getItem(BILLS_KEY)) || [];
}

function saveBill(bill) {
  const bills = getBills();
  bills.push(bill);
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
}

function generateInvoiceNo() {
  return "INV-" + Date.now();
}


function getBillByInvoice(invoiceNo) {
    const bills = getBills();
    return bills.find(b => b.invoiceNo === invoiceNo);
  }