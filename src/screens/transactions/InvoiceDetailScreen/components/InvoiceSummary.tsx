import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";

interface InvoiceSummaryProps {
  subtotal: number;
  vat: number;
  total: number;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ subtotal, vat, total }) => {
  return (
    <View style={styles.card}>
      <AppText variant="h4" bold style={styles.cardTitle}>
        Summary
      </AppText>

      <View style={styles.summaryRow}>
        <AppText variant="body" color={colors.textSecondary}>
          Subtotal:
        </AppText>
        <AppText variant="body">${subtotal.toFixed(2)}</AppText>
      </View>

      <View style={styles.summaryRow}>
        <AppText variant="body" color={colors.textSecondary}>
          VAT (14%):
        </AppText>
        <AppText variant="body">${vat.toFixed(2)}</AppText>
      </View>

      <View style={[styles.summaryRow, styles.totalRow]}>
        <AppText variant="h5" bold>
          Total:
        </AppText>
        <AppText variant="h4" bold color={colors.primary}>
          ${total.toFixed(2)}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryLight + "10",
    borderRadius: sizes.radius.xl,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.lg,
  },
  cardTitle: {
    marginBottom: sizes.spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: sizes.spacing.md,
  },
  totalRow: {
    marginTop: sizes.spacing.md,
    paddingTop: sizes.spacing.lg,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    marginBottom: 0,
  },
});

export default InvoiceSummary;
