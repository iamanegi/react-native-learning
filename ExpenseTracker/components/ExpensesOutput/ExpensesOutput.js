import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesItem from "./ExpenseItem";

export default function ExpensesOutput({ expenses, expensesPeriod, noDataText }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  function renderExpenseItem(itemData) {
    return <ExpensesItem {...itemData.item} />;
  }

  let content = <Text style={styles.noDataText}>{noDataText}</Text>;

  if (expenses.length > 0) {
    content = (
      <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.period}>{expensesPeriod}</Text>
        <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
      </View>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  summaryContainer: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
  noDataText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
