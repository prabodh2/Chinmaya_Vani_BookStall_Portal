const list = document.getElementById("bookList");

function loadBooks() {
  list.innerHTML = "";
  getBooks().forEach((b, i) => {
    list.innerHTML += `
      <tr>
        <td>${b.name}</td>
        <td>${b.price}</td>
        <td>${b.qty}</td>
        <td>
          <button onclick="editBook(${i})">Edit</button>
          <button onclick="deleteBook(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

function addBook() {
  const name = document.getElementById("name").value;
  const price = +document.getElementById("price").value;
  const qty = +document.getElementById("qty").value;

  if (!name || price <= 0 || qty <= 0) return alert("Invalid");

  const books = getBooks();
  books.push({ name, price, qty });
  saveBooks(books);
  loadBooks();
}

function deleteBook(i) {
  const books = getBooks();
  books.splice(i, 1);
  saveBooks(books);
  loadBooks();
}

function editBook(i) {
  const books = getBooks();
  const b = books[i];
  document.getElementById("name").value = b.name;
  document.getElementById("price").value = b.price;
  document.getElementById("qty").value = b.qty;
  books.splice(i, 1);
  saveBooks(books);
  loadBooks();
}

loadBooks();