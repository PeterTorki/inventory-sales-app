import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import AppText from "../../../components/AppText";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";
import { loadFormData, validateForm, submitForm } from "./services";
import CustomerForm from "./components/customerForm";

type CustomerFormScreenProps = any;

const CustomerFormScreen: React.FC<CustomerFormScreenProps> = ({ navigation, route }) => {
  const customerId = route.params && "customerId" in route.params ? route.params.customerId : null;
  const isEditMode = customerId !== null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useFocusEffect(
    useCallback(() => {
      loadFormData(customerId, isEditMode, setFormData, setIsFetching, navigation);
    }, [customerId])
  );

  const handleSubmit = () => {
    submitForm(formData, customerId, isEditMode, setErrors, setIsLoading, navigation, () =>
      validateForm(formData, setErrors)
    );
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const headerTitle = isEditMode ? "Edit Customer" : "Add Customer";
  const headerCaption = isEditMode ? "Update customer details" : "Add a new customer to your database";
  const buttonTitle = isEditMode ? "Update Customer" : "Save Customer";

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Header title={headerTitle} caption={headerCaption} hasBack={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <AppText variant="body" color={colors.textSecondary} style={styles.loadingText}>
            Loading customer...
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
        <CustomerForm
          formData={formData}
          errors={errors}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.layout.containerPadding,
    paddingBottom: sizes.spacing["2xl"],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: sizes.spacing.md,
  },
});

export default CustomerFormScreen;
