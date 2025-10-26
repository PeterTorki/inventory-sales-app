import { Alert, Keyboard } from "react-native";
import { getAllCustomers, getAllItems, addInvoice, getNextInvoiceNumber } from "../../../database/queries";
import { Customer, Item, InvoiceItem } from "../../../types";

interface FormData {
  customer_id: number | null;
  date: string;
  invoiceItems: InvoiceItem[];
}

interface FormErrors {
  customer_id: string;
  items: string;
}

export const loadFormData = async (
  setCustomers: (customers: Customer[]) => void,
  setItems: (items: Item[]) => void,
  setIsFetching: (fetching: boolean) => void,
  navigation: any
) => {
  setIsFetching(true);

  try {
    const customersData = getAllCustomers();
    const itemsData = getAllItems();

    setCustomers(customersData);
    setItems(itemsData);

    if (customersData.length === 0) {
      Alert.alert("No Customers", "Please add at least one customer first", [
        {
          text: "Add Customer",
          onPress: () => {
            navigation.goBack();
            setTimeout(() => navigation.navigate("CustomersStack", { screen: "AddCustomer" }), 100);
          },
        },
        { text: "Cancel", onPress: () => navigation.goBack(), style: "cancel" },
      ]);
      return;
    }

    if (itemsData.length === 0) {
      Alert.alert("No Items", "Please add at least one item first", [
        {
          text: "Add Item",
          onPress: () => {
            navigation.goBack();
            setTimeout(() => navigation.navigate("ItemsStack", { screen: "AddItem" }), 100);
          },
        },
        { text: "Cancel", onPress: () => navigation.goBack(), style: "cancel" },
      ]);
      return;
    }
  } catch (error) {
    console.error("Error loading data:", error);
    Alert.alert("Error", "Failed to load data");
  } finally {
    setIsFetching(false);
  }
};

export const validateForm = (formData: FormData, setErrors: (errors: FormErrors) => void): boolean => {
  const newErrors: FormErrors = {
    customer_id: "",
    items: "",
  };

  if (!formData.customer_id) newErrors.customer_id = "Please select a customer";

  if (formData.invoiceItems.length === 0) {
    newErrors.items = "Please add at least one item to the invoice";
  } else {
    const hasInvalidQuantity = formData.invoiceItems.some((item) => item.quantity <= 0);
    if (hasInvalidQuantity) {
      newErrors.items = "All items must have a quantity greater than 0";
    }
  }

  setErrors(newErrors);
  return !Object.values(newErrors).some((error) => error !== "");
};

export const submitForm = async (
  formData: FormData,
  customers: Customer[],
  setErrors: (errors: FormErrors) => void,
  setIsLoading: (loading: boolean) => void,
  navigation: any,
  validate: () => boolean
) => {
  Keyboard.dismiss();

  if (!validate()) return;

  setIsLoading(true);
  try {
    const invoiceNumber = getNextInvoiceNumber();

    // Calculate totals
    const subtotal = formData.invoiceItems.reduce((sum, item) => sum + item.extended_amount, 0);
    const vat = subtotal * 0.14; // 14% VAT
    const total = subtotal + vat;

    const invoiceData = {
      invoice_number: invoiceNumber,
      customer_id: formData.customer_id!,
      date: formData.date,
      subtotal,
      vat,
      total,
    };

    const items = formData.invoiceItems.map((item) => ({
      item_id: item.item_id,
      quantity: item.quantity,
      price: item.price,
      extended_amount: item.extended_amount,
    }));

    const invoiceId = addInvoice(invoiceData, items);
    Alert.alert("Success", `Invoice ${invoiceNumber} created successfully`, [
      {
        text: "OK",
        onPress: () => {
          navigation.goBack();
          // Optionally navigate to invoice detail
          // navigation.navigate("InvoiceDetail", { invoiceId });
        },
      },
    ]);
  } catch (error) {
    console.error("Error creating invoice:", error);
    Alert.alert("Error", "Failed to create invoice. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
