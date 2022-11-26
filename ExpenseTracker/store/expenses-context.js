import { createContext, useReducer } from "react";
import { DUMMY_EXPENSE } from "../constants/dummy-data";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const updatableItemId = action.payload.id;
      const updatableItemIndex = state.findIndex((expense) => expense.id === updatableItemId);
      const updatableExpense = state[updatableItemIndex];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableItemIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      const deletableItemId = action.payload;
      return state.filter((expense) => expense.id !== deletableItemId);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSE);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
