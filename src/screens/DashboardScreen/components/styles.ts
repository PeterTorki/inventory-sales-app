import { StyleSheet } from "react-native";
import { sizes } from "../../../constants/sizes";
import { colors } from "../../../constants/colors";

export const cardStyles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: sizes.radius["2xl"],
    gap: sizes.spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
});
