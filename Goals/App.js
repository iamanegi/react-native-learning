import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  function goalInputHandler(inputText) {
    setEnteredGoalText(inputText);
  }

  function addGoalHandler() {
    let goal = enteredGoalText.trim();
    if (goal != "") {
      setGoalsList(() => [...goalsList, goal]);
      setEnteredGoalText("");
    }
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={enteredGoalText}
          placeholder="Enter your task"
          style={styles.textInput}
          onChangeText={goalInputHandler}
        />
        <Button title="Add Task" style={styles.button} onPress={addGoalHandler} />
      </View>
      <View style={styles.listContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {goalsList.map((goal, index) => (
            <View key={index} style={styles.listItem}>
              {/* the Text is wrapped inside the View element because there is no native mappable property of Text element for borderRadius in iOS */}
              <Text style={styles.listText}>{goal}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
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
  listItem: {
    padding: 8,
    marginTop: 8,
    borderRadius: 6,
    backgroundColor: "cornflowerblue",
    fontSize: 16,
  },
  listText: {
    color: "white",
  },
});
