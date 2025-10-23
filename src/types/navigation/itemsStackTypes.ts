import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ItemsStackParamList = {
  ItemList: undefined;
  AddItem: undefined;
  EditItem: { itemId: number };
  Category: undefined;
  Inventory: undefined;
};

export type ItemListScreenProps = NativeStackScreenProps<ItemsStackParamList, "ItemList">;
export type AddItemScreenProps = NativeStackScreenProps<ItemsStackParamList, "AddItem">;
export type EditItemScreenProps = NativeStackScreenProps<ItemsStackParamList, "EditItem">;
export type CategoryScreenProps = NativeStackScreenProps<ItemsStackParamList, "Category">;
export type InventoryScreenProps = NativeStackScreenProps<ItemsStackParamList, "Inventory">;
