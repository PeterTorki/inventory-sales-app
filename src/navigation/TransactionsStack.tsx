// navigation/TransactionsStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransactionsStackParamList } from "../types/navigation/transactionsStackTypes";
import InvoiceListScreen from "../screens/transactions/InvoiceListScreen";
import CreateInvoiceScreen from "../screens/transactions/CreateInvoiceScreen";
import InvoiceDetailScreen from "../screens/transactions/InvoiceDetailScreen";

const TransactionsStack = createNativeStackNavigator<TransactionsStackParamList>();

const TransactionsNavigator: React.FC = () => {
  return (
    <TransactionsStack.Navigator
      initialRouteName="InvoiceList"
      screenOptions={{
        headerShown: false,
      }}>
      <TransactionsStack.Screen name="InvoiceList" component={InvoiceListScreen} options={{ title: "Invoices" }} />
      <TransactionsStack.Screen
        name="CreateInvoice"
        component={CreateInvoiceScreen}
        options={{ title: "Create Invoice" }}
      />
      <TransactionsStack.Screen
        name="InvoiceDetail"
        component={InvoiceDetailScreen}
        options={{ title: "Invoice Details" }}
      />
    </TransactionsStack.Navigator>
  );
};

export default TransactionsNavigator;
