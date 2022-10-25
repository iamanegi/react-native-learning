import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

export default function GameOverScreen({ rounds, userNumber, onStartNewGame }) {
  return (
    <View style={styles.container}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/success.png")} style={styles.image} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlightedText}>{rounds}</Text> rounds to guess the number{" "}
        <Text style={styles.highlightedText}>{userNumber}</Text>.
      </Text>
      <View style={{ flexDirection: "row" }}>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "poppins",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 24,
  },
  highlightedText: {
    fontFamily: "poppins-bold",
    color: Colors.primary500,
  },
});
