import { Platform, StyleSheet, Text } from "react-native";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "poppins-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: Platform.OS === "ios" ? 4 : 2,
    borderColor: Platform.select({ ios: "grey", android: "white" }),
    padding: 12,
    maxWidth: "80%",
  },
});
