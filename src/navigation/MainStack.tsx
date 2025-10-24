import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation/mainStackTypes";
import MainTabNavigator from "./MainTabs";
import ItemsNavigator from "./ItemsStack";
import CustomersNavigator from "./CustomersStack";
import TransactionsNavigator from "./TransactionsStack";

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainTabs" component={MainTabNavigator} />
      <MainStack.Screen name="ItemsStack" component={ItemsNavigator} />
      <MainStack.Screen name="CustomersStack" component={CustomersNavigator} />
      <MainStack.Screen name="TransactionsStack" component={TransactionsNavigator} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
