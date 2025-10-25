import React from "react";
import { View, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { sizes } from "../../constants/sizes";
import Header from "../../components/Header";
import CardsDiv from "./components/CardsDiv";
import { useOverviewCards, useQuickActionCards } from "./services";

interface DashboardScreenProps {}

const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const overViewCards = useOverviewCards();
  const quickActionCards = useQuickActionCards();

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Header title="Dashboard" caption="Overview of your activities" hasBack={false} />
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
