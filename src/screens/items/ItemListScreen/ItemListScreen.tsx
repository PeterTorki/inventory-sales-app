import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";
import { getAllItems, deleteItem } from "../../../database/queries";
import { Item } from "../../../types";
import { ItemsStackParamList } from "../../../types/navigation/itemsStackTypes";
import { useSearch } from "../../../hooks/useSearch";
import ItemHeader from "./components/ItemHeader";
import ItemCard from "./components/ItemCard";
import EmptyState from "./components/EmptyState";

const ItemListScreen: React.FC = () => {
  const navigation = useNavigation<ItemsStackParamList>();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { query, handleSearch, clearSearch, filteredData } = useSearch(items, ["name", "category_name"]);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const loadItems = () => {
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

  const handleEdit = (itemId: number) => {
    navigation.navigate("EditItem", { itemId });
  };

  const handleDelete = (item: Item) => {
    Alert.alert("Delete Item", `Are you sure you want to delete "${item.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          try {
            deleteItem(item.id);
            Alert.alert("Success", "Item deleted successfully");
            loadItems();
          } catch (error) {
            console.error("Error deleting item:", error);
            Alert.alert("Error", "Failed to delete item. It may be used in invoices.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Items" caption="Manage your inventory items" hasBack={false} />

      <View style={styles.containerContent}>
        <ItemHeader
          query={query}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          filteredCount={filteredData.length}
          navigation={navigation}
        />

        <View style={styles.content}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <ItemCard item={item} onEdit={handleEdit} onDelete={handleDelete} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={!isLoading ? EmptyState : null}
            contentContainerStyle={
              filteredData.length === 0 && !isLoading ? styles.emptyContainer : styles.listContainer
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshing={isLoading}
            onRefresh={loadItems}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerContent: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: sizes.layout.containerPadding,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
  },
  listContainer: { paddingBottom: sizes.spacing["2xl"] },
  emptyContainer: { flex: 1 },
});

export default ItemListScreen;
