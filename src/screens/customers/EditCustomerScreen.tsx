import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EditCustomerScreenProps {
  // define your props here
}

const EditCustomerScreen: React.FC<EditCustomerScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>EditCustomerScreen Component</Text>
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

export default EditCustomerScreen;
