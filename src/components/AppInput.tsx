import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
// import { colors, spacing, borderRadius, typography, shadows } from "../styles/theme";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts";
import { sizes } from "../constants/sizes";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  error?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  error,
  required = false,
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = () => {
    return [
      styles.input,
      isFocused && !error && styles.inputFocused,
      error && styles.inputError,
      disabled && styles.inputDisabled,
      multiline && styles.multilineInput,
      leftIcon && styles.inputWithLeftIcon,
      rightIcon && styles.inputWithRightIcon,
    ].filter(Boolean);
  };

  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={styles.inputLabel}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Text style={styles.iconText}>{leftIcon}</Text>
          </View>
        )}
        <TextInput
          style={getInputStyle()}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === "email-address" ? "none" : "words"}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor={colors.textTertiary}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.rightIconContainer} onPress={onRightIconPress} disabled={!onRightIconPress}>
            <Text style={styles.iconText}>{rightIcon}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: sizes.spacing.lg,
  },
  inputLabel: {
    ...typography.label,
    color: colors.text,
    marginBottom: sizes.spacing.sm,
  },
  required: {
    color: colors.error,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.md,
    padding: sizes.spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
    flex: 1,
    ...typography.body,
  },
  inputFocused: {
    borderColor: colors.focus,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  inputDisabled: {
    backgroundColor: colors.borderLight,
    color: colors.textTertiary,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: sizes.spacing.md,
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  leftIconContainer: {
    position: "absolute",
    left: sizes.spacing.md,
    zIndex: 1,
    paddingRight: sizes.spacing.sm,
  },
  rightIconContainer: {
    position: "absolute",
    right: sizes.spacing.md,
    zIndex: 1,
    paddingLeft: sizes.spacing.sm,
  },
  iconText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: sizes.spacing.xs,
    marginLeft: sizes.spacing.xs,
  },
});

export default InputField;
