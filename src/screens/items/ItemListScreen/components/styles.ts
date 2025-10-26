import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { typography } from "../../../../constants/fonts";
import { vs } from "../../../../utils/metrics";

export const itemHeaderStyles = StyleSheet.create({
  headerContainer: {
    marginVertical: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
  },
  buttonRow: {
    flexDirection: "column",
  },
  topButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
    marginBottom: sizes.spacing.md,
  },
  countContainer: {
    paddingVertical: sizes.spacing.sm,
  },
});

export const itemCardStyles = StyleSheet.create({
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
    ...typography.shadow,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: sizes.spacing.md,
  },
  itemInfo: {
    flex: 1,
    marginRight: sizes.spacing.md,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight + "30",
    paddingHorizontal: sizes.spacing.sm,
    paddingVertical: vs(4),
    borderRadius: sizes.radius.sm,
    marginTop: sizes.spacing.xs,
    alignSelf: "flex-start",
  },
  actionButtons: {
    flexDirection: "row",
    gap: sizes.spacing.sm,
  },
  iconButton: {
    padding: sizes.spacing.xs,
  },
  itemDetails: {
    gap: sizes.spacing.sm,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.spacing.xs,
    flex: 1,
  },
  detailText: {
    fontSize: typography.bodySmall.fontSize,
  },
});

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
