import React, { memo } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

interface AppSearchProps {
  query: string;
  handleSearch: (text: string) => void;
  clearSearch: () => void;
}

const AppSearch = ({ query, handleSearch, clearSearch }: AppSearchProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 10,
        marginBottom: 10,
      }}>
      <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Search..."
        style={{
          flex: 1,
          padding: 8,
          fontSize: 16,
          color: colors.text,
        }}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {query ? (
        <TouchableOpacity onPress={clearSearch}>
          <Ionicons name="close-circle-outline" size={20} color={colors.textTertiary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default memo(AppSearch);
