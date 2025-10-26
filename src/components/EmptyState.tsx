import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import { colors } from "../constants/colors";
import { sizes } from "../constants/sizes";

interface EmptyStateProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ iconName, title, subtitle }) => (
  <View style={styles.emptyState}>
    <Ionicons name={iconName} size={80} color={colors.textTertiary} />
    <AppText variant="h4" color={colors.textSecondary} style={styles.emptyText}>
      {title}
    </AppText>
    <AppText variant="body" color={colors.textTertiary} center style={styles.emptySubtext}>
      {subtitle}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sizes.spacing["4xl"],
  },
  emptyText: {
    marginTop: sizes.spacing.lg,
  },
  emptySubtext: {
    marginTop: sizes.spacing.sm,
    paddingHorizontal: sizes.spacing["2xl"],
  },
});

export default EmptyState;
