import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation/mainStackTypes";
import MainTabNavigator from "./MainTabs";
import ItemsNavigator from "./ItemsStack";
import CustomersNavigator from "./CustomersStack";
import TransactionsNavigator from "./TransactionsStack";
import { ItemsStackParamList } from "../types/navigation/itemsStackTypes";
import { ItemFormScreen } from "../screens/items";
import { TransactionsStackParamList } from "../types/navigation/transactionsStackTypes";
import { CustomersStackParamList } from "../types/navigation/customersStackTypes";
import CustomerFormScreen from "../screens/customers/CustomerFormScreen/CustomerFormScreen";
import { CreateInvoiceScreen } from "../screens/transactions";
const MainStack = createNativeStackNavigator<
  MainStackParamList & ItemsStackParamList & CustomersStackParamList & TransactionsStackParamList
>();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainTabs" component={MainTabNavigator} />
      <MainStack.Screen name="ItemsStack" component={ItemsNavigator} />
      <MainStack.Screen name="CustomersStack" component={CustomersNavigator} />
      <MainStack.Screen name="TransactionsStack" component={TransactionsNavigator} />
      {/* just to handle modal view */}
      <MainStack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}>
        <MainStack.Screen name="AddItem" component={ItemFormScreen} />
        <MainStack.Screen name="EditItem" component={ItemFormScreen} />
        <MainStack.Screen name="AddCustomer" component={CustomerFormScreen} />
        <MainStack.Screen name="EditCustomer" component={CustomerFormScreen} />
        <MainStack.Screen name="CreateInvoice" component={CreateInvoiceScreen} options={{ title: "Create Invoice" }} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainNavigator;
