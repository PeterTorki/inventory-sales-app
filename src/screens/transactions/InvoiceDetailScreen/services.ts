import { Alert } from "react-native";
import { getInvoiceById, deleteInvoice } from "../../../database/queries";
import { InvoiceDetail } from "../../../types";

export const loadInvoiceDetail = async (
  invoiceId: number,
  setInvoice: (invoice: InvoiceDetail | null) => void,
  setIsLoading: (loading: boolean) => void,
  navigation: any
) => {
  try {
    setIsLoading(true);
    const data = getInvoiceById(invoiceId);
    if (data) {
      setInvoice(data);
    } else {
      Alert.alert("Error", "Invoice not found", [{ text: "OK", onPress: () => navigation.goBack() }]);
    }
  } catch (error) {
    console.error("Error loading invoice:", error);
    Alert.alert("Error", "Failed to load invoice");
  } finally {
    setIsLoading(false);
  }
};

export const handleDeleteInvoice = (invoice: InvoiceDetail, navigation: any) => {
  Alert.alert("Delete Invoice", `Are you sure you want to delete invoice ${invoice.invoice_number}?`, [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Delete",
      style: "destructive",
      onPress: async () => {
        try {
          deleteInvoice(invoice.id);
          Alert.alert("Success", "Invoice deleted successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
        } catch (error) {
          console.error("Error deleting invoice:", error);
          Alert.alert("Error", "Failed to delete invoice. Please try again.");
        }
      },
    },
  ]);
};
