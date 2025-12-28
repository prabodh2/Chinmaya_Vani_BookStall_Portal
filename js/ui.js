/*************************************************
 * ui.js
 * Common UI helpers for Bookstall CRM
 *************************************************/

/* ---------- ELEMENT HELPERS ---------- */
function $(id) {
    return document.getElementById(id);
  }
  
  function create(tag, className = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }
  
  /* ---------- MESSAGE HELPERS ---------- */
  function showAlert(message) {
    alert(message);
  }
  
  function confirmAction(message) {
    return confirm(message);
  }
  
  /* ---------- TABLE HELPERS ---------- */
  function clearTable(tbodyId) {
    $(tbodyId).innerHTML = "";
  }
  
  /* ---------- DATE & TIME ---------- */
  function getCurrentDateTime() {
    return new Date().toLocaleString();
  }
  
  /* ---------- CURRENCY ---------- */
  function formatCurrency(amount) {
    return `₹${amount}`;
  }
  
  /* ---------- INPUT HELPERS ---------- */
  function resetForm(formId) {
    $(formId).reset();
  }
  
  function focusInput(inputId) {
    $(inputId).focus();
  }
  
  /* ---------- KEYBOARD SHORTCUTS ---------- */
  function enableKeyboardShortcuts(map) {
    document.addEventListener("keydown", e => {
      if (map[e.key]) {
        e.preventDefault();
        map[e.key]();
      }
    });
  }