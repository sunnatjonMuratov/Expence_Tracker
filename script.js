// Selectors
const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = []; // Array to hold all expenses

// Event Listeners
expenseForm.addEventListener('submit', addExpense);

// Functions

function addExpense(e) {
    e.preventDefault();

    // Create expense object
    const expense = {
        name: expenseName.value,
        amount: parseFloat(expenseAmount.value),
        category: expenseCategory.value
    };

    // Add expense to array
    expenses.push(expense);

    // Update the DOM
    displayExpenses();
    updateTotal();

    // Clear form fields
    expenseForm.reset();
}

function displayExpenses() {
    // Clear the current list
    expenseList.innerHTML = '';

    // Loop through expenses and display them
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)} <span>${expense.category}</span>`;
        expenseList.appendChild(li);
    });
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

    
