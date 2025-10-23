import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ItemListScreenProps {
  // define your props here
}

const ItemListScreen: React.FC<ItemListScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>ItemListScreen Component</Text>
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

export default ItemListScreen;
