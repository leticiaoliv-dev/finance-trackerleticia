const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const list = document.getElementById("list");
const balance = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = nameInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  console.log(name);
  console.log(amount);

  const transaction = {
    id: Date.now(),
    name,
    amount,
    type
  };
  transactions.push(transaction);

  addTransactionToDOM(transaction);
  updateBalance();
  updateLocalStorage();

  form.reset();
});
function addTransactionToDOM(transaction) {
  const li = document.createElement("li");

  li.innerHTML = `
    ${transaction.name} - R$ ${transaction.amount}
  `;

  list.appendChild(li);
}
function updateBalance() {
  let total = 0;

  transactions.forEach(t => {
    if (t.type === "income") {
      total += t.amount;
    } else {
      total -= t.amount;
    }
  });

  balance.textContent = total.toFixed(2);
}
function addTransactionToDOM(transaction) {
  const li = document.createElement("li");

  const sign = transaction.type === "income" ? "+" : "-";
  li.classList.add(transaction.type);

  li.innerHTML = `
    <span>${transaction.name}</span> 
    <span>${sign} R$ ${transaction.amount}</span>
    <button onclick="removeTransaction(${transaction.id})">❌</button>
  `;

  list.appendChild(li);
}
function removeTransaction(id) {
    updateLocalStorage();
  transactions = transactions.filter(t => t.id !== id);

  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);

  updateBalance();
  checkEmpty();
}
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}transactions.forEach(addTransactionToDOM);
updateBalance(); 
const emptyMessage = document.getElementById("empty");

checkEmpty();
const filter = document.getElementById("filter");
filter.addEventListener("change", () => {
  list.innerHTML = "";

  let filtered = transactions;

  if (filter.value !== "all") {
    filtered = transactions.filter(t => t.type === filter.value);
  }

  filtered.forEach(addTransactionToDOM);
});