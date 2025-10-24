import React from "react";
import { View } from "react-native";
import AppText from "../../../components/AppText";
import { colors } from "../../../constants/colors";
import { styles } from "../styles";

const LoginFooter: React.FC = () => {
  return (
    <View style={styles.footer}>
      <AppText variant="caption" color={colors.textTertiary} style={styles.footerText}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </AppText>
    </View>
  );
};

export default LoginFooter;
