import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { Category } from "../../../../types";

interface CategoryItemProps {
  item: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onEdit, onDelete }) => (
  <View style={styles.categoryItem}>
    <View style={styles.categoryInfo}>
      <AppText variant="h5" bold>
        {item.name}
      </AppText>
    </View>

    <View style={styles.actionButtons}>
      <TouchableOpacity onPress={() => onEdit(item)} style={styles.iconButton}>
        <Ionicons name="create-outline" size={24} color={colors.primaryDark} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(item)} style={styles.iconButton}>
        <Ionicons name="trash-outline" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: colors.divider,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryInfo: { flex: 1 },
  actionButtons: {
    flexDirection: "row",
    gap: sizes.spacing.md,
  },
  iconButton: { padding: sizes.spacing.sm },
});

export default CategoryItem;
