import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AddItemScreenProps {
  // define your props here
}

const AddItemScreen: React.FC<AddItemScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>AddItemScreen Component</Text>
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

export default AddItemScreen;
