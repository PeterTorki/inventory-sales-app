import { Alert, Keyboard } from "react-native";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "../../../database/queries";
import { Category } from "../../../types";

export const loadCategories = (setCategories: (categories: Category[]) => void) => {
  try {
    const data = getAllCategories();
    setCategories(data);
  } catch (error) {
    console.error("Error loading categories:", error);
    Alert.alert("Error", "Failed to load categories");
  }
};

export const handleAddCategory = (
  setEditingCategory: (category: Category | null) => void,
  setCategoryName: (name: string) => void,
  setError: (error: string) => void,
  setIsModalVisible: (visible: boolean) => void
) => {
  setEditingCategory(null);
  setCategoryName("");
  setError("");
  setIsModalVisible(true);
};

export const handleEditCategory = (
  category: Category,
  setEditingCategory: (category: Category | null) => void,
  setCategoryName: (name: string) => void,
  setError: (error: string) => void,
  setIsModalVisible: (visible: boolean) => void
) => {
  setEditingCategory(category);
  setCategoryName(category.name);
  setError("");
  setIsModalVisible(true);
};

export const handleSaveCategory = async (
  editingCategory: Category | null,
  categoryName: string,
  setError: (error: string) => void,
  setIsLoading: (loading: boolean) => void,
  setIsModalVisible: (visible: boolean) => void,
  setCategoryName: (name: string) => void,
  onSuccess: () => void
) => {
  if (!categoryName.trim()) {
    setError("Category name is required");
    return;
  }

  setIsLoading(true);
  try {
    if (editingCategory) {
      updateCategory(editingCategory.id, categoryName.trim());
      Alert.alert("Success", "Category updated successfully");
    } else {
      addCategory(categoryName.trim());
      Alert.alert("Success", "Category added successfully");
    }

    Keyboard.dismiss();
    setIsModalVisible(false);
    setCategoryName("");
    setError("");
    onSuccess();
  } catch (error: any) {
    console.error("Error saving category:", error);
    if (error.message?.includes("UNIQUE")) {
      setError("Category name already exists");
    } else {
      Alert.alert("Error", "Failed to save category");
    }
  } finally {
    setIsLoading(false);
  }
};

export const handleDeleteCategory = (category: Category, onSuccess: () => void) => {
  Alert.alert(
    "Delete Category",
    `Are you sure you want to delete "${category.name}"? This will remove the category from all items.`,
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            deleteCategory(category.id);
            Alert.alert("Success", "Category deleted successfully");
            onSuccess();
          } catch (error) {
            console.error("Error deleting category:", error);
            Alert.alert("Error", "Failed to delete category");
          }
        },
      },
    ]
  );
};
