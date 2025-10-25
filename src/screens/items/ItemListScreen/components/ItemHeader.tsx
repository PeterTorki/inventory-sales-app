// Inside same file, above ItemListScreen
import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppSearch from "../../../../components/AppSearch";
import AppButton from "../../../../components/AppButton";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";

interface ItemHeaderProps {
  query: string;
  handleSearch: (text: string) => void;
  clearSearch: () => void;
  filteredCount: number;
  navigation: any;
}

const ItemHeader = memo(({ query, handleSearch, clearSearch, filteredCount, navigation }: ItemHeaderProps) => {
  return (
    <View style={{ marginVertical: sizes.spacing.lg, marginBottom: sizes.spacing.md }}>
      <AppSearch query={query} handleSearch={handleSearch} clearSearch={clearSearch} />

      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: sizes.spacing.md,
            marginBottom: sizes.spacing.md,
          }}>
          <AppButton
            title="Categories"
            onPress={() => navigation.navigate("ItemsStack", { screen: "Category" })}
            variant="outline"
            size="s"
            width="48%"
            icon={<Ionicons name="folder-outline" size={18} color={colors.primaryDark} />}
          />
          <AppButton
            title="Inventory"
            onPress={() => navigation.navigate("ItemsStack", { screen: "Inventory" })}
            variant="outline"
            size="s"
            width="48%"
            icon={<Ionicons name="list-outline" size={18} color={colors.primaryDark} />}
          />
        </View>
        <AppButton
          title="Add Item"
          onPress={() => navigation.navigate("AddItem")}
          alignDirection="center"
          ph={sizes.spacing.lg}
          color="text"
          textVariant="bodyLarge"
          backgroundColor="primary"
          icon={<Ionicons name="add-circle-outline" size={20} color={colors.text} />}
        />
      </View>

      <View style={{ paddingVertical: sizes.spacing.sm }}>
        <AppText variant="body" color={colors.textSecondary}>
          {filteredCount} {filteredCount === 1 ? "item" : "items"} found
        </AppText>
      </View>
    </View>
  );
});

export default ItemHeader;
