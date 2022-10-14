import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(inputText) {
    setEnteredGoalText(inputText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={enteredGoalText}
        placeholder="Enter your task"
        style={styles.textInput}
        onChangeText={goalInputHandler}
      />
      <Button title="Add Task" style={styles.button} onPress={addGoalHandler} />
    </View>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 32,
  },

  textInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    width: "70%",
    marginEnd: 8,
    padding: 8,
  },
  button: {
    alignContent: "center",
  },
});
