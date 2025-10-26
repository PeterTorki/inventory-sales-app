import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.layout.containerPadding,
    paddingBottom: sizes.spacing["6xl"],
  },
  content: {
    paddingTop: sizes.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: sizes.spacing.md,
  },
  actionButtons: {
    marginTop: sizes.spacing.xl,
    gap: sizes.spacing.md,
  },
});
