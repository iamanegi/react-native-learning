import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import { Ionicons } from "@expo/vector-icons";
import FavouritesContextProvider from "./store/context/favourite-context";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      screenOptions={{
        headerStyle: { backgroundColor: "#808080" },
        headerTintColor: "black",
        contentStyle: { backgroundColor: "#cccccc" },
        drawerContentStyle: { backgroundColor: "#cccccc" },
        drawerActiveBackgroundColor: "#1b1b1b",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "black",
      }}
    >
      <Drawer.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          title: "Favourites",
          drawerIcon: ({ color, size }) => <Ionicons name="star" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      {/* <FavouritesContextProvider> context based state management */}
      <Provider store={store}>
        <NavigationContainer>
          {/* default screen can be set either by setting as the top most entry in the Stack.Navifator or using initialRouteName */}
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#808080" },
              headerTintColor: "black",
              contentStyle: { backgroundColor: "#cccccc" },
            }}
          >
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{ title: "Back", headerShown: false }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // one way to set dynamic options
              // options={({route, navigation})=> {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId
              //   };
              // }}
            />
            <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavouritesContextProvider> context based state management */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
