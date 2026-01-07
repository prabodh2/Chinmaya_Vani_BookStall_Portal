/*****************************************
 * inventory.js
 * Manage Books Inventory
 *****************************************/

const bookList = document.getElementById("bookList");

/* ---------- LOAD BOOKS ---------- */
function loadBooks() {
  if (!bookList) return;

  bookList.innerHTML = "";

  const books = getBooks(); // always fresh from localStorage

  if (books.length === 0) {
    bookList.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">No books available</td>
      </tr>
    `;
    return;
  }

  books.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.name}</td>
      <td>₹${book.price}</td>
      <td>${book.quantity}</td>
      <td>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;

    bookList.appendChild(row);
  });
}

/* ---------- ADD BOOK ---------- */
function addBook() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const qtyInput = document.getElementById("qty");

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const quantity = Number(qtyInput.value);

  if (!name || price <= 0 || quantity <= 0) {
    alert("Please enter valid book details");
    return;
  }

  const books = getBooks();

  // Prevent duplicate book names (optional but recommended)
  const exists = books.some(
    b => b.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    alert("Book already exists. Use Edit instead.");
    return;
  }

  books.push({
    name,
    price,
    quantity
  });

  saveBooks(books);
  clearForm();
  loadBooks();
}

/* ---------- DELETE BOOK ---------- */
function deleteBook(index) {
  const books = getBooks();
  const book = books[index];

  if (!confirm(`Delete "${book.name}"?`)) return;

  books.splice(index, 1);
  saveBooks(books);
  loadBooks();
}

/* ---------- EDIT BOOK ---------- */
function editBook(index) {
  const books = getBooks();
  const book = books[index];

  document.getElementById("name").value = book.name;
  document.getElementById("price").value = book.price;
  document.getElementById("qty").value = book.quantity;

  // Remove old record, updated one will be re-added
  books.splice(index, 1);
  saveBooks(books);
  loadBooks();
}

/* ---------- CLEAR FORM ---------- */
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", loadBooks);
