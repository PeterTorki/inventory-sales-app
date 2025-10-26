import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { sizes } from "../constants/sizes";
import { typography } from "../constants/fonts";

/**
 * Shared card styles used across the application
 * For consistent card appearance in lists
 */
export const sharedCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.md,
    ...typography.shadow,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardInfo: {
    flex: 1,
    marginRight: sizes.spacing.md,
  },
});

/**
 * Shared form card styles
 * For consistent form appearance
 */
export const sharedFormStyles = StyleSheet.create({
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

/**
 * Shared list screen styles
 * For consistent list screen layouts
 */
export const sharedListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: sizes.layout.containerPadding,
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

/**
 * Shared header styles
 * For list headers with search and actions
 */
export const sharedHeaderStyles = StyleSheet.create({
  header: {
    marginVertical: sizes.spacing.lg,
  },
  resultCount: {
    marginTop: sizes.spacing.sm,
  },
});
