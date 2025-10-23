import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type CustomersStackParamList = {
  CustomerList: undefined;
  AddCustomer: undefined;
  EditCustomer: { customerId: number };
};

export type CustomerListScreenProps = NativeStackScreenProps<CustomersStackParamList, "CustomerList">;
export type AddCustomerScreenProps = NativeStackScreenProps<CustomersStackParamList, "AddCustomer">;
export type EditCustomerScreenProps = NativeStackScreenProps<CustomersStackParamList, "EditCustomer">;
