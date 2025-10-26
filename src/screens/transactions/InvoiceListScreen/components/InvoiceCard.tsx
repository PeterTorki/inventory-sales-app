import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import ActionButtons from "../../../../components/ActionButtons";
import { colors } from "../../../../constants/colors";
import { Invoice } from "../../../../types";
import { invoiceCardStyles as styles } from "./styles";

interface InvoiceCardProps {
  invoice: Invoice;
  onView: (invoiceId: number) => void;
  onDelete: (invoice: Invoice) => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onView, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <TouchableOpacity style={styles.invoiceCard} onPress={() => onView(invoice.id)} activeOpacity={0.7}>
      <View style={styles.invoiceHeader}>
        <View style={styles.invoiceInfo}>
          <AppText variant="h5" bold numberOfLines={1}>
            {invoice.invoice_number}
          </AppText>
          <View style={styles.customerBadge}>
            <AppText variant="caption" color={colors.primary}>
              {invoice.customer_name || "Unknown Customer"}
            </AppText>
          </View>
        </View>

        <ActionButtons
          onEdit={() => onView(invoice.id)}
          onDelete={() => onDelete(invoice)}
          editIconName="eye-outline"
        />
      </View>

      <View style={styles.invoiceDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
            <AppText variant="body" color={colors.textSecondary} style={styles.detailText}>
              {formatDate(invoice.date)}
            </AppText>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={18} color={colors.success} />
            <AppText variant="body" color={colors.success} style={styles.detailText} bold>
              ${invoice.total.toFixed(2)}
            </AppText>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <AppText variant="caption" color={colors.textSecondary}>
              Subtotal: ${invoice.subtotal.toFixed(2)}
            </AppText>
          </View>
          <View style={styles.detailItem}>
            <AppText variant="caption" color={colors.textSecondary}>
              VAT: ${invoice.vat.toFixed(2)}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InvoiceCard;
