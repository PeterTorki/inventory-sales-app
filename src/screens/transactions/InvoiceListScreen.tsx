import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface InvoiceListScreenProps {
  // define your props here
}

const InvoiceListScreen: React.FC<InvoiceListScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>InvoiceListScreen Component</Text>
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

export default InvoiceListScreen;
