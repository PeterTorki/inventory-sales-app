import React, { useState, useCallback } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import AppText from "../../../components/AppText";
import { colors } from "../../../constants/colors";
import { CreateInvoiceScreenProps } from "../../../types/navigation/transactionsStackTypes";
import { Customer, Item, InvoiceItem } from "../../../types";
import { loadFormData, validateForm, submitForm } from "./services";
import { styles } from "./styles";
import InvoiceForm from "./components/InvoiceForm";

const CreateInvoiceScreen: React.FC<CreateInvoiceScreenProps> = ({ navigation, route }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [formData, setFormData] = useState({
    customer_id: null as number | null,
    date: new Date().toISOString().split("T")[0],
    invoiceItems: [] as InvoiceItem[],
  });
  const [errors, setErrors] = useState({
    customer_id: "",
    items: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadFormData(setCustomers, setItems, setIsFetching, navigation);
    }, [])
  );

  const handleSubmit = () => {
    submitForm(formData, customers, setErrors, setIsLoading, navigation, () => validateForm(formData, setErrors));
  };

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Header title="Create Invoice" caption="Generate a new sales invoice" hasBack={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <AppText variant="body" color={colors.textSecondary} style={styles.loadingText}>
            Loading data...
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
      <Header title="Create Invoice" caption="Generate a new sales invoice" hasBack={true} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <InvoiceForm
          formData={formData}
          errors={errors}
          customers={customers}
          items={items}
          isLoading={isLoading}
          updateField={updateField}
          onSubmit={handleSubmit}
          onCancel={() => navigation.goBack()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateInvoiceScreen;
