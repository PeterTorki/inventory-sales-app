import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ItemsStackParamList } from "../types/navigation/itemsStackTypes";
// import ItemListScreen from "../screens/items/ItemListScreen/ItemListScreen";

// import CategoryScreen from "../screens/items/CategoryScreen/CategoryScreen";
// import InventoryScreen from "../screens/items/InventoryScreen/InventoryScreen";
import { CategoryScreen, InventoryScreen, ItemListScreen } from "../screens/items";

const ItemsStack = createNativeStackNavigator<ItemsStackParamList>();

const ItemsNavigator: React.FC = () => {
  return (
    <ItemsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ItemList">
      <ItemsStack.Screen name="ItemList" component={ItemListScreen} options={{ title: "Items" }} />

      <ItemsStack.Screen name="Category" component={CategoryScreen} options={{ title: "Categories" }} />
      <ItemsStack.Screen name="Inventory" component={InventoryScreen} options={{ title: "Inventory Stock" }} />
    </ItemsStack.Navigator>
  );
};

export default ItemsNavigator;
