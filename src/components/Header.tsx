import React from "react";
import { View } from "react-native";
import AppText from "./AppText";
import { colors } from "../constants/colors";
import { sizes } from "../constants/sizes";
import { hs } from "../utils/metrics";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "./AppButton";

const Header: React.FC<{ hasBack?: boolean }> = ({ hasBack = false }) => {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingVertical: hs(20),
        paddingHorizontal: sizes.layout.containerPadding,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: sizes.spacing.sm,
        }}>
        {hasBack && (
          <AppButton
            ph={0}
            pv={0}
            size="s"
            width={40}
            radius="md"
            style={{
              backgroundColor: colors.primaryDark,
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={<Ionicons name="arrow-back" size={30} color={colors.textSecondary} />}
            onPress={() => {}}
          />
        )}
        <AppText variant="h2" bold color={colors.text}>
          Inventory & Sales App
        </AppText>
      </View>
      <AppText variant="body" color={colors.textSecondary}>
        Need help managing your app?
      </AppText>
    </View>
  );
};

export default Header;
