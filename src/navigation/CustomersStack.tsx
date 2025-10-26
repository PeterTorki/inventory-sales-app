import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomersStackParamList } from "../types/navigation/customersStackTypes";
import CustomerListScreen from "../screens/customers/CustomerListScreen";

const CustomersStack = createNativeStackNavigator<CustomersStackParamList>();

const CustomersNavigator: React.FC = () => {
  return (
    <CustomersStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CustomerList">
      <CustomersStack.Screen name="CustomerList" component={CustomerListScreen} options={{ title: "Customers" }} />
    </CustomersStack.Navigator>
  );
};

export default CustomersNavigator;
