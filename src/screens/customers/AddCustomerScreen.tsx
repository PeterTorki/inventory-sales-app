import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AddCustomerScreenProps {
  // define your props here
}

const AddCustomerScreen: React.FC<AddCustomerScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>AddCustomerScreen Component</Text>
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

export default AddCustomerScreen;
