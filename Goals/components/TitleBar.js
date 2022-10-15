import { Image, StyleSheet, Text, View } from "react-native";

const TitleBar = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/images/goal.png")} style={styles.favicon} />
      <Text style={styles.title}>Goals</Text>
    </View>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 32,
    padding: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "darkolivegreen",
  },
  favicon: {
    width: 28,
    height: 28,
    tintColor: "darkolivegreen",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 4,
    color: "black",
  },
});
