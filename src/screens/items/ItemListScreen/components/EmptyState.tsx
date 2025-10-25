import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";

const EmptyState: React.FC = () => (
  <View style={styles.emptyState}>
    <Ionicons name="cube-outline" size={80} color={colors.textTertiary} />
    <AppText variant="h4" color={colors.textSecondary} style={styles.emptyText}>
      No items yet
    </AppText>
    <AppText variant="body" color={colors.textTertiary} center style={styles.emptySubtext}>
      Add your first item to get started
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
