import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppSearch from "../../../../components/AppSearch";
import AppButton from "../../../../components/AppButton";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { customerHeaderStyles as styles } from "./styles";

interface CustomerHeaderProps {
  query: string;
  handleSearch: (text: string) => void;
  clearSearch: () => void;
  filteredCount: number;
  onAddCustomer: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  query,
  handleSearch,
  clearSearch,
  filteredCount,
  onAddCustomer,
}) => (
  <View style={styles.header}>
    <AppSearch query={query} handleSearch={handleSearch} clearSearch={clearSearch} />

    <AppButton
      title="Add Customer"
      onPress={onAddCustomer}
      size="m"
      color="text"
      backgroundColor="primary"
      icon={<Ionicons name="person-add-outline" size={20} color={colors.text} />}
    />

    <AppText variant="body" color={colors.textSecondary} style={styles.resultCount}>
      {filteredCount} {filteredCount === 1 ? "customer" : "customers"} found
    </AppText>
  </View>
);

export default CustomerHeader;
