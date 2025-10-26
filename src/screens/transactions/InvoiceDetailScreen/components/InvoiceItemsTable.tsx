import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { InvoiceItem } from "../../../../types";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
}

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({ items }) => {
  return (
    <View style={styles.card}>
      <AppText variant="h4" bold style={styles.cardTitle}>
        Items
      </AppText>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, styles.itemNameCell]}>
            <AppText variant="caption" bold color={colors.textSecondary}>
              Item
            </AppText>
          </View>
          <View style={styles.tableCell}>
            <AppText variant="caption" bold color={colors.textSecondary}>
              Qty
            </AppText>
          </View>
          <View style={styles.tableCell}>
            <AppText variant="caption" bold color={colors.textSecondary}>
              Price
            </AppText>
          </View>
          <View style={styles.tableCell}>
            <AppText variant="caption" bold color={colors.textSecondary}>
              Total
            </AppText>
          </View>
        </View>

        {/* Table Body */}
        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, styles.itemNameCell]}>
              <AppText variant="body" numberOfLines={2}>
                {item.item_name}
              </AppText>
            </View>
            <View style={styles.tableCell}>
              <AppText variant="body">{item.quantity}</AppText>
            </View>
            <View style={styles.tableCell}>
              <AppText variant="body">${item.price.toFixed(2)}</AppText>
            </View>
            <View style={styles.tableCell}>
              <AppText variant="body" bold color={colors.primary}>
                ${item.extended_amount.toFixed(2)}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.xl,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    marginBottom: sizes.spacing.lg,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.radius.md,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableHeader: {
    backgroundColor: colors.primaryLight + "10",
  },
  tableCell: {
    flex: 1,
    padding: sizes.spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  itemNameCell: {
    flex: 2,
    alignItems: "flex-start",
  },
});

export default InvoiceItemsTable;
