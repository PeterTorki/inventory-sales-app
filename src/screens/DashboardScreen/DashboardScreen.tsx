import React from "react";
import { View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import Header from "../../components/Header";
import CardsDiv from "./components/CardsDiv";
import { useOverviewCards, useQuickActionCards } from "./services";
import { useAuth } from "../../context/AuthContext";
import AppButton from "../../components/AppButton";
import { styles } from "./styles";
import { Alert } from "react-native";

interface DashboardScreenProps {}

const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const overViewCards = useOverviewCards();
  const quickActionCards = useQuickActionCards();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Dashboard"
        caption="Overview of your activities"
        hasBack={false}
        rightElement={
          <AppButton
            onPress={handleLogout}
            variant="outline"
            icon={<Ionicons name="log-out-outline" size={24} color={colors.error} />}
            style={{ borderColor: colors.error, borderWidth: 1, backgroundColor: colors.errorLight }}
            width="auto"
          />
        }
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <CardsDiv title="Overview" cards={overViewCards} />
        <CardsDiv title="Quick Actions" cards={quickActionCards} />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
