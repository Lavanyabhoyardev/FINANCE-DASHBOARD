// Mock transaction data for the Finance Dashboard
// Contains 30 realistic transactions across categories

export const mockTransactions = [
  { id: 1,  date: '2024-01-05', amount: 3200,  category: 'Salary',        type: 'income',  description: 'Monthly salary payment' },
  { id: 2,  date: '2024-01-08', amount: 120,   category: 'Groceries',     type: 'expense', description: 'Weekly grocery shopping' },
  { id: 3,  date: '2024-01-10', amount: 59.99, category: 'Subscriptions', type: 'expense', description: 'Netflix + Spotify bundle' },
  { id: 4,  date: '2024-01-12', amount: 800,   category: 'Freelance',     type: 'income',  description: 'Web design project' },
  { id: 5,  date: '2024-01-14', amount: 250,   category: 'Dining',        type: 'expense', description: 'Restaurant outings this week' },
  { id: 6,  date: '2024-01-18', amount: 90,    category: 'Transport',     type: 'expense', description: 'Fuel and parking' },
  { id: 7,  date: '2024-01-20', amount: 1500,  category: 'Rent',          type: 'expense', description: 'Monthly rent payment' },
  { id: 8,  date: '2024-01-22', amount: 45,    category: 'Utilities',     type: 'expense', description: 'Electricity bill' },
  { id: 9,  date: '2024-01-25', amount: 350,   category: 'Shopping',      type: 'expense', description: 'Clothes and accessories' },
  { id: 10, date: '2024-01-28', amount: 200,   category: 'Investment',    type: 'income',  description: 'Dividend payout' },

  { id: 11, date: '2024-02-05', amount: 3200,  category: 'Salary',        type: 'income',  description: 'Monthly salary payment' },
  { id: 12, date: '2024-02-07', amount: 135,   category: 'Groceries',     type: 'expense', description: 'Supermarket shopping' },
  { id: 13, date: '2024-02-09', amount: 400,   category: 'Healthcare',    type: 'expense', description: 'Doctor visit and medication' },
  { id: 14, date: '2024-02-12', amount: 600,   category: 'Freelance',     type: 'income',  description: 'Logo design contract' },
  { id: 15, date: '2024-02-15', amount: 180,   category: 'Dining',        type: 'expense', description: 'Valentine\'s dinner' },
  { id: 16, date: '2024-02-18', amount: 75,    category: 'Transport',     type: 'expense', description: 'Monthly transit pass' },
  { id: 17, date: '2024-02-20', amount: 1500,  category: 'Rent',          type: 'expense', description: 'Monthly rent payment' },
  { id: 18, date: '2024-02-22', amount: 300,   category: 'Investment',    type: 'income',  description: 'Stock portfolio gain' },
  { id: 19, date: '2024-02-25', amount: 99,    category: 'Subscriptions', type: 'expense', description: 'Cloud storage annual plan' },
  { id: 20, date: '2024-02-27', amount: 55,    category: 'Utilities',     type: 'expense', description: 'Water and internet bill' },

  { id: 21, date: '2024-03-05', amount: 3200,  category: 'Salary',        type: 'income',  description: 'Monthly salary payment' },
  { id: 22, date: '2024-03-06', amount: 110,   category: 'Groceries',     type: 'expense', description: 'Grocery run' },
  { id: 23, date: '2024-03-09', amount: 950,   category: 'Freelance',     type: 'income',  description: 'Mobile app UI project' },
  { id: 24, date: '2024-03-12', amount: 220,   category: 'Dining',        type: 'expense', description: 'Team lunch outing' },
  { id: 25, date: '2024-03-15', amount: 1500,  category: 'Rent',          type: 'expense', description: 'Monthly rent payment' },
  { id: 26, date: '2024-03-18', amount: 85,    category: 'Transport',     type: 'expense', description: 'Cab rides and fuel' },
  { id: 27, date: '2024-03-20', amount: 450,   category: 'Shopping',      type: 'expense', description: 'Electronics purchase' },
  { id: 28, date: '2024-03-22', amount: 150,   category: 'Investment',    type: 'income',  description: 'Crypto portfolio gain' },
  { id: 29, date: '2024-03-25', amount: 60,    category: 'Subscriptions', type: 'expense', description: 'Adobe Creative Cloud' },
  { id: 30, date: '2024-03-28', amount: 40,    category: 'Utilities',     type: 'expense', description: 'Mobile phone bill' },
];

// Category color mapping for charts and badges
export const categoryColors = {
  Salary:        '#6366f1',
  Freelance:     '#a855f7',
  Investment:    '#3b82f6',
  Groceries:     '#10b981',
  Dining:        '#f59e0b',
  Transport:     '#14b8a6',
  Rent:          '#ef4444',
  Utilities:     '#f97316',
  Subscriptions: '#ec4899',
  Shopping:      '#8b5cf6',
  Healthcare:    '#06b6d4',
};

// All possible categories for form dropdowns
export const allCategories = Object.keys(categoryColors);
