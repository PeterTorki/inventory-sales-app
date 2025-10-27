import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

export interface CardItem {
  title: string;
  value: string | number;
  iconName: keyof typeof Ionicons.glyphMap;
  color?: keyof typeof colors | string;
  backgroundColor?: keyof typeof colors | string;
  width: number | string;
  onPress?: () => void;
}

export interface CardProps {
  title: string;
  value: string | number;
  caption?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color?: keyof typeof colors | string;
  backgroundColor?: keyof typeof colors | string;
  style?: any;
  pressable?: boolean;
  onPress?: () => void;
}
