import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { sizes } from "../constants/sizes";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  editIconName?: keyof typeof Ionicons.glyphMap;
  deleteIconName?: keyof typeof Ionicons.glyphMap;
  editColor?: string;
  deleteColor?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  editIconName = "create-outline",
  deleteIconName = "trash-outline",
  editColor = colors.primaryDark,
  deleteColor = colors.error,
}) => (
  <View style={styles.actionButtons}>
    <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
      <Ionicons name={editIconName} size={22} color={editColor} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
      <Ionicons name={deleteIconName} size={22} color={deleteColor} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    gap: sizes.spacing.sm,
  },
  iconButton: {
    padding: sizes.spacing.xs,
  },
});

export default ActionButtons;
