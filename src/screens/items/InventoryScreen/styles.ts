import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  containerContent: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: sizes.layout.containerPadding,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
  },
  content: {
    flex: 1,
  },
  listContainer: { paddingBottom: sizes.spacing["6xl"] },
  emptyContainer: { flex: 1 },
});
