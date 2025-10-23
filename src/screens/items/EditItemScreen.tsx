import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EditItemScreenProps {
  // define your props here
}

const EditItemScreen: React.FC<EditItemScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>EditItemScreen Component</Text>
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

export default EditItemScreen;
