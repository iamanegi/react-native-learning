import { useState } from "react";
import { Button, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
        <Image source={require("../assets/images/goal.png")} style={styles.image} />
        <TextInput
          value={enteredGoalText}
          placeholder="Enter your task"
          style={styles.textInput}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            style={styles.button}
            onPress={props.onDismiss}
            color="rebeccapurple"
          />
          <Button title="Add Task" style={styles.button} onPress={addGoalHandler} color="teal" />
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
    backgroundColor: "peru",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    width: "60%",
    height: undefined,
    aspectRatio: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 8,
    backgroundColor: "burlywood",
    color: "black",
    width: "100%",
    padding: 16,
  },
  button: {
    alignContent: "center",
  },
});
