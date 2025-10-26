import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  containerContent: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
    paddingHorizontal: sizes.layout.containerPadding,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: sizes.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
