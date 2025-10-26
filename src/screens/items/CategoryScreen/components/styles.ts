import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { typography } from "../../../../constants/fonts";

export const categoryItemStyles = StyleSheet.create({
  categoryItem: {
    backgroundColor: colors.divider,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...typography.shadow,
  },
  categoryInfo: { flex: 1 },
  actionButtons: {
    flexDirection: "row",
    gap: sizes.spacing.md,
  },
  iconButton: { padding: sizes.spacing.sm },
});

export const categoryModalStyles = StyleSheet.create({
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
    marginTop: sizes.spacing.md,
  },
});

export const emptyStateStyles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sizes.spacing["4xl"],
  },
  emptyText: { marginTop: sizes.spacing.lg },
  emptySubtext: {
    marginTop: sizes.spacing.sm,
    paddingHorizontal: sizes.spacing["2xl"],
  },
});
