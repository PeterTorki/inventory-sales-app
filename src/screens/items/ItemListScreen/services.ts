import { getAllItems, deleteItem } from "../../../database/queries";
import { Item } from "../../../types";
import { createLoadDataService, createDeleteService } from "../../../utils/dataServices";

const loadDataService = createLoadDataService<Item>(getAllItems, "Failed to load items");

export const loadItems = (setItems: (items: Item[]) => void, setIsLoading: (loading: boolean) => void) => {
  loadDataService(setItems, setIsLoading);
};

const deleteService = createDeleteService<Item>(
  deleteItem,
  "Item",
  "Failed to delete item. It may be used in invoices."
);

export const handleDeleteItem = (item: Item, onSuccess: () => void) => {
  deleteService(item, onSuccess);
};
