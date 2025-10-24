import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NavigatorScreenParams } from "@react-navigation/native";
import { MainTabsParamList } from "./mainTabsTypes";
import { ItemsStackParamList } from "./itemsStackTypes";
import { CustomersStackParamList } from "./customersStackTypes";
import { TransactionsStackParamList } from "./transactionsStackTypes";

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  ItemsStack: {
    screen: keyof ItemsStackParamList;
    params?: ItemsStackParamList[keyof ItemsStackParamList];
  };
  CustomersStack: {
    screen: keyof CustomersStackParamList;
    params?: CustomersStackParamList[keyof CustomersStackParamList];
  };
  TransactionsStack: {
    screen: keyof TransactionsStackParamList;
    params?: TransactionsStackParamList[keyof TransactionsStackParamList];
  };
};

export type MainTabProps = NativeStackScreenProps<MainStackParamList, "MainTabs">;
