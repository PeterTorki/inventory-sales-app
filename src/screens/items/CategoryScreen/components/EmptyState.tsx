import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { emptyStateStyles as styles } from "./styles";

const EmptyState: React.FC = () => (
  <View style={styles.emptyState}>
    <Ionicons name="folder-open-outline" size={80} color={colors.textTertiary} />
    <AppText variant="h4" color={colors.textSecondary} style={styles.emptyText}>
      No categories yet
    </AppText>
    <AppText variant="body" color={colors.textTertiary} center style={styles.emptySubtext}>
      Add your first category to organize your items
    </AppText>
  </View>
);

export default EmptyState;
