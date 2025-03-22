
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


function updateTotals() {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    incomeEl.textContent = `$${income.toFixed(2)}`;
    expensesEl.textContent = `$${expense.toFixed(2)}`;
    balanceEl.textContent = `$${(income - expense).toFixed(2)}`;

    if (expense > income) {
        balanceEl.style.color = 'red';
    } else {
        balanceEl.style.color = 'green';
    }
}


function renderTransactions() {
    transactionList.innerHTML = '';
    if (transactions.length === 0) {
        transactionList.innerHTML = '<li>No transactions yet.</li>';
    } else {
        transactions.forEach((transaction, index) => {
            const li = document.createElement('li');
            li.classList.add(transaction.type);
            li.innerHTML = `${transaction.description} (${transaction.category}) <span>$${transaction.amount.toFixed(2)}</span> 
                            <small>${transaction.date}</small>
                            <button onclick="removeTransaction(${index})" id="shape">❌</button>`;
            transactionList.appendChild(li);
        });
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = new Date().toLocaleString();

    if (description && !isNaN(amount) && amount > 0) {
        transactions.push({ description, amount, type, category, date });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        descriptionInput.value = '';
        amountInput.value = '';
        updateTotals();
        renderTransactions();
    } else {
        alert('Please enter a valid description and amount!');
    }
});


function removeTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateTotals();
    renderTransactions();
}


updateTotals();
renderTransactions();
