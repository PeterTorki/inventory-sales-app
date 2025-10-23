import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CreateInvoiceScreenProps {
  // define your props here
}

const CreateInvoiceScreen: React.FC<CreateInvoiceScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>CreateInvoiceScreen Component</Text>
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

export default CreateInvoiceScreen;
