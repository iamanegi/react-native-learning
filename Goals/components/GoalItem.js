import { Pressable, StyleSheet, Text, View } from "react-native";

function GoalItem(props) {
  return (
    <View style={styles.listItem}>
      {/* the Text is wrapped inside the View element because there is no native mappable property of Text element for borderRadius in iOS */}
      <Pressable
        android_ripple={{ color: "darkgreyr" }}
        onPress={props.onDeleteItem.bind(this, props.index)}
        style={({ pressed }) => pressed && styles.pressedListItem}
      >
        {/* .bind() allows us to preconfigure a function for future execution. The first value in the bind function sets the this keyword in the function */}
        <Text style={styles.listText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  listItem: {
    marginTop: 8,
    borderRadius: 6,
    backgroundColor: "peru",
    fontSize: 16,
  },
  pressedListItem: {
    opacity: 0.5,
  },
  listText: {
    color: "white",
    padding: 8,
  },
});
