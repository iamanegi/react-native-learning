import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MealItem from "../components/MealItem";
import { MEALS } from "../data/dummy-data";
import { FavouritesContext } from "../store/context/favourite-context";

export default function FavouritesScreen() {
  const favouriteMealCtx = useContext(FavouritesContext);
  const favouriteMeals = MEALS.filter((mealItem) => favouriteMealCtx.ids.includes(mealItem.id));

  if (favouriteMeals.length == 0) {
    return (
      <View style={styles.container2}>
        <Text style={styles.noDataText}>You don't have any favourites till now.</Text>
      </View>
    );
  }

  function renderMealItem(itemData) {
    const mealProps = {
      id: itemData.item.id,
      imageUrl: itemData.item.imageUrl,
      title: itemData.item.title,
      duration: itemData.item.duration,
      complexity: itemData.item.complexity,
      affordability: itemData.item.affordability,
    };
    return <MealItem {...mealProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container2: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
