import React from "react";
import { View, Pressable } from "react-native";
import AppText from "../../../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { sizes } from "../../../constants/sizes";
import { colors } from "../../../constants/colors";
import { typography } from "../../../constants/fonts";
import { CardProps } from "../../../types/dashboardTypes";
import { cardStyles as styles } from "./styles";

const Card: React.FC<CardProps> = ({
  title,
  value,
  caption,
  iconName,
  color = "primary",
  backgroundColor = "background",
  style,
  pressable = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!pressable}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors[backgroundColor as keyof typeof colors] || backgroundColor,
          transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
          opacity: pressed ? 0.95 : 1,
        },
        style,
      ]}>
      <AppText
        variant="h5"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontWeight: typography.body.fontWeight,
        }}>
        {title}
      </AppText>

      <View style={styles.row}>
        <Ionicons
          name={iconName}
          size={40}
          color={colors[color as keyof typeof colors] || color}
          style={{ marginRight: sizes.spacing.md }}
        />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <AppText variant="h1" bold numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.9}>
              {value}
            </AppText>
          </View>
        </View>
      </View>

      {caption && (
        <AppText variant="bodyLarge" center numberOfLines={1} ellipsizeMode="tail">
          {caption}
        </AppText>
      )}
    </Pressable>
  );
};

export default Card;
