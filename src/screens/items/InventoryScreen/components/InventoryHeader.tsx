// InventoryHeader.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppInput from "../../../../components/AppInput";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";

interface InventoryHeaderProps {
  query: string;
  handleSearch: (text: string) => void;
  clearSearch: () => void;
  totalItems: number;
  outOfStock: number;
  lowStock: number;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  query,
  handleSearch,
  clearSearch,
  totalItems,
  outOfStock,
  lowStock,
}) => (
  <View style={styles.listHeader}>
    <AppInput
      value={query}
      onChangeText={handleSearch}
      placeholder="Search inventory..."
      inputStyle={styles.searchInput}
      leftIcon={<Ionicons name="search-outline" size={20} color={colors.textTertiary} />}
      rightIcon={
        query ? (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle-outline" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        ) : null
      }
    />

    <View style={styles.statsContainer}>
      <View style={[styles.statCard, { backgroundColor: colors.infoLight }]}>
        <AppText variant="h4" bold color={colors.info}>
          {totalItems}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          Total Items
        </AppText>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.errorLight }]}>
        <AppText variant="h4" bold color={colors.error}>
          {outOfStock}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          Out of Stock
        </AppText>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.warningLight }]}>
        <AppText variant="h4" bold color={colors.warning}>
          {lowStock}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          Low Stock
        </AppText>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  listHeader: { marginVertical: sizes.spacing.lg },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.sm,
    marginTop: sizes.spacing.md,
  },
  statCard: {
    flex: 1,
    padding: sizes.spacing.md,
    borderRadius: sizes.radius.lg,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0,
  },
});

export default InventoryHeader;

// ================================================

// ItemCard.tsx
