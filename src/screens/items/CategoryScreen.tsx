import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CategoryScreenProps {
  // define your props here
}

const CategoryScreen: React.FC<CategoryScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>CategoryScreen Component</Text>
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

export default CategoryScreen;
