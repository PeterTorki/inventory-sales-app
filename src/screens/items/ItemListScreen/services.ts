import { Alert } from "react-native";
import { getAllItems, deleteItem } from "../../../database/queries";
import { Item } from "../../../types";

export const loadItems = (setItems: (items: Item[]) => void, setIsLoading: (loading: boolean) => void) => {
  try {
    setIsLoading(true);
    const data = getAllItems();
    setItems(data);
  } catch (error) {
    console.error("Error loading items:", error);
    Alert.alert("Error", "Failed to load items");
  } finally {
    setIsLoading(false);
  }
};

export const handleDeleteItem = (item: Item, onSuccess: () => void) => {
  Alert.alert("Delete Item", `Are you sure you want to delete "${item.name}"?`, [
    { text: "Cancel", style: "cancel" },
    {
      text: "Delete",
      style: "destructive",
      onPress: () => {
        try {
          deleteItem(item.id);
          Alert.alert("Success", "Item deleted successfully");
          onSuccess();
        } catch (error) {
          console.error("Error deleting item:", error);
          Alert.alert("Error", "Failed to delete item. It may be used in invoices.");
        }
      },
    },
  ]);
};
