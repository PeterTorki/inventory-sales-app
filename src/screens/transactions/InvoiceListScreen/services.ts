import { Alert } from "react-native";
import { getAllInvoices, deleteInvoice } from "../../../database/queries";
import { Invoice } from "../../../types";

export const loadInvoices = async (
  setInvoices: (invoices: Invoice[]) => void,
  setIsLoading: (loading: boolean) => void
) => {
  try {
    setIsLoading(true);
    const data = getAllInvoices();
    setInvoices(data);
  } catch (error) {
    console.error("Error loading invoices:", error);
    Alert.alert("Error", "Failed to load invoices");
  } finally {
    setIsLoading(false);
  }
};

export const handleDeleteInvoice = (invoice: Invoice, onSuccess: () => void) => {
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
          Alert.alert("Success", "Invoice deleted successfully");
          onSuccess();
        } catch (error) {
          console.error("Error deleting invoice:", error);
          Alert.alert("Error", "Failed to delete invoice. Please try again.");
        }
      },
    },
  ]);
};
