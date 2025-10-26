import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import ActionButtons from "../../../../components/ActionButtons";
import { colors } from "../../../../constants/colors";
import { Customer } from "../../../../types";
import { customerCardStyles as styles } from "./styles";

interface CustomerCardProps {
  item: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ item, onEdit, onDelete }) => (
  <View style={styles.customerCard}>
    <View style={styles.customerHeader}>
      <View style={styles.customerInfo}>
        <AppText variant="h5" bold numberOfLines={1}>
          {item.name}
        </AppText>
        <View style={styles.contactInfo}>
          <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={16} color={colors.textSecondary} />
            <AppText variant="body" color={colors.textSecondary} style={styles.contactText}>
              {item.phone}
            </AppText>
          </View>
          {item.email && (
            <View style={styles.contactRow}>
              <Ionicons name="mail-outline" size={16} color={colors.textSecondary} />
              <AppText variant="body" color={colors.textSecondary} style={styles.contactText} numberOfLines={1}>
                {item.email}
              </AppText>
            </View>
          )}
        </View>
      </View>

      <ActionButtons onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
    </View>
  </View>
);

export default CustomerCard;
