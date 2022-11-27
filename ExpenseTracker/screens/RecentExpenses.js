import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    setIsFetching(true);
    fetchExpenses()
      .then((expenses) => {
        expensesCtx.setExpenses(expenses);
        setIsFetching(false);
      })
      .catch((error) => {
        setIsFetching(false);
        setError("Failed to fetch the expenses.");
      });
  }, []);

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
        }}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      noDataText="No recent expenses."
    />
  );
}
