import React, { memo } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppSearch from "../../../../components/AppSearch";
import AppButton from "../../../../components/AppButton";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { invoiceHeaderStyles as styles } from "./styles";

interface InvoiceHeaderProps {
  query: string;
  handleSearch: (text: string) => void;
  clearSearch: () => void;
  filteredCount: number;
  navigation: any;
}

const InvoiceHeader = memo(({ query, handleSearch, clearSearch, filteredCount, navigation }: InvoiceHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <AppSearch query={query} handleSearch={handleSearch} clearSearch={clearSearch} />

      <View style={styles.buttonRow}>
        <AppButton
          title="Create Invoice"
          onPress={() => navigation.navigate("CreateInvoice")}
          alignDirection="center"
          ph={sizes.spacing.lg}
          color="text"
          textVariant="bodyLarge"
          backgroundColor="primary"
          icon={<Ionicons name="add-circle-outline" size={20} color={colors.text} />}
        />
      </View>

      <View style={styles.countContainer}>
        <AppText variant="body" color={colors.textSecondary}>
          {filteredCount} {filteredCount === 1 ? "invoice" : "invoices"} found
        </AppText>
      </View>
    </View>
  );
});

export default InvoiceHeader;
