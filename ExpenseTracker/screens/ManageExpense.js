import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/ui/CustomButton";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

export default function ManageExpense({ navigation, route }) {
  const expenseCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId; // convert value into boolean

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expenseCtx.updateExpense("e1", { description: "Test!!!", amount: 100.99, date: new Date() });
    } else {
      expenseCtx.addExpense({ description: "Test", amount: 19.99, date: new Date() });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomButton mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </CustomButton>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 100,
  },
});
