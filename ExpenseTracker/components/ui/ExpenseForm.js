import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import CustomButton from "./CustomButton";
import Input from "./Input";

export default function ExpenseForm({ submitLabel, onSubmit, onCancel, defaultValues }) {
  const [expenseData, setExpenseData] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    // enterdValue will be automatically passed by the js
    setExpenseData((currExpenseData) => {
      return {
        ...currExpenseData,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expense = {
      amount: +expenseData.amount.value, // here, + converts string into num
      date: new Date(expenseData.date.value),
      description: expenseData.description.value,
    };

    // validation
    const amountIsValid = !isNaN(expense.amount) && expense.amount > 0;
    const dateIsValid = expense.date.toString() !== "Invalid Date";
    const descriptionIsValid = expense.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expense);
    } else {
      setExpenseData((currData) => {
        return {
          amount: { value: currData.amount.value, isValid: amountIsValid },
          date: { value: currData.date.value, isValid: dateIsValid },
          description: { value: currData.description.value, isValid: descriptionIsValid },
        };
      });
    }
  }

  const formIsInvalid =
    !expenseData.amount.isValid || !expenseData.date.isValid || !expenseData.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={{ flex: 1 }}
          invalid={!expenseData.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: expenseData.amount.value,
          }}
        />
        <Input
          label="Date"
          style={{ flex: 1 }}
          invalid={!expenseData.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: expenseData.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!expenseData.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: true,
          autoCapitalize: "sentences",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: expenseData.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values.</Text>}
      <View style={styles.buttonContainer}>
        <CustomButton mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={submitHandler} style={styles.button}>
          {submitLabel}
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    minWidth: 100,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
