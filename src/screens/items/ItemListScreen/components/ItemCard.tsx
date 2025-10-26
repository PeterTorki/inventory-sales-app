import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { Item } from "../../../../types";
import { itemCardStyles as styles } from "./styles";

interface ItemCardProps {
  item: Item;
  onEdit: (itemId: number) => void;
  onDelete: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => (
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

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.iconButton}>
          <Ionicons name="create-outline" size={22} color={colors.primaryDark} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item)} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={22} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.itemDetails}>
      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={18} color={colors.textSecondary} />
          <AppText variant="body" color={colors.textSecondary} style={styles.detailText}>
            Price: ${item.price.toFixed(2)}
          </AppText>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="cube-outline" size={18} color={colors.textSecondary} />
          <AppText variant="body" color={colors.textSecondary} style={styles.detailText}>
            Stock: {item.quantity}
          </AppText>
        </View>
      </View>
    </View>
  </View>
);

export default ItemCard;
