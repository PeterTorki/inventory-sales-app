import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import ActionButtons from "../../../../components/ActionButtons";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { InvoiceItem } from "../../../../types";

interface InvoiceItemsListProps {
  items: InvoiceItem[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const InvoiceItemsList: React.FC<InvoiceItemsListProps> = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={48} color={colors.textTertiary} />
        <AppText variant="body" color={colors.textSecondary} style={styles.emptyText}>
          No items added yet
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={styles.itemInfo}>
              <AppText variant="body" bold numberOfLines={1}>
                {item.item_name}
              </AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                ${item.price.toFixed(2)} × {item.quantity}
              </AppText>
            </View>
            <View style={styles.itemRight}>
              <AppText variant="body" bold color={colors.primary}>
                ${item.extended_amount.toFixed(2)}
              </AppText>
              <ActionButtons onEdit={() => onEdit(index)} onDelete={() => onDelete(index)} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: sizes.spacing.sm,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sizes.spacing["2xl"],
    backgroundColor: colors.background,
    borderRadius: sizes.radius.lg,
  },
  emptyText: {
    marginTop: sizes.spacing.md,
  },
  itemCard: {
    backgroundColor: colors.background,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
    marginRight: sizes.spacing.md,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.spacing.md,
  },
});

export default InvoiceItemsList;
