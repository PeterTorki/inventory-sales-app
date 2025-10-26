import { Alert } from "react-native";
import { getAllItems } from "../../../database/queries";
import { Item } from "../../../types";

export const loadItems = (setItems: (items: Item[]) => void, setIsLoading: (loading: boolean) => void) => {
  try {
    setIsLoading(true);
    const data = getAllItems();
    setItems(data);
  } catch (error) {
    console.error("Error loading inventory:", error);
    Alert.alert("Error", "Failed to load inventory");
  } finally {
    setIsLoading(false);
  }
};

export const calculateInventoryStats = (items: Item[]) => {
  const totalItems = items.length;
  const outOfStock = items.filter((i) => i.quantity === 0).length;
  const lowStock = items.filter((i) => i.quantity > 0 && i.quantity < 10).length;

  return { totalItems, outOfStock, lowStock };
};
