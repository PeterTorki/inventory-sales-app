import React, { useState, useCallback } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import AppText from "../../../components/AppText";
import { colors } from "../../../constants/colors";
import { AddItemScreenProps, EditItemScreenProps } from "../../../types/navigation/itemsStackTypes";
import { Category } from "../../../types";
import { loadFormData, validateForm, submitForm } from "./services";
import { styles } from "./styles";
import ItemForm from "./components/ItemForm";

type ItemFormScreenProps = AddItemScreenProps | EditItemScreenProps;

const ItemFormScreen: React.FC<ItemFormScreenProps> = ({ navigation, route }) => {
  const itemId = route.params && "itemId" in route.params ? route.params.itemId : null;
  const isEditMode = itemId !== null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: null as number | null,
    price: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    category_id: "",
    price: "",
    quantity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useFocusEffect(
    useCallback(() => {
      loadFormData(itemId, isEditMode, setCategories, setFormData, setIsFetching, navigation);
    }, [itemId])
  );

  const handleSubmit = () => {
    submitForm(formData, itemId, isEditMode, categories, setErrors, setIsLoading, navigation, () =>
      validateForm(formData, setErrors)
    );
  };

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const headerTitle = isEditMode ? "Edit Item" : "Add Item";
  const headerCaption = isEditMode ? "Update item details" : "Add a new item to inventory";
  const buttonTitle = isEditMode ? "Update Item" : "Save Item";

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Header title={headerTitle} caption={headerCaption} hasBack={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <AppText variant="body" color={colors.textSecondary} style={styles.loadingText}>
            Loading item...
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}>
      <Header title={headerTitle} caption={headerCaption} hasBack={true} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <ItemForm
          formData={formData}
          errors={errors}
          categories={categories}
          isLoading={isLoading}
          buttonTitle={buttonTitle}
          updateField={updateField}
          onSubmit={handleSubmit}
          onCancel={() => navigation.goBack()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ItemFormScreen;
