import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { typography } from "../../../../constants/fonts";

export const inventoryHeaderStyles = StyleSheet.create({
  listHeader: { marginVertical: sizes.spacing.lg },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.sm,
    marginTop: sizes.spacing.md,
  },
  statCard: {
    flex: 1,
    padding: sizes.spacing.md,
    borderRadius: sizes.radius.lg,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: typography.body.fontSize,
    color: colors.text,
    padding: 0,
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
  },
  itemInfo: { flex: 1, marginRight: sizes.spacing.md },
  categoryBadge: {
    backgroundColor: colors.primaryLight + "30",
    paddingHorizontal: sizes.spacing.sm,
    paddingVertical: 4,
    borderRadius: sizes.radius.sm,
    marginTop: sizes.spacing.xs,
    alignSelf: "flex-start",
  },
  iconButton: { padding: sizes.spacing.xs },
  itemDetails: { marginTop: sizes.spacing.sm },
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
  stockBadge: {
    marginTop: sizes.spacing.sm,
    paddingHorizontal: sizes.spacing.md,
    paddingVertical: 4,
    borderRadius: sizes.radius.md,
    alignSelf: "flex-start",
  },
});

export const adjustModalStyles = StyleSheet.create({
  modalSubtitle: { marginBottom: sizes.spacing.md },
  currentStockInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: sizes.spacing.md,
    borderRadius: sizes.radius.md,
    marginBottom: sizes.spacing.lg,
  },
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
