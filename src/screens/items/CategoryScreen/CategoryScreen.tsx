import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import AppText from "../../../components/AppText";
import AppButton from "../../../components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";
import { Category } from "../../../types";
import { loadCategories, handleAddCategory, handleEditCategory, handleDeleteCategory } from "./services";
import CategoryItem from "./components/CategoryItem";
import CategoryModal from "./components/CategoryModal";
import EmptyState from "./components/EmptyState";

const CategoryScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCategories(setCategories);
    }, [])
  );

  const onAddCategory = () => {
    handleAddCategory(setEditingCategory, setCategoryName, setError, setIsModalVisible);
  };

  const onEditCategory = (category: Category) => {
    handleEditCategory(category, setEditingCategory, setCategoryName, setError, setIsModalVisible);
  };

  const onDeleteCategory = (category: Category) => {
    handleDeleteCategory(category, () => loadCategories(setCategories));
  };

  return (
    <>
      <View style={styles.container}>
        <Header title="Categories" caption="Manage your item categories" hasBack={true} />

        <View style={styles.content}>
          <View style={styles.header}>
            <AppText variant="h3" bold>
              Categories
            </AppText>

            <AppButton
              title="Add Category"
              onPress={onAddCategory}
              size="s"
              width="auto"
              ph={sizes.spacing.lg}
              color="text"
              backgroundColor="primary"
              icon={<Ionicons name="add-circle-outline" size={20} color={colors.text} />}
            />
          </View>

          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryItem item={item} onEdit={onEditCategory} onDelete={onDeleteCategory} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={categories.length === 0 ? styles.emptyContainer : styles.listContainer}
            ListEmptyComponent={EmptyState}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </View>

      <CategoryModal
        visible={isModalVisible}
        editingCategory={editingCategory}
        categoryName={categoryName}
        error={error}
        isLoading={isLoading}
        setCategoryName={setCategoryName}
        setError={setError}
        setIsModalVisible={setIsModalVisible}
        setIsLoading={setIsLoading}
        onSuccess={() => loadCategories(setCategories)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: sizes.layout.containerPadding,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: sizes.spacing.lg,
  },
  listContainer: { paddingBottom: sizes.spacing["2xl"] },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CategoryScreen;
