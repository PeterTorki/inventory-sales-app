import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import EmptyState from "../../../components/EmptyState";
import { Invoice } from "../../../types";
import { TransactionsStackParamList } from "../../../types/navigation/transactionsStackTypes";
import { useSearch } from "../../../hooks/useSearch";
import { loadInvoices, handleDeleteInvoice } from "./services";
import { styles } from "./styles";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceCard from "./components/InvoiceCard";

const InvoiceListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TransactionsStackParamList>>();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { query, handleSearch, clearSearch, filteredData } = useSearch(invoices, ["invoice_number", "customer_name"]);

  useFocusEffect(
    useCallback(() => {
      loadInvoices(setInvoices, setIsLoading);
    }, [])
  );

  const handleLoadInvoices = () => {
    loadInvoices(setInvoices, setIsLoading);
  };

  const handleView = (invoiceId: number) => {
    navigation.navigate("InvoiceDetail", { invoiceId });
  };

  const handleDelete = (invoice: Invoice) => {
    handleDeleteInvoice(invoice, handleLoadInvoices);
  };

  return (
    <View style={styles.container}>
      <Header title="Invoices" caption="Manage sales transactions" hasBack={false} />

      <View style={styles.containerContent}>
        <InvoiceHeader
          query={query}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          filteredCount={filteredData.length}
          navigation={navigation}
        />

        <View style={styles.content}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <InvoiceCard invoice={item} onView={handleView} onDelete={handleDelete} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              !isLoading ? (
                <EmptyState
                  iconName="receipt-outline"
                  title="No invoices yet"
                  subtitle="Create your first invoice to get started"
                />
              ) : null
            }
            contentContainerStyle={
              filteredData.length === 0 && !isLoading ? styles.emptyContainer : styles.listContainer
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshing={isLoading}
            onRefresh={handleLoadInvoices}
          />
        </View>
      </View>
    </View>
  );
};

export default InvoiceListScreen;
