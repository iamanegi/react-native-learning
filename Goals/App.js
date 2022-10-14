import { FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalIntput";

export default function App() {
  const [goalsList, setGoalsList] = useState([]);

  function addGoalHandler(enteredGoalText) {
    let goal = enteredGoalText.trim();
    if (goal != "") {
      setGoalsList(() => [...goalsList, { text: goal, id: Math.random().toString() }]);
    }
  }

  function deleteGoalHandler(index) {
    setGoalsList(() => {
      goalsList.splice(index, 1);
      return [...goalsList];
    });
    console.log(`DELTED: ${index}`)
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.listContainer}>
        <FlatList
          data={goalsList}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          /** Different ways to pass key to FaltList:
           *  - add a field named "key" in the item object of the data as FlatList will
           * automatically search for the key field in the individual object
           * - passing key prop to the individual item view
           * - mapping the key field with the key using ketExtractor
           */
          renderItem={(itemData) => {
            return (
              <GoalItem
                index={itemData.index}
                text={itemData.item.text}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
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
  listContainer: {
    flex: 9,
  },
});
