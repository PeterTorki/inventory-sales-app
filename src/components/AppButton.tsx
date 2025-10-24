import React from "react";
import { TouchableOpacity, ActivityIndicator, StyleProp, ViewStyle, DimensionValue, View } from "react-native";
import AppText from "./AppText";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts";
import { sizes } from "../constants/sizes";
import { TextStyle } from "react-native";

interface AppButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "s" | "m" | "l";
  color?: string;
  backgroundColor?: string;
  radius?: keyof typeof sizes.radius;
  width?: DimensionValue;
  mt?: number;
  mb?: number;
  mh?: number;
  ph?: number;
  pv?: number;
  center?: boolean;
  icon?: React.ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  alignDirection?: "center" | "flex-start" | "flex-end";
  textVariant?: keyof typeof typography;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "m",
  color,
  backgroundColor,
  radius = "md",
  width = "100%",
  mt = 0,
  mb = 0,
  mh = 0,
  ph,
  pv,
  center = true,
  icon,
  gap = 8,
  style,
  children,
  textStyle,
  alignDirection,
  textVariant,
}) => {
  const buttonHeight = sizes.button[size];

  const variantStyles = {
    primary: {
      bg: backgroundColor ?? colors.primary,
      text: color ?? colors.textInverse,
      borderColor: "transparent",
    },
    secondary: {
      bg: backgroundColor ?? colors.secondary,
      text: color ?? colors.textInverse,
      borderColor: "transparent",
    },
    outline: {
      bg: "transparent",
      text: color ?? colors.primary,
      borderColor: colors.primary,
    },
    text: {
      bg: "transparent",
      text: color ?? colors.primary,
      borderColor: "transparent",
    },
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor: disabled ? colors.textTertiary : variantStyles.bg,
          borderWidth: variant === "outline" ? 1.5 : 0,
          borderColor: variantStyles.borderColor,
          borderRadius: sizes.radius[radius],
          width,
          height: buttonHeight,
          justifyContent: alignDirection,
          alignItems: "center",
          flexDirection: "row",
          marginTop: mt,
          marginBottom: mb,
          marginHorizontal: mh,
          paddingHorizontal: ph ?? sizes.spacing.lg,
          paddingVertical: pv ?? sizes.spacing.sm,
          opacity: disabled ? 0.6 : 1,
          alignSelf: center ? "center" : "auto",
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variantStyles.text} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            gap,
          }}>
          {icon}
          {children ? (
            children
          ) : title ? (
            <AppText variant={textVariant} style={textStyle} color={variantStyles.text} center>
              {title}
            </AppText>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
