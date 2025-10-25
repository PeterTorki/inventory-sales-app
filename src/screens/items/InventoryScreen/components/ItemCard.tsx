import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { Item } from "../../../../types";

interface ItemCardProps {
  item: Item;
  onAdjust: (item: Item) => void;
}

const getStockStatus = (quantity: number) => {
  if (quantity === 0) return { label: "OUT OF STOCK", color: colors.error, bg: colors.errorLight };
  if (quantity < 10) return { label: "LOW STOCK", color: colors.warning, bg: colors.warningLight };
  if (quantity < 50) return { label: "MODERATE", color: colors.info, bg: colors.infoLight };
  return { label: "GOOD STOCK", color: colors.success, bg: colors.successLight };
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onAdjust }) => {
  const status = getStockStatus(item.quantity);

  return (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemInfo}>
          <AppText variant="h5" bold numberOfLines={1}>
            {item.name}
          </AppText>
          <View style={styles.categoryBadge}>
            <AppText variant="caption" color={colors.primary}>
              {item.category_name || "No Category"}
            </AppText>
          </View>
        </View>

        <TouchableOpacity onPress={() => onAdjust(item)} style={styles.iconButton}>
          <Ionicons name="create-outline" size={22} color={colors.primaryDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="cube-outline" size={18} color={colors.textSecondary} />
            <AppText variant="body" color={colors.textSecondary}>
              Stock: {item.quantity}
            </AppText>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={18} color={colors.textSecondary} />
            <AppText variant="body" color={colors.textSecondary}>
              ${item.price.toFixed(2)}
            </AppText>
          </View>
        </View>

        <View style={[styles.stockBadge, { backgroundColor: status.bg }]}>
          <AppText variant="caption" color={status.color} bold>
            {status.label}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  itemInfo: { flex: 1, marginRight: sizes.spacing.md },
  categoryBadge: {
    backgroundColor: colors.primaryLight + "30",
    paddingHorizontal: sizes.spacing.sm,
    paddingVertical: 4,
    borderRadius: sizes.radius.sm,
    marginTop: sizes.spacing.xs,
    alignSelf: "flex-start",
  },
  iconButton: { padding: sizes.spacing.xs },
  itemDetails: { marginTop: sizes.spacing.sm },
  detailRow: { flexDirection: "row", justifyContent: "space-between", gap: sizes.spacing.md },
  detailItem: { flexDirection: "row", alignItems: "center", gap: sizes.spacing.xs, flex: 1 },
  stockBadge: {
    marginTop: sizes.spacing.sm,
    paddingHorizontal: sizes.spacing.md,
    paddingVertical: 4,
    borderRadius: sizes.radius.md,
    alignSelf: "flex-start",
  },
});

export default ItemCard;
