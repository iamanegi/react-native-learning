import { StyleSheet, Text, View } from "react-native";

function GoalItem(props) {
  return (
    <View style={styles.listItem}>
      {/* the Text is wrapped inside the View element because there is no native mappable property of Text element for borderRadius in iOS */}
      <Text style={styles.listText}>{props.text}</Text>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
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
