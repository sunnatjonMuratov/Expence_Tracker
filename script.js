// script.js

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Create and append the form elements
    const formHTML = `
        <h1>Expense Tracker</h1>
        <form id="expense-form">
            <div>
                <label for="expense-name">Expense Name</label>
                <input type="text" id="expense-name" required>
            </div>
            <div>
                <label for="expense-amount">Amount</label>
                <input type="number" id="expense-amount" required>
            </div>
            <div>
                <label for="expense-category">Category</label>
                <select id="expense-category" required>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label for="expense-date">Date</label>
                <input type="date" id="expense-date" required>
            </div>
            <button type="submit">Add Expense</button>
        </form>
        <h2>Expenses</h2>
        <div>
            <label for="filter-category">Filter by Category:</label>
            <select id="filter-category">
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <ul id="expense-list"></ul>
        <h3>Total: $<span id="total-amount">0</span></h3>
    `;

    app.innerHTML = formHTML;

    // Now we can select elements and add event listeners as before
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');
    const expenseDate = document.getElementById('expense-date');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const filterCategory = document.getElementById('filter-category');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let editIndex = -1;

    expenseForm.addEventListener('submit', addExpense);
    filterCategory.addEventListener('change', displayExpenses);
    

    function addExpense(e) {
        e.preventDefault();

        const expense = {
            name: expenseName.value,
            amount: parseFloat(expenseAmount.value),
            category: expenseCategory.value,
            date: expenseDate.value
        };

        if (editIndex >= 0) {
            expenses[editIndex] = expense;
            editIndex = -1;
        } else {
            expenses.push(expense);
        }

        saveExpenses();
        displayExpenses();
        updateTotal();
        expenseForm.reset();
    }

    function displayExpenses() {
        expenseList.innerHTML = '';

        const filteredExpenses = expenses.filter(expense =>
            filterCategory.value === 'All' || expense.category === filterCategory.value
        );

        filteredExpenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)} 
                <span>${expense.category} - ${expense.date}</span>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        saveExpenses();
        displayExpenses();
        updateTotal();
    }

    function editExpense(index) {
        const expense = expenses[index];
        expenseName.value = expense.name;
        expenseAmount.value = expense.amount;
        expenseCategory.value = expense.category;
        expenseDate.value = expense.date;
        editIndex = index;
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Initialize the app
    displayExpenses();
    updateTotal();
});
