import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";
import { hs } from "../../utils/metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flex: 1,
    borderTopRightRadius: sizes.radius["3xl"],
    borderTopLeftRadius: sizes.radius["3xl"],
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: sizes.spacing.lg,
    justifyContent: "space-between",
  },
  formCard: {
    backgroundColor: colors.surface,
    marginTop: sizes.spacing["2xl"],
    borderRadius: sizes.radius.xl,
    padding: sizes.layout.containerPadding,
    ...typography.shadow,
  },
  cardTitle: {
    marginBottom: sizes.spacing["2xl"],
  },
  inputContainer: {
    marginBottom: sizes.spacing.lg,
  },
  label: {
    marginBottom: sizes.spacing.sm,
  },
  inputWrapper: {
    height: sizes.input.m,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: sizes.radius.md,
    paddingHorizontal: sizes.spacing.md,
    justifyContent: "center",
  },
  inputWrapperError: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  input: {
    ...typography.body,
    color: colors.text,
    padding: 0,
  },
  errorText: {
    marginTop: sizes.spacing.xs,
    marginLeft: sizes.spacing.xs,
  },
  button: {
    backgroundColor: colors.primary,
    height: sizes.button.m,
    borderRadius: sizes.radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: sizes.spacing.md,
  },
  buttonDisabled: {
    backgroundColor: colors.secondary,
    opacity: 0.6,
  },
  footer: {
    marginTop: sizes.spacing["3xl"],
    paddingHorizontal: sizes.spacing["2xl"],
    paddingVertical: sizes.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignSelf: "flex-end",
    backgroundColor: colors.surface,
  },
  footerText: {
    textAlign: "center",
    lineHeight: 18,
    height: hs(36),
  },
});
