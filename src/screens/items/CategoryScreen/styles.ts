import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  content: {
    flex: 1,
    paddingHorizontal: sizes.layout.containerPadding,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: sizes.spacing.lg,
  },
  listContainer: { paddingBottom: sizes.spacing["6xl"] },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
