// navigation/CustomersStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomersStackParamList } from "../types/customersStackTypes";
import CustomerListScreen from "../screens/customers/CustomerListScreen";
import AddCustomerScreen from "../screens/customers/AddCustomerScreen";
import EditCustomerScreen from "../screens/customers/EditCustomerScreen";

const CustomersStack = createNativeStackNavigator<CustomersStackParamList>();

const CustomersNavigator: React.FC = () => {
  return (
    <CustomersStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CustomerList">
      <CustomersStack.Screen name="CustomerList" component={CustomerListScreen} options={{ title: "Customers" }} />
      <CustomersStack.Screen name="AddCustomer" component={AddCustomerScreen} options={{ title: "Add New Customer" }} />
      <CustomersStack.Screen name="EditCustomer" component={EditCustomerScreen} options={{ title: "Edit Customer" }} />
    </CustomersStack.Navigator>
  );
};

export default CustomersNavigator;
