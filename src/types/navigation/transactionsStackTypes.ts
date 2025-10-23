import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TransactionsStackParamList = {
  InvoiceList: undefined;
  CreateInvoice: undefined;
  InvoiceDetail: { invoiceId: number };
};

export type InvoiceListScreenProps = NativeStackScreenProps<TransactionsStackParamList, "InvoiceList">;
export type CreateInvoiceScreenProps = NativeStackScreenProps<TransactionsStackParamList, "CreateInvoice">;
export type InvoiceDetailScreenProps = NativeStackScreenProps<TransactionsStackParamList, "InvoiceDetail">;
