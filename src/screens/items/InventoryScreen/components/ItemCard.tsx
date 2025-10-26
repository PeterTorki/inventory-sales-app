import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { Item } from "../../../../types";
import { itemCardStyles as styles } from "./styles";

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

export default ItemCard;
