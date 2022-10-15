import { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";

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
    <Modal visible={props.isVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          value={enteredGoalText}
          placeholder="Enter your task"
          style={styles.textInput}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <Button title="Cancel" style={styles.button} onPress={props.onDismiss} />
          <Button title="Add Task" style={styles.button} onPress={addGoalHandler} />
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    width: "100%",
    padding: 8,
  },
  button: {
    alignContent: "center",
  },
});
