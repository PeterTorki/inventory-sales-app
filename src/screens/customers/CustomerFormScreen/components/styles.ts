import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { typography } from "../../../../constants/fonts";

export const customerFormStyles = StyleSheet.create({
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius["2xl"],
    padding: sizes.spacing.xl,
    marginTop: sizes.spacing.lg,
    ...typography.shadow,
  },
  sectionTitle: {
    marginBottom: sizes.spacing.lg,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
    marginTop: sizes.spacing.xl,
  },
});
