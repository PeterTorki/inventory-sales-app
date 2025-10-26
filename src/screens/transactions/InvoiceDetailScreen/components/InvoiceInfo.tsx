import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { InvoiceDetail } from "../../../../types";

interface InvoiceInfoProps {
  invoice: InvoiceDetail;
}

const InvoiceInfo: React.FC<InvoiceInfoProps> = ({ invoice }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <View style={styles.card}>
      <AppText variant="h4" bold style={styles.cardTitle}>
        Invoice Information
      </AppText>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="document-text-outline" size={20} color={colors.primary} />
          <View style={styles.infoContent}>
            <AppText variant="caption" color={colors.textSecondary}>
              Invoice Number
            </AppText>
            <AppText variant="body" bold>
              {invoice.invoice_number}
            </AppText>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <View style={styles.infoContent}>
            <AppText variant="caption" color={colors.textSecondary}>
              Date
            </AppText>
            <AppText variant="body" bold>
              {formatDate(invoice.date)}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.customerSection}>
        <Ionicons name="person-outline" size={20} color={colors.primary} />
        <View style={styles.infoContent}>
          <AppText variant="caption" color={colors.textSecondary}>
            Customer
          </AppText>
          <AppText variant="body" bold>
            {invoice.customer_name || "Unknown Customer"}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.xl,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    marginBottom: sizes.spacing.lg,
  },
  infoRow: {
    flexDirection: "row",
    gap: sizes.spacing.md,
    marginBottom: sizes.spacing.md,
  },
  infoItem: {
    flex: 1,
    flexDirection: "row",
    gap: sizes.spacing.sm,
    backgroundColor: colors.primaryLight + "10",
    padding: sizes.spacing.md,
    borderRadius: sizes.radius.md,
  },
  customerSection: {
    flexDirection: "row",
    gap: sizes.spacing.sm,
    backgroundColor: colors.primaryLight + "10",
    padding: sizes.spacing.md,
    borderRadius: sizes.radius.md,
  },
  infoContent: {
    flex: 1,
  },
});

export default InvoiceInfo;
