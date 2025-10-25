import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";
interface InvoiceDetailScreenProps {
  // define your props here
}

const InvoiceDetailScreen: React.FC<InvoiceDetailScreenProps> = (props) => {
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text>InvoiceDetailScreen Component</Text>
      <AppButton title="Logout" onPress={logout} 
        color="primaryDark"
      />
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
