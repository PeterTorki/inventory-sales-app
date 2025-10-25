import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppText from "./AppText";
import { colors } from "../constants/colors";
import { sizes } from "../constants/sizes";
import { hs } from "../utils/metrics";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  hasBack?: boolean;
  title?: string;
  caption?: string;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  hasBack = false,
  title = "Inventory & Sales App",
  caption = "Manage your inventory efficiently",
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingVertical: hasBack ? hs(20) : hs(12),
        paddingHorizontal: sizes.layout.containerPadding,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: sizes.spacing.sm,
          marginTop: !hasBack ? 0 : hs(40),
        }}>
        {hasBack && (
          <TouchableOpacity
            onPress={handleBackPress}
            style={{
              backgroundColor: colors.primaryDark,
              padding: hs(8),
              borderRadius: sizes.radius.md,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <AppText variant="h2" bold color={colors.text}>
            {title}
          </AppText>
          <AppText variant="body" color={colors.textSecondary}>
            {caption}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default Header;
