// src/layouts/HeaderWrapper.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

interface HeaderWrapperProps {
  header: React.ReactNode;
  children: React.ReactNode;
  headerBg?: string;
  contentBg?: string;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
  header,
  children,
  headerBg = colors.primary,
  contentBg = colors.background,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: contentBg }]}>
      <View style={[styles.headerContainer, { backgroundColor: headerBg }]}>{header}</View>
      <View style={styles.bodyContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
  },
});

export default HeaderWrapper;
