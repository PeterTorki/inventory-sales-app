import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CustomerListScreenProps {
  // define your props here
}

const CustomerListScreen: React.FC<CustomerListScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>CustomerListScreen Component</Text>
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

export default CustomerListScreen;
