import { Alert, Keyboard } from "react-native";
import { getAllCategories, getItemById, updateItem, addItem } from "../../../database/queries";
import { Category } from "../../../types";

interface FormData {
  name: string;
  category_id: number | null;
  price: string;
  quantity: string;
}

interface FormErrors {
  name: string;
  category_id: string;
  price: string;
  quantity: string;
}

export const loadFormData = async (
  itemId: number | null,
  isEditMode: boolean,
  setCategories: (categories: Category[]) => void,
  setFormData: (data: FormData) => void,
  setIsFetching: (fetching: boolean) => void,
  navigation: any
) => {
  if (isEditMode) {
    setIsFetching(true);
  }

  try {
    const categoriesData = getAllCategories();
    setCategories(categoriesData);

    if (isEditMode && itemId) {
      const itemData = await getItemById(itemId);
      if (itemData) {
        setFormData({
          name: itemData.name,
          category_id: itemData.category_id,
          price: itemData.price.toString(),
          quantity: itemData.quantity.toString(),
        });
      } else {
        Alert.alert("Error", "Item not found", [{ text: "OK", onPress: () => navigation.goBack() }]);
      }
    }
  } catch (error) {
    console.error("Error loading data:", error);
    Alert.alert("Error", `Failed to load ${isEditMode ? "item" : "categories"} data`);
  } finally {
    if (isEditMode) {
      setIsFetching(false);
    }
  }
};

export const validateForm = (formData: FormData, setErrors: (errors: FormErrors) => void): boolean => {
  const newErrors: FormErrors = {
    name: "",
    category_id: "",
    price: "",
    quantity: "",
  };

  if (!formData.name.trim()) newErrors.name = "Item name is required";
  if (!formData.category_id) newErrors.category_id = "Please select a category";

  const price = parseFloat(formData.price);
  if (!formData.price || isNaN(price) || price <= 0) {
    newErrors.price = "Please enter a valid price greater than 0";
  }

  const quantity = parseInt(formData.quantity);
  if (!formData.quantity || isNaN(quantity) || quantity < 0) {
    newErrors.quantity = "Please enter a valid quantity (0 or more)";
  }

  setErrors(newErrors);
  return !Object.values(newErrors).some((error) => error !== "");
};

export const submitForm = async (
  formData: FormData,
  itemId: number | null,
  isEditMode: boolean,
  categories: Category[],
  setErrors: (errors: FormErrors) => void,
  setIsLoading: (loading: boolean) => void,
  navigation: any,
  validate: () => boolean
) => {
  Keyboard.dismiss();

  if (!validate()) return;

  if (!isEditMode && categories.length === 0) {
    Alert.alert("No Categories", "Please add at least one category first", [
      { text: "Add Category", onPress: () => navigation.navigate("Category") },
      { text: "Cancel", style: "cancel" },
    ]);
    return;
  }

  setIsLoading(true);
  try {
    const itemData = {
      name: formData.name.trim(),
      category_id: formData.category_id!,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    if (isEditMode && itemId) {
      updateItem(itemId, itemData);
      Alert.alert("Success", "Item updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } else {
      addItem(itemData);
      Alert.alert("Success", "Item added successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
    }
  } catch (error) {
    console.error(`Error ${isEditMode ? "updating" : "adding"} item:`, error);
    Alert.alert("Error", `Failed to ${isEditMode ? "update" : "add"} item. Please try again.`);
  } finally {
    setIsLoading(false);
  }
};
