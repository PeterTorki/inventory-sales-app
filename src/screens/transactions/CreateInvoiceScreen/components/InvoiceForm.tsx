import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../../components/AppText";
import AppInput from "../../../../components/AppInput";
import AppButton from "../../../../components/AppButton";
import ReusableDropdown from "../../../../components/ReusableDropdown";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { Customer, Item, InvoiceItem } from "../../../../types";
import InvoiceItemsList from "./InvoiceItemsList";
import AddItemModal from "./AddItemModal";

interface InvoiceFormProps {
  formData: {
    customer_id: number | null;
    date: string;
    invoiceItems: InvoiceItem[];
  };
  errors: {
    customer_id: string;
    items: string;
  };
  customers: Customer[];
  items: Item[];
  isLoading: boolean;
  updateField: (field: string, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  formData,
  errors,
  customers,
  items,
  isLoading,
  updateField,
  onSubmit,
  onCancel,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const customerItems = customers.map((customer) => ({
    label: customer.name,
    value: customer.id,
  }));

  const availableItems = items.filter((item) => item.quantity > 0);

  const handleAddItem = () => {
    if (availableItems.length === 0) {
      Alert.alert("No Items Available", "All items are out of stock. Please add more inventory.");
      return;
    }
    setEditingItemIndex(null);
    setIsModalVisible(true);
  };

  const handleEditItem = (index: number) => {
    setEditingItemIndex(index);
    setIsModalVisible(true);
  };

  const handleSaveItem = (item: { item_id: number; quantity: number }) => {
    const selectedItem = items.find((i) => i.id === item.item_id);
    if (!selectedItem) return;

    // Check if quantity exceeds available stock
    if (item.quantity > selectedItem.quantity) {
      Alert.alert("Insufficient Stock", `Only ${selectedItem.quantity} units available in stock`);
      return;
    }

    const newInvoiceItem: InvoiceItem = {
      id: editingItemIndex !== null ? formData.invoiceItems[editingItemIndex].id : Date.now(),
      invoice_id: 0,
      item_id: item.item_id,
      item_name: selectedItem.name,
      quantity: item.quantity,
      price: selectedItem.price,
      extended_amount: item.quantity * selectedItem.price,
    };

    let updatedItems = [...formData.invoiceItems];

    if (editingItemIndex !== null) {
      updatedItems[editingItemIndex] = newInvoiceItem;
    } else {
      // Check if item already exists
      const existingIndex = updatedItems.findIndex((i) => i.item_id === item.item_id);
      if (existingIndex >= 0) {
        const totalQuantity = updatedItems[existingIndex].quantity + item.quantity;
        if (totalQuantity > selectedItem.quantity) {
          Alert.alert("Insufficient Stock", `Only ${selectedItem.quantity} units available in stock`);
          return;
        }
        updatedItems[existingIndex].quantity = totalQuantity;
        updatedItems[existingIndex].extended_amount = totalQuantity * selectedItem.price;
      } else {
        updatedItems.push(newInvoiceItem);
      }
    }

    updateField("invoiceItems", updatedItems);
    setIsModalVisible(false);
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = formData.invoiceItems.filter((_, i) => i !== index);
    updateField("invoiceItems", updatedItems);
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      updateField("date", formattedDate);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateTotals = () => {
    const subtotal = formData.invoiceItems.reduce((sum, item) => sum + item.extended_amount, 0);
    const vat = subtotal * 0.14;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const { subtotal, vat, total } = calculateTotals();

  return (
    <View style={styles.formCard}>
      <AppText variant="h4" bold style={styles.sectionTitle}>
        Invoice Information
      </AppText>

      <View style={{ marginBottom: sizes.spacing.md }}>
        <AppText variant="body" style={styles.label}>
          Customer *
        </AppText>
        <ReusableDropdown
          value={formData.customer_id ? customers.find((c) => c.id === formData.customer_id)?.name || "" : ""}
          data={customerItems}
          onChange={(item) => {
            updateField("customer_id", typeof item.value === "string" ? parseInt(item.value) : item.value);
          }}
          placeholder="Select customer"
          dropInDirection="column"
        />
        {errors.customer_id ? (
          <AppText variant="body" color={colors.error} style={styles.errorText}>
            {errors.customer_id}
          </AppText>
        ) : null}
      </View>

      <View style={{ marginBottom: sizes.spacing.md }}>
        <AppText variant="body" style={styles.label}>
          Date *
        </AppText>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker((prev) => !prev)}
          activeOpacity={0.7}>
          <AppText variant="body" style={styles.dateText}>
            {formatDisplayDate(formData.date)}
          </AppText>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        {showDatePicker && (
          <View style={Platform.OS === "ios" ? styles.datePickerContainer : undefined}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
              textColor={colors.text}
              accentColor={colors.primary}
              themeVariant="light"
            />
          </View>
        )}

        {Platform.OS === "ios" && showDatePicker && (
          <View style={styles.iosDatePickerButtons}>
            <AppButton title="Cancel" onPress={() => setShowDatePicker(false)} variant="outline" size="s" width="48%" />
            <AppButton title="Done" onPress={() => setShowDatePicker(false)} size="s" width="48%" />
          </View>
        )}
      </View>

      <View style={{ marginBottom: sizes.spacing.md }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: sizes.spacing.sm,
          }}>
          <AppText variant="h5" bold>
            Invoice Items
          </AppText>
          <AppButton
            title="Add Item"
            onPress={handleAddItem}
            size="s"
            icon={<Ionicons name="add-circle-outline" size={18} color={colors.text} />}
            width="auto"
            variant="primary"
            pv={sizes.icon.xs}
          />
        </View>

        {errors.items ? (
          <AppText variant="body" color={colors.error} style={styles.errorText}>
            {errors.items}
          </AppText>
        ) : null}

        <InvoiceItemsList items={formData.invoiceItems} onEdit={handleEditItem} onDelete={handleDeleteItem} />
      </View>

      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <AppText variant="body" color={colors.textSecondary}>
            Subtotal:
          </AppText>
          <AppText variant="body">${subtotal.toFixed(2)}</AppText>
        </View>
        <View style={styles.totalRow}>
          <AppText variant="body" color={colors.textSecondary}>
            VAT (14%):
          </AppText>
          <AppText variant="body">${vat.toFixed(2)}</AppText>
        </View>
        <View style={[styles.totalRow, styles.grandTotalRow]}>
          <AppText variant="h5" bold>
            Total:
          </AppText>
          <AppText variant="h5" bold color={colors.primary}>
            ${total.toFixed(2)}
          </AppText>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <AppButton title="Cancel" onPress={onCancel} variant="outline" width="48%" />
        <AppButton title="Create Invoice" onPress={onSubmit} loading={isLoading} disabled={isLoading} width="48%" />
      </View>

      <AddItemModal
        visible={isModalVisible}
        items={availableItems}
        editingItem={editingItemIndex !== null ? formData.invoiceItems[editingItemIndex] : null}
        onSave={handleSaveItem}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius["2xl"],
    padding: sizes.spacing.xl,
    marginTop: sizes.spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: sizes.spacing.lg,
  },
  label: {
    marginBottom: sizes.spacing.xs,
    fontWeight: "500",
  },
  errorText: {
    marginTop: sizes.spacing.xs,
  },
  itemsSection: {
    marginTop: sizes.spacing.lg,
    marginBottom: sizes.spacing.lg,
  },
  itemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: sizes.spacing.md,
  },
  totalsSection: {
    backgroundColor: colors.primaryLight + "10",
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.lg,
    marginBottom: sizes.spacing.lg,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: sizes.spacing.sm,
  },
  grandTotalRow: {
    marginTop: sizes.spacing.sm,
    paddingTop: sizes.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 0,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
    marginTop: sizes.spacing.xl,
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
    height: 48,
  },
  datePickerContainer: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.lg,
    padding: sizes.spacing.md,
    marginTop: sizes.spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateText: {
    flex: 1,
    color: colors.text,
  },
  iosDatePickerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
    marginTop: sizes.spacing.md,
    paddingTop: sizes.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default InvoiceForm;
