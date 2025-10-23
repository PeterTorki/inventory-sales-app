import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface InvoiceDetailScreenProps {
  // define your props here
}

const InvoiceDetailScreen: React.FC<InvoiceDetailScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>InvoiceDetailScreen Component</Text>
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

export default InvoiceDetailScreen;
