import React from "react";
import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";
import { typography } from "../constants/fonts";
import { colors } from "../constants/colors";

type TypographyVariant = keyof typeof typography;

interface AppTextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  center?: boolean;
  uppercase?: boolean;
  bold?: boolean;
  style?: StyleProp<TextStyle>;

  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  variant = "body",
  color = colors.text,
  center = false,
  uppercase = false,
  bold = false,
  style,
  numberOfLines,
  ellipsizeMode,
  adjustsFontSizeToFit = false,
  minimumFontScale = 0.8,
}) => {
  const baseTypography = (typography[variant] ?? typography.body) as TextStyle;

  const textStyle: TextStyle = {
    ...baseTypography,
    color,
    textAlign: center ? "center" : "auto",
    fontWeight: bold ? "700" : baseTypography.fontWeight ?? "400",
    textTransform: uppercase ? "uppercase" : "none",
  };

  const combinedStyle = StyleSheet.flatten([textStyle, style]) as TextStyle;

  return (
    <Text
      style={combinedStyle}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}>
      {children}
    </Text>
  );
};

export default AppText;
