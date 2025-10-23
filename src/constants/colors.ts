import { useState } from "react";

export const lightTheme = {
  primary: "#d1e400",
  secondary: "#444901",
  background: "#FFFFFF",
  text: "#000000",
  textSecondary: "#666666",
  textPlaceholder: "#A0A0A0",
  border: "#E0E0E0",
  error: "#FF3B30",
  warning: "#FF9500",
  success: "#4CD964",
  inputBackground: "#FFFFF",
  inputBorder: "#DADADA",
  gray: "#F5F5F5",
};
export const darkTheme = {
  primary: "#96a300",
  secondary: "#666d01",
  background: "#000000",
  text: "#FFFFFF",
  textSecondary: "#999999",
  textPlaceholder: "#666666",
  border: "#333333",
  error: "#FF453A",
  warning: "#FF9F0A",
  success: "#30D158",
  inputBackground: "#1C1C1E",
  inputBorder: "#3A3A3C",
  gray: "#2C2C2E",
};

export const useColors = (isDarkMode: boolean) => {
  const [colors, setColors] = useState(isDarkMode ? darkTheme : lightTheme);

  return colors;
};
