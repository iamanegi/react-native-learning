import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(inputText) {
    setEnteredGoalText(inputText);
  }

  function addGoalHandler() {
    console.log(enteredGoalText);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your task"
          style={styles.textInput}
          onChangeText={goalInputHandler}
        />
        <Button title="Add Task" style={styles.button} onPress={addGoalHandler} />
      </View>
      <View style={styles.listContainer}>
        <Text>List of goals:</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 16,
    marginTop: 56,
    flex: 1,
    flexDirection: "column",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 32,
  },
  listContainer: {
    flex: 9,
    marginTop: 16,
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
