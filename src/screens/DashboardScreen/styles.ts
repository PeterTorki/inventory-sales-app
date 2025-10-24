import { StyleSheet } from "react-native";
import { sizes } from "../../constants/sizes";

export const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: sizes.layout.containerPadding,
    paddingVertical: sizes.spacing.md,
  },
});
