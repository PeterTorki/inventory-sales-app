import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { typography } from "../../../../constants/fonts";

// CustomerCard styles
export const customerCardStyles = StyleSheet.create({
  customerCard: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
    ...typography.shadow,
  },
  customerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  customerInfo: {
    flex: 1,
    marginRight: sizes.spacing.md,
  },
  contactInfo: {
    marginTop: sizes.spacing.sm,
    gap: sizes.spacing.xs,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.spacing.xs,
  },
  contactText: {
    fontSize: typography.bodySmall.fontSize,
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: sizes.spacing.sm,
  },
  iconButton: {
    padding: sizes.spacing.xs,
  },
});

// CustomerHeader styles
export const customerHeaderStyles = StyleSheet.create({
  header: {
    marginVertical: sizes.spacing.lg,
  },
  resultCount: {
    marginTop: sizes.spacing.sm,
  },
});

// EmptyState styles
export const emptyStateStyles = StyleSheet.create({
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
