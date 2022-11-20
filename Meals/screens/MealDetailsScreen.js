import { useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";
import { MEALS } from "../data/dummy-data";

export default function MealDetailsScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => {
        return <IconButton icon="star" color="black" />;
      },
    });
  }, [navigation]);

  return (
    <View>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <View style={styles.details}>
          <Text>{selectedMeal.duration}</Text>
          <Text>{selectedMeal.complexity.toUpperCase()}</Text>
          <Text>{selectedMeal.affordability.toUpperCase()}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Ingredients</Text>
        </View>
        {selectedMeal.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItemText}>
            &#8259; {ingredient}
          </Text>
        ))}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Steps</Text>
        </View>
        {selectedMeal.steps.map((step, index) => (
          <Text key={index} style={styles.listItemText}>
            &#8227; {step}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    padding: 8,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  subtitleContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 8,
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "space-evenly",
  },
  listItemText: {
    paddingHorizontal: 8,
    marginVertical: 2,
    fontSize: 16,
  },
});
