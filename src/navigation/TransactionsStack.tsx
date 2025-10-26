import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransactionsStackParamList } from "../types/navigation/transactionsStackTypes";
import { InvoiceListScreen, CreateInvoiceScreen, InvoiceDetailScreen } from "../screens/transactions";
import { withSafeArea } from "./withSafeArea";
import { colors } from "../constants/colors";

const TransactionsStack = createNativeStackNavigator<TransactionsStackParamList>();

const TransactionsNavigator: React.FC = () => {
  return (
    <TransactionsStack.Navigator
      initialRouteName="InvoiceList"
      screenOptions={{
        headerShown: false,
      }}>
      <TransactionsStack.Screen
        name="InvoiceList"
        component={withSafeArea(InvoiceListScreen, {
          scrollable: false,
          noPadding: true,
          backgroundColor: colors.primary,
        })}
        options={{ title: "Invoices" }}
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
