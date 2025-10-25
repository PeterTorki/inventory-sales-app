import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";
import { Item } from "../../../types";
import { useSearch } from "../../../hooks/useSearch";
import { getAllItems } from "../../../database/queries";
import InventoryHeader from "./components/InventoryHeader";
import ItemCard from "./components/ItemCard";
import AdjustModal from "./components/AdjustModal";
import EmptyState from "./components/EmptyState";

const InventoryScreen: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdjustModalVisible, setIsAdjustModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [adjustQuantity, setAdjustQuantity] = useState("");
  const [adjustError, setAdjustError] = useState("");

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
      console.error("Error loading inventory:", error);
      Alert.alert("Error", "Failed to load inventory");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdjust = (item: Item) => {
    setSelectedItem(item);
    setAdjustQuantity(item.quantity.toString());
    setAdjustError("");
    setIsAdjustModalVisible(true);
  };

  const totalItems = filteredData.length;
  const outOfStock = filteredData.filter((i) => i.quantity === 0).length;
  const lowStock = filteredData.filter((i) => i.quantity > 0 && i.quantity < 10).length;

  return (
    <View style={styles.container}>
      <Header title="Inventory" caption="Monitor your stock levels" hasBack={true} />

      <View style={styles.containerContent}>
        <InventoryHeader
          query={query}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          totalItems={totalItems}
          outOfStock={outOfStock}
          lowStock={lowStock}
        />

        <FlatList
          data={filteredData}
          renderItem={({ item }) => <ItemCard item={item} onAdjust={handleQuickAdjust} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={!isLoading ? EmptyState : null}
          contentContainerStyle={filteredData.length === 0 && !isLoading ? styles.emptyContainer : styles.listContainer}
          refreshing={isLoading}
          onRefresh={loadItems}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <AdjustModal
        visible={isAdjustModalVisible}
        selectedItem={selectedItem}
        adjustQuantity={adjustQuantity}
        adjustError={adjustError}
        setAdjustQuantity={setAdjustQuantity}
        setAdjustError={setAdjustError}
        setIsModalVisible={setIsAdjustModalVisible}
        onSuccess={loadItems}
      />
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
  listContainer: { paddingBottom: sizes.spacing["2xl"] },
  emptyContainer: { flex: 1 },
});

export default InventoryScreen;
