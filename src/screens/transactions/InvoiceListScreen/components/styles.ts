import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { typography } from "../../../../constants/fonts";
import { vs } from "../../../../utils/metrics";

export const invoiceHeaderStyles = StyleSheet.create({
  headerContainer: {
    marginVertical: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
  },
  buttonRow: {
    marginBottom: sizes.spacing.md,
  },
  countContainer: {
    paddingVertical: sizes.spacing.sm,
  },
});

export const invoiceCardStyles = StyleSheet.create({
  invoiceCard: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
    ...typography.shadow,
  },
  invoiceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: sizes.spacing.md,
  },
  invoiceInfo: {
    flex: 1,
    marginRight: sizes.spacing.md,
  },
  customerBadge: {
    backgroundColor: colors.primaryLight + "30",
    paddingHorizontal: sizes.spacing.sm,
    paddingVertical: vs(4),
    borderRadius: sizes.radius.sm,
    marginTop: sizes.spacing.xs,
    alignSelf: "flex-start",
  },
  invoiceDetails: {
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
