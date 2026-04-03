/**
 * AppContext.jsx
 * Global state management using React Context API.
 * Persists transactions to localStorage automatically.
 */

import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { mockTransactions } from '../data/mockData';
import { generateId } from '../utils/helpers';

const AppContext = createContext(null);

// ──────────────────────────────────────────────
// Action types
// ──────────────────────────────────────────────
const ACTIONS = {
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_TRANSACTION:  'ADD_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_FILTER:       'SET_FILTER',
  SET_SEARCH:       'SET_SEARCH',
  SET_SORT:         'SET_SORT',
  SET_DATE_RANGE:   'SET_DATE_RANGE',
  RESET_FILTERS:    'RESET_FILTERS',
};

// ──────────────────────────────────────────────
// Load initial transactions from localStorage or fallback to mock data
// ──────────────────────────────────────────────
const loadTransactions = () => {
  try {
    const saved = localStorage.getItem('fd_transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  } catch {
    return mockTransactions;
  }
};

// ──────────────────────────────────────────────
// Reducer
// ──────────────────────────────────────────────
const initialState = {
  transactions: loadTransactions(),
  filter:    'all',      // 'all' | 'income' | 'expense'
  search:    '',
  sortField: 'date',
  sortDir:   'desc',
  dateFrom:  '',
  dateTo:    '',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };

    case ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [
          { ...action.payload, id: generateId() },
          ...state.transactions,
        ],
      };

    case ACTIONS.EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload };

    case ACTIONS.SET_SORT:
      return { ...state, sortField: action.payload.field, sortDir: action.payload.dir };

    case ACTIONS.SET_DATE_RANGE:
      return { ...state, dateFrom: action.payload.from, dateTo: action.payload.to };

    case ACTIONS.RESET_FILTERS:
      return { ...state, filter: 'all', search: '', dateFrom: '', dateTo: '' };

    default:
      return state;
  }
}

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [role, setRole] = useState(() => localStorage.getItem('fd_role') || 'viewer');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('fd_dark');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Sync transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fd_transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Sync role to localStorage
  useEffect(() => {
    localStorage.setItem('fd_role', role);
  }, [role]);

  // Sync dark mode and apply class to body
  useEffect(() => {
    localStorage.setItem('fd_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  // Action dispatchers
  const addTransaction    = (tx) => dispatch({ type: ACTIONS.ADD_TRANSACTION,    payload: tx });
  const editTransaction   = (tx) => dispatch({ type: ACTIONS.EDIT_TRANSACTION,   payload: tx });
  const deleteTransaction = (id) => dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  const setFilter   = (f)        => dispatch({ type: ACTIONS.SET_FILTER,    payload: f });
  const setSearch   = (q)        => dispatch({ type: ACTIONS.SET_SEARCH,    payload: q });
  const setSort     = (field, dir) => dispatch({ type: ACTIONS.SET_SORT,   payload: { field, dir } });
  const setDateRange = (from, to) => dispatch({ type: ACTIONS.SET_DATE_RANGE, payload: { from, to } });
  const resetFilters = ()         => dispatch({ type: ACTIONS.RESET_FILTERS });
  const resetToMockData = ()      => dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: mockTransactions });

  const value = {
    ...state,
    role,
    setRole,
    darkMode,
    setDarkMode,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setFilter,
    setSearch,
    setSort,
    setDateRange,
    resetFilters,
    resetToMockData,
    isAdmin: role === 'admin',
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
