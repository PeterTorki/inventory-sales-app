import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LoginScreenProps {
  // define your props here
}

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
