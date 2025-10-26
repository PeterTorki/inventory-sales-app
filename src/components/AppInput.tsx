import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  DimensionValue,
} from "react-native";
import AppText from "./AppText";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts";
import { sizes } from "../constants/sizes";

export interface AppInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  hint?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: "outline" | "filled" | "underline";
  size?: "s" | "m" | "l";
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  width?: DimensionValue;
  radius?: keyof typeof sizes.radius;
  mt?: number;
  mb?: number;
  mh?: number;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  labelColor?: string;
  errorColor?: string;
  hintColor?: string;
  placeholderColor?: string;
  showCharacterCount?: boolean;
  maxLength?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  numberOfLines?: number;
  required?: boolean;
  autoFocus?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  hint,
  value,
  onChangeText,
  placeholder,
  variant = "outline",
  size = "m",
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  width = "100%",
  radius = "md",
  mt = 0,
  mb = sizes.spacing.lg,
  mh = 0,
  backgroundColor,
  borderColor,
  textColor,
  labelColor,
  errorColor,
  hintColor,
  placeholderColor,
  showCharacterCount = false,
  maxLength,
  containerStyle,
  inputStyle,
  labelStyle,
  multiline = false,
  numberOfLines = 1,
  required = false,
  autoFocus = false,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputHeight = multiline ? sizes.input[size] * (numberOfLines || 3) : sizes.input[size];

  const variantStyles = {
    outline: {
      bg: backgroundColor ?? colors.background,
      border: error ? errorColor ?? colors.error : isFocused ? colors.primary : borderColor ?? colors.border,
      borderWidth: 1.5,
    },
    filled: {
      bg: backgroundColor ?? colors.surface,
      border: error ? errorColor ?? colors.error : isFocused ? colors.primary : "transparent",
      borderWidth: isFocused || error ? 1.5 : 0,
    },
    underline: {
      bg: "transparent",
      border: error ? errorColor ?? colors.error : isFocused ? colors.primary : borderColor ?? colors.border,
      borderWidth: 0,
      borderBottomWidth: 1.5,
    },
  }[variant];

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View
      style={[
        {
          width,
          marginTop: mt,
          marginBottom: mb,
          marginHorizontal: mh,
        },
        containerStyle,
      ]}>
      {label && (
        <View style={styles.labelContainer}>
          <AppText variant="label" color={labelColor ?? colors.text} style={[styles.label, labelStyle]}>
            {label}
            {required && <AppText color={errorColor ?? colors.error}> *</AppText>}
          </AppText>
        </View>
      )}

      <View
        style={[
          {
            backgroundColor: disabled ? colors.shadowDark : variantStyles.bg,
            borderColor: disabled ? colors.border : variantStyles.border,
            borderWidth: variantStyles.borderWidth,
            borderBottomWidth: variant === "underline" ? variantStyles.borderWidth : variantStyles.borderWidth,
            borderRadius: variant === "underline" ? 0 : sizes.radius[radius],
            height: inputHeight,
            flexDirection: "row",
            alignItems: multiline ? "flex-start" : "center",
            paddingHorizontal: sizes.spacing.md,
            paddingVertical: multiline ? sizes.spacing.sm : 0,
            opacity: disabled ? 0.6 : 1,
          },
          error && styles.inputError,
        ]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TextInput
          style={[
            {
              flex: 1,
              ...typography.body,
              height: "auto",
              color: textColor ?? colors.text,
              padding: 0,
              textAlignVertical: multiline ? "top" : "center",
            },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor ?? colors.textTertiary}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoFocus={autoFocus}
          {...textInputProps}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress} style={styles.iconContainer}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.messageContainer}>
          {error ? (
            <AppText variant="caption" color={errorColor ?? colors.error} style={styles.errorText}>
              {error}
            </AppText>
          ) : hint ? (
            <AppText variant="caption" color={hintColor ?? colors.textTertiary} style={styles.hintText}>
              {hint}
            </AppText>
          ) : null}
        </View>

        {showCharacterCount && maxLength && (
          <AppText variant="caption" color={colors.textTertiary} style={styles.characterCount}>
            {value.length}/{maxLength}
          </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: sizes.spacing.sm,
  },
  label: {
    marginBottom: 0,
  },
  inputError: {
    backgroundColor: colors.errorLight,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: sizes.spacing.xs,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: sizes.spacing.xs,
    minHeight: 18,
  },
  messageContainer: {
    flex: 1,
  },
  errorText: {
    marginLeft: sizes.spacing.xs,
  },
  hintText: {
    marginLeft: sizes.spacing.xs,
  },
  characterCount: {
    marginLeft: sizes.spacing.sm,
  },
});

export default AppInput;
