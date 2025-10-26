import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import { Item } from "../../../types";
import { useSearch } from "../../../hooks/useSearch";
import { loadItems, calculateInventoryStats } from "./services";
import { styles } from "./styles";
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
      loadItems(setItems, setIsLoading);
    }, [])
  );

  const handleLoadItems = () => {
    loadItems(setItems, setIsLoading);
  };

  const handleQuickAdjust = (item: Item) => {
    setSelectedItem(item);
    setAdjustQuantity(item.quantity.toString());
    setAdjustError("");
    setIsAdjustModalVisible(true);
  };

  const { totalItems, outOfStock, lowStock } = calculateInventoryStats(filteredData);

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
          onRefresh={handleLoadItems}
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
        onSuccess={handleLoadItems}
      />
    </View>
  );
};

export default InventoryScreen;
