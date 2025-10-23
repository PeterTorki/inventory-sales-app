import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DashboardScreenProps {
  // define your props here
}

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>DashboardScreen Component</Text>
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

export default DashboardScreen;
