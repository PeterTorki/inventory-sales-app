import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ItemsStackParamList } from "../types/itemsStackTypes";
import ItemListScreen from "../screens/items/ItemListScreen";
import AddItemScreen from "../screens/items/AddItemScreen";
import EditItemScreen from "../screens/items/EditItemScreen";
import CategoryScreen from "../screens/items/CategoryScreen";
import InventoryScreen from "../screens/items/InventoryScreen";

const ItemsStack = createNativeStackNavigator<ItemsStackParamList>();

const ItemsNavigator: React.FC = () => {
  return (
    <ItemsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ItemList">
      <ItemsStack.Screen name="ItemList" component={ItemListScreen} options={{ title: "Items" }} />
      <ItemsStack.Screen name="AddItem" component={AddItemScreen} options={{ title: "Add New Item" }} />
      <ItemsStack.Screen name="EditItem" component={EditItemScreen} options={{ title: "Edit Item" }} />
      <ItemsStack.Screen name="Category" component={CategoryScreen} options={{ title: "Categories" }} />
      <ItemsStack.Screen name="Inventory" component={InventoryScreen} options={{ title: "Inventory Stock" }} />
    </ItemsStack.Navigator>
  );
};

export default ItemsNavigator;
