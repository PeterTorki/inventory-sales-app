// src/navigation/withSafeArea.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { hs } from "../utils/metrics";
import { colors } from "../constants/colors";

interface WithSafeAreaOptions {
  scrollable?: boolean;
  noPadding?: boolean;
  backgroundColor?: string;
}

export function withSafeArea(Component: React.ComponentType<any>, options?: WithSafeAreaOptions) {
  return function WrappedScreen(props: any) {
    const Container = View;
    const horizontalPadding = options?.noPadding ? 0 : hs(20);

    const sharedStyle = { flex: 1, backgroundColor: options?.backgroundColor || colors.background };

    return (
      <SafeAreaView style={sharedStyle} edges={["top"]}>
        <Container
          style={
            !options?.scrollable ? [sharedStyle, { paddingHorizontal: horizontalPadding }] : { padding: 0, margin: 0 }
          }>
          <Component {...props} />
        </Container>
      </SafeAreaView>
    );
  };
}
