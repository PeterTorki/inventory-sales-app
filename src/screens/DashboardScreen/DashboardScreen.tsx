import React from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { sizes } from "../../constants/sizes";
import Header from "../../components/Header";
import CardsDiv from "./components/CardsDiv";
import { useOverviewCards, useQuickActionCards } from "./services";
import { useAuth } from "../../context/AuthContext";
import AppButton from "../../components/AppButton";

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
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
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
        style={{
          flex: 1,
          backgroundColor: colors.background,
          borderTopRightRadius: sizes.radius["3xl"],
          borderTopLeftRadius: sizes.radius["3xl"],
        }}
        contentContainerStyle={{ paddingBottom: sizes.spacing.lg }}
        showsVerticalScrollIndicator={false}>
        <CardsDiv title="Overview" cards={overViewCards} />
        <CardsDiv title="Quick Actions" cards={quickActionCards} />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
