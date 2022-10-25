import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

export default function GuessLogItem({ roundNum, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.roundText}>#{roundNum}</Text>
      <Text style={styles.guessText}>Opponent's guess : {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderColor: Colors.primary800,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  roundText: {
    fontFamily: "poppins",
  },
  guessText: {
    fontFamily: "poppins-bold",
  },
});
