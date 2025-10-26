import React, { useState, useCallback } from "react";
import { View, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import AppText from "../../../components/AppText";
import AppButton from "../../../components/AppButton";
import { colors } from "../../../constants/colors";
import { InvoiceDetailScreenProps } from "../../../types/navigation/transactionsStackTypes";
import { InvoiceDetail } from "../../../types";
import { loadInvoiceDetail, handleDeleteInvoice } from "./services";
import { styles } from "./styles";
import InvoiceInfo from "./components/InvoiceInfo";
import InvoiceItemsTable from "./components/InvoiceItemsTable";
import InvoiceSummary from "./components/InvoiceSummary";

const InvoiceDetailScreen: React.FC<InvoiceDetailScreenProps> = ({ navigation, route }) => {
  const { invoiceId } = route.params;
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadInvoiceDetail(invoiceId, setInvoice, setIsLoading, navigation);
    }, [invoiceId])
  );

  const handleDelete = () => {
    if (invoice) {
      handleDeleteInvoice(invoice, navigation);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Invoice Details" caption="View invoice information" hasBack={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <AppText variant="body" color={colors.textSecondary} style={styles.loadingText}>
            Loading invoice...
          </AppText>
        </View>
      </View>
    );
  }

  if (!invoice) {
    return (
      <View style={styles.container}>
        <Header title="Invoice Details" caption="View invoice information" hasBack={true} />
        <View style={styles.loadingContainer}>
          <AppText variant="body" color={colors.textSecondary}>
            Invoice not found
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Invoice Details" caption={invoice.invoice_number} hasBack={true} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <InvoiceInfo invoice={invoice} />
          <InvoiceItemsTable items={invoice.items} />
          <InvoiceSummary subtotal={invoice.subtotal} vat={invoice.vat} total={invoice.total} />

          <View style={styles.actionButtons}>
            <AppButton title="Delete Invoice" onPress={handleDelete} variant="outline" color="error" width="100%" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceDetailScreen;
