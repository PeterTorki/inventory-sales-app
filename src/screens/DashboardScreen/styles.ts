import { StyleSheet } from "react-native";
import { sizes } from "../../constants/sizes";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
  },
  scrollContent: {
    paddingBottom: sizes.spacing.lg,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: sizes.layout.containerPadding,
    paddingVertical: sizes.spacing.md,
  },
});
