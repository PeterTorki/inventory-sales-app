// CategoryModal.tsx
import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import AppModal from "../../../../components/AppModal";
import AppInput from "../../../../components/AppInput";
import AppButton from "../../../../components/AppButton";
import { sizes } from "../../../../constants/sizes";
import { Category } from "../../../../types";
import { handleSaveCategory } from "../services";

interface CategoryModalProps {
  visible: boolean;
  editingCategory: Category | null;
  categoryName: string;
  error: string;
  isLoading: boolean;
  setCategoryName: (name: string) => void;
  setError: (error: string) => void;
  setIsModalVisible: (visible: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  onSuccess: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  editingCategory,
  categoryName,
  error,
  isLoading,
  setCategoryName,
  setError,
  setIsModalVisible,
  setIsLoading,
  onSuccess,
}) => {
  const onSave = () => {
    handleSaveCategory(
      editingCategory,
      categoryName,
      setError,
      setIsLoading,
      setIsModalVisible,
      setCategoryName,
      onSuccess
    );
  };

  return (
    <AppModal
      modalTitle={editingCategory ? "Edit Category" : "Add Category"}
      visible={visible}
      onClose={() => {
        Keyboard.dismiss();
        setIsModalVisible(false);
      }}
      dismissOnOutsidePress={true}>
      <AppInput
        label="Category Name"
        value={categoryName}
        onChangeText={(text) => {
          setCategoryName(text);
          setError("");
        }}
        placeholder="Enter category name"
        error={error}
        required
        autoFocus
        returnKeyType="done"
        onSubmitEditing={onSave}
      />

      <View style={styles.modalButtons}>
        <AppButton
          title="Cancel"
          onPress={() => {
            Keyboard.dismiss();
            setIsModalVisible(false);
          }}
          variant="outline"
          width="48%"
        />

        <AppButton
          title={editingCategory ? "Update" : "Add"}
          onPress={onSave}
          loading={isLoading}
          disabled={isLoading}
          width="48%"
        />
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
    marginTop: sizes.spacing.md,
  },
});

export default CategoryModal;
