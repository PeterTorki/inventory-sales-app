import React from "react";
import { View } from "react-native";
import AppText from "../../../../components/AppText";
import ActionButtons from "../../../../components/ActionButtons";
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

    <ActionButtons onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
  </View>
);

export default CategoryItem;
