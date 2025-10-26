import { Alert, Keyboard } from "react-native";
import { getCustomerById, updateCustomer, addCustomer } from "../../../database/queries";

interface FormData {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name: string;
  phone: string;
  email: string;
}

export const loadFormData = async (
  customerId: number | null,
  isEditMode: boolean,
  setFormData: (data: FormData) => void,
  setIsFetching: (fetching: boolean) => void,
  navigation: any
) => {
  if (isEditMode) {
    setIsFetching(true);
  }

  try {
    if (isEditMode && customerId) {
      const customerData = getCustomerById(customerId);
      if (customerData) {
        setFormData({
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email || "",
        });
      } else {
        Alert.alert("Error", "Customer not found", [{ text: "OK", onPress: () => navigation.goBack() }]);
      }
    }
  } catch (error) {
    console.error("Error loading data:", error);
    Alert.alert("Error", "Failed to load customer data");
  } finally {
    if (isEditMode) {
      setIsFetching(false);
    }
  }
};

export const validateForm = (formData: FormData, setErrors: (errors: FormErrors) => void): boolean => {
  const newErrors: FormErrors = {
    name: "",
    phone: "",
    email: "",
  };

  if (!formData.name.trim()) {
    newErrors.name = "Customer name is required";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
    newErrors.phone = "Please enter a valid phone number";
  }

  if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  setErrors(newErrors);
  return !Object.values(newErrors).some((error) => error !== "");
};

export const submitForm = async (
  formData: FormData,
  customerId: number | null,
  isEditMode: boolean,
  setErrors: (errors: FormErrors) => void,
  setIsLoading: (loading: boolean) => void,
  navigation: any,
  validate: () => boolean
) => {
  Keyboard.dismiss();

  if (!validate()) return;

  setIsLoading(true);
  try {
    const customerData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
    };

    if (isEditMode && customerId) {
      updateCustomer(customerId, customerData);
      Alert.alert("Success", "Customer updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } else {
      addCustomer(customerData);
      Alert.alert("Success", "Customer added successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
    }
  } catch (error) {
    console.error(`Error ${isEditMode ? "updating" : "adding"} customer:`, error);
    Alert.alert("Error", `Failed to ${isEditMode ? "update" : "add"} customer. Please try again.`);
  } finally {
    setIsLoading(false);
  }
};
