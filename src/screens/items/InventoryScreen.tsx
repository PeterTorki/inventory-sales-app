import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface InventoryScreenProps {
  // define your props here
}

const InventoryScreen: React.FC<InventoryScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>InventoryScreen Component</Text>
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

export default InventoryScreen;
