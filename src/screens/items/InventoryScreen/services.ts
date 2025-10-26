import { getAllItems } from "../../../database/queries";
import { Item } from "../../../types";
import { createLoadDataService } from "../../../utils/dataServices";

const loadDataService = createLoadDataService<Item>(getAllItems, "Failed to load inventory");

export const loadItems = (setItems: (items: Item[]) => void, setIsLoading: (loading: boolean) => void) => {
  loadDataService(setItems, setIsLoading);
};

export const calculateInventoryStats = (items: Item[]) => {
  const totalItems = items.length;
  const outOfStock = items.filter((i) => i.quantity === 0).length;
  const lowStock = items.filter((i) => i.quantity > 0 && i.quantity < 10).length;

  return { totalItems, outOfStock, lowStock };
};
