import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { NavigatorScreenParams } from "@react-navigation/native";
import { ItemsStackParamList } from "./itemsStackTypes";
import { CustomersStackParamList } from "./customersStackTypes";
import { TransactionsStackParamList } from "./transactionsStackTypes";

export type MainTabsParamList = {
  Home: undefined;
  Items: NavigatorScreenParams<ItemsStackParamList>;
  Customers: NavigatorScreenParams<CustomersStackParamList>;
  Transactions: NavigatorScreenParams<TransactionsStackParamList>;
};

export type HomeTabNavigationProp = BottomTabNavigationProp<MainTabsParamList, "Home">;
export type ItemsTabNavigationProp = BottomTabNavigationProp<MainTabsParamList, "Items">;
export type CustomersTabNavigationProp = BottomTabNavigationProp<MainTabsParamList, "Customers">;
export type TransactionsTabNavigationProp = BottomTabNavigationProp<MainTabsParamList, "Transactions">;
