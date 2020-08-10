import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();
let Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

if (Platform.OS === "android") {
  Tab = createMaterialBottomTabNavigator();
}

function MealsScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
      mode="card"
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={({ navigation }) => ({
          title: "Meal Categories",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => ({
          title: CATEGORIES.find((cat) => cat.id === route.params.categoryId)
            .title,
        })}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          // title: MEALS.find((meal) => meal.id === route.params.mealId).title,
          title: route.params.mealTitle,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Favourite"
                iconName={
                  route.params.isFav === true ? "ios-star" : "ios-star-outline"
                }
                onPress={route.params.toogleFav}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const FavStack = createStackNavigator();

function FavouritesScreenSt() {
  return (
    <FavStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
      mode="card"
    >
      <FavStack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={({ navigation }) => ({
          title: "Your Favourites",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <FavStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          // title: MEALS.find((meal) => meal.id === route.params.mealId).title,
          title: route.params.mealTitle,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Favourite"
                iconName={
                  route.params.isFav === true ? "ios-star" : "ios-star-outline"
                }
                onPress={route.params.toogleFav}
              />
            </HeaderButtons>
          ),
        })}
      />
    </FavStack.Navigator>
  );
}

// let tabNavOptions = Tab.Navigator;

// if(Platform.OS === 'android'){}

const tabScreenConfig = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
      }}
      activeColor={"#fff"}
      shifting={true}
      barStyle={{ backgroundColor: Colors.primaryColor }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
            );
          },
          tabBarColor: Colors.primaryColor,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreenSt}
        options={{
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.color} />;
          },
          tabBarColor: Colors.accentColor,
        }}
      />
    </Tab.Navigator>
  );
};
// if (Platform.OS === "android") {
//   tabScreenConfig = (
//     <Tab.Navigator
//       activeColor={"#fff"}
//       shifting={true}
//       barStyle={{ backgroundColor: Colors.primaryColor }}
//     >
//       <Tab.Screen
//         name="Meals"
//         component={MealsScreen}
//         options={{
//           tabBarIcon: (tabInfo) => {
//             return (
//               <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
//             );
//           },
//           tabBarColor: Colors.primaryColor,
//         }}
//       />
//       <Tab.Screen
//         name="Favourites"
//         component={FavouritesScreenSt}
//         options={{
//           tabBarIcon: (tabInfo) => {
//             return <Ionicons name="ios-star" size={25} color={tabInfo.color} />;
//           },
//           tabBarColor: Colors.accentColor,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

const FilterStack = createStackNavigator();

const Filters = () => {
  return (
    <FilterStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
      mode="card"
    >
      <FilterStack.Screen
        name="FiltersScreen"
        component={FiltersScreen}
        options={({ route, navigation }) => ({
          title: "Filters",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName="ios-save"
                onPress={() => route.params.save()}
              />
            </HeaderButtons>
          ),
        })}
      />
    </FilterStack.Navigator>
  );
};

const DrawerNav = (
  <Drawer.Navigator
    initialRouteName="Meals App"
    drawerContentOptions={{
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    }}
  >
    <Drawer.Screen name="Home" component={tabScreenConfig} />
    <Drawer.Screen name="Filters" component={Filters} />
  </Drawer.Navigator>
);

const MealsNavigator = () => {
  return <NavigationContainer>{DrawerNav}</NavigationContainer>;
};

export default MealsNavigator;
