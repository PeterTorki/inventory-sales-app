import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { Category } from "../../../../types";
import { categoryItemStyles as styles } from "./styles";

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

export default CategoryItem;
