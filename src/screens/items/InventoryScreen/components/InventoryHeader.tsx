import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppInput from "../../../../components/AppInput";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { inventoryHeaderStyles as styles } from "./styles";

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

export default InventoryHeader;
