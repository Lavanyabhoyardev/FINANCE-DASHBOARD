/**
 * helpers.js – Utility functions for the Finance Dashboard
 */

// Format a number as currency (USD by default)
export const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);

// Format an ISO date string to a readable format
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Format date to YYYY-MM format (for grouping)
export const formatMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

// Calculate total income from a transaction list
export const getTotalIncome = (transactions) =>
  transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

// Calculate total expenses from a transaction list
export const getTotalExpenses = (transactions) =>
  transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

// Calculate net balance (income - expenses)
export const getBalance = (transactions) =>
  getTotalIncome(transactions) - getTotalExpenses(transactions);

// Group transactions by month and compute income/expense totals
export const getMonthlyData = (transactions) => {
  const map = {};
  transactions.forEach(t => {
    const month = formatMonth(t.date);
    if (!map[month]) map[month] = { month, income: 0, expense: 0, balance: 0 };
    if (t.type === 'income')  map[month].income  += t.amount;
    if (t.type === 'expense') map[month].expense += t.amount;
  });
  // Compute running balance and sort chronologically
  const sorted = Object.values(map).sort((a, b) => new Date(a.month) - new Date(b.month));
  let running = 0;
  return sorted.map(m => {
    running += m.income - m.expense;
    return { ...m, balance: running };
  });
};

// Group expenses by category for pie chart
export const getCategoryBreakdown = (transactions) => {
  const map = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Get the highest spending category
export const getHighestSpendingCategory = (transactions) => {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown.length > 0 ? breakdown[0] : { name: 'N/A', value: 0 };
};

// Sort transactions by a given field and direction
export const sortTransactions = (transactions, field, direction) => {
  return [...transactions].sort((a, b) => {
    let valA = a[field];
    let valB = b[field];
    if (field === 'date') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Filter transactions by search query, type and date range
export const filterTransactions = (transactions, { search = '', type = 'all', dateFrom = '', dateTo = '' }) => {
  return transactions.filter(t => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.category.toLowerCase().includes(q) ||
      String(t.amount).includes(q) ||
      t.description.toLowerCase().includes(q);
    const matchType = type === 'all' || t.type === type;
    const matchFrom = !dateFrom || new Date(t.date) >= new Date(dateFrom);
    const matchTo   = !dateTo   || new Date(t.date) <= new Date(dateTo);
    return matchSearch && matchType && matchFrom && matchTo;
  });
};

// Export transactions array as downloadable CSV
export const exportToCSV = (transactions) => {
  const headers = ['ID', 'Date', 'Amount', 'Category', 'Type', 'Description'];
  const rows = transactions.map(t =>
    [t.id, t.date, t.amount, t.category, t.type, `"${t.description}"`].join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// Generate a unique numeric ID
export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);
