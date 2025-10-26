import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import EmptyState from "../../components/EmptyState";
import { Customer } from "../../types";
import { useSearch } from "../../hooks/useSearch";
import { CustomersStackParamList } from "../../types/navigation/customersStackTypes";
import { loadCustomers, handleDeleteCustomer } from "./CustomerListScreen/services";
import { styles } from "./CustomerListScreen/styles";
import CustomerCard from "./CustomerListScreen/components/CustomerCard";
import CustomerHeader from "./CustomerListScreen/components/CustomerHeader";

const CustomerListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<CustomersStackParamList>>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { query, handleSearch, clearSearch, filteredData } = useSearch(customers, ["name", "phone", "email"]);

  useFocusEffect(
    useCallback(() => {
      loadCustomers(setCustomers, setIsLoading);
    }, [])
  );

  const handleLoadCustomers = () => {
    loadCustomers(setCustomers, setIsLoading);
  };

  const handleEdit = (customer: Customer) => {
    navigation.navigate("EditCustomer", { customerId: customer.id });
  };

  const handleDelete = (customer: Customer) => {
    handleDeleteCustomer(customer, handleLoadCustomers);
  };

  return (
    <View style={styles.container}>
      <Header title="Customers" caption="Manage your customer database" hasBack={false} />

      <View style={styles.content}>
        <CustomerHeader
          query={query}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          filteredCount={filteredData.length}
          onAddCustomer={() => navigation.navigate("AddCustomer")}
        />

        <FlatList
          data={filteredData}
          renderItem={({ item }) => <CustomerCard item={item} onEdit={handleEdit} onDelete={handleDelete} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                iconName="people-outline"
                title="No customers yet"
                subtitle="Add your first customer to get started"
              />
            ) : null
          }
          contentContainerStyle={filteredData.length === 0 && !isLoading ? styles.emptyContainer : styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={handleLoadCustomers}
        />
      </View>
    </View>
  );
};

export default CustomerListScreen;
