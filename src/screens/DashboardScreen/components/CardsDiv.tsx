import React from "react";
import { View, FlatList } from "react-native";
import AppText from "../../../components/AppText";
import { colors } from "../../../constants/colors";
import { sizes } from "../../../constants/sizes";
import Card from "./Card";
import { CardItem } from "../services";
import { styles } from "../styles";
import { MainStackParamList } from "../../../types/navigation/mainStackTypes";

interface CardsDivProps {
  title: string;
  cards: CardItem[];
}

const CardsDiv: React.FC<CardsDivProps> = ({ title, cards }) => {
  const renderCard = ({ item }: { item: CardItem }) => {
    console.log(item);
    return (
      <Card
        title={item.title}
        value={item.value}
        iconName={item.iconName}
        color={item.color}
        backgroundColor={item.backgroundColor}
        style={{ width: item.width }}
        pressable={true}
        onPress={item.onPress}
      />
    );
  };

  return (
    <View style={styles.cardsContainer}>
      <AppText variant="h4" bold style={{ width: "100%" }} color={colors.textSecondary}>
        {title}
      </AppText>
      <FlatList
        scrollEnabled={false}
        data={cards}
        renderItem={renderCard}
        keyExtractor={(_: any, index: number) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: sizes.spacing.md }}
      />
    </View>
  );
};

export default CardsDiv;
