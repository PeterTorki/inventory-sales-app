import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { NavigatorScreenParams } from "@react-navigation/native";
import { ItemsStackParamList } from "./itemsStackTypes";
import { CustomersStackParamList } from "./customersStackTypes";
import { TransactionsStackParamList } from "./transactionsStackTypes";

export type MainTabsParamList = {
  Home: undefined;
  Items: undefined;
  Customers: undefined;
  Transactions: undefined;
};

export type HomeTabNavigationProp = BottomTabNavigationProp<MainTabsParamList, "Home">;
