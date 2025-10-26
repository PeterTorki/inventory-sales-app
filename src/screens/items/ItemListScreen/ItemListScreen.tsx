import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import EmptyState from "../../../components/EmptyState";
import { Item } from "../../../types";
import { ItemsStackParamList } from "../../../types/navigation/itemsStackTypes";
import { useSearch } from "../../../hooks/useSearch";
import { loadItems, handleDeleteItem } from "./services";
import { styles } from "./styles";
import ItemHeader from "./components/ItemHeader";
import ItemCard from "./components/ItemCard";

const ItemListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { query, handleSearch, clearSearch, filteredData } = useSearch(items, ["name", "category_name"]);

  useFocusEffect(
    useCallback(() => {
      loadItems(setItems, setIsLoading);
    }, [])
  );

  const handleLoadItems = () => {
    loadItems(setItems, setIsLoading);
  };

  const handleEdit = (itemId: number) => {
    navigation.navigate("EditItem", { itemId });
  };

  const handleDelete = (item: Item) => {
    handleDeleteItem(item, handleLoadItems);
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
            ListEmptyComponent={
              !isLoading ? (
                <EmptyState
                  iconName="cube-outline"
                  title="No items yet"
                  subtitle="Add your first item to get started"
                />
              ) : null
            }
            contentContainerStyle={
              filteredData.length === 0 && !isLoading ? styles.emptyContainer : styles.listContainer
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshing={isLoading}
            onRefresh={handleLoadItems}
          />
        </View>
      </View>
    </View>
  );
};

export default ItemListScreen;
