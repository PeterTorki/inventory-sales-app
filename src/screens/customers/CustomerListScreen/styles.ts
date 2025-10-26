import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: sizes.layout.containerPadding,
  },
  header: {
    marginVertical: sizes.spacing.lg,
  },
  resultCount: {
    marginTop: sizes.spacing.sm,
  },
  listContainer: {
    paddingBottom: sizes.spacing["2xl"],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
