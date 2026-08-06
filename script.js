// Step 1: Get elements from HTML
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const addBtn = document.getElementById('btn');
const list = document.getElementById('list');
const totalDisplay = document.getElementById('total');
const countDisplay = document.getElementById('count');

// Step 2: Create empty array to store expenses
let expenses = [];

// Step 3: Set today's date as default
window.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    loadExpenses();
});

// Step 4: When button is clicked
addBtn.addEventListener('click', function() {
    addExpense();
});

// Step 5: Function to add expense
function addExpense() {
    // Get values from input boxes
    const desc = descInput.value;
    const amount = amountInput.value;
    const date = dateInput.value;

    // Check if empty
    if (desc == '' || amount == '' || date == '') {
        alert('Please fill all fields!');
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        desc: desc,
        amount: parseFloat(amount),
        date: date
    };

    // Add to array
    expenses.push(expense);

    // Save to browser memory
    saveExpenses();

    // Clear inputs
    descInput.value = '';
    amountInput.value = '';
    dateInput.value = new Date().toISOString().split('T')[0];

    // Update display
    show();
    updateStats();
}

// Step 6: Function to display all expenses
function show() {
    list.innerHTML = '';

    if (expenses.length === 0) {
        list.innerHTML = '<p class="empty">No expenses yet 👇</p>';
        return;
    }

    // Sort by date (newest first)
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create HTML for each expense
    expenses.forEach(expense => {
        const div = document.createElement('div');
        div.className = 'item';

        const dateObj = new Date(expense.date);
        const dateStr = dateObj.toLocaleDateString();

        div.innerHTML = `
            <div class="item-text">
                <div class="item-desc">${expense.desc}</div>
                <div class="item-date">${dateStr}</div>
            </div>
            <div class="item-amount">Rs ${expense.amount.toFixed(2)}</div>
            <button class="delete-btn" onclick="deleteOne(${expense.id})">Delete</button>
        `;

        list.appendChild(div);
    });
}

// Step 7: Function to delete one expense
function deleteOne(id) {
    if (confirm('Delete this?')) {
        expenses = expenses.filter(e => e.id !== id);
        saveExpenses();
        show();
        updateStats();
    }
}

// Step 8: Function to update totals
function updateStats() {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    totalDisplay.textContent = total.toFixed(2);
    countDisplay.textContent = expenses.length;
}

// Step 9: Function to save to browser memory
function saveExpenses() {
    localStorage.setItem('myExpenses', JSON.stringify(expenses));
}

// Step 10: Function to load from browser memory
function loadExpenses() {
    const saved = localStorage.getItem('myExpenses');
    if (saved) {
        expenses = JSON.parse(saved);
        show();
        updateStats();
    }
}