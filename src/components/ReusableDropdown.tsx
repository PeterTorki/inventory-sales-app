import React, { useCallback, useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import AppText from "./AppText";

interface OptionItem {
  label: string;
  value: number;
}

interface ReusableDropdownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  searchable?: boolean;
  error?: string;
  dropInDirection: "row" | "column";
}

const ReusableDropdown = ({
  data,
  onChange,
  placeholder,
  value: propValue,
  disabled = false,
  searchable = false,
  dropInDirection,
  error,
}: ReusableDropdownProps) => {
  const [expanded, setExpanded] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const value = propValue ?? internalValue;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [data, searchQuery]);

  const toggleExpanded = useCallback(() => {
    if (disabled) return;
    setExpanded((prev) => !prev);
    if (!expanded) {
      setSearchQuery("");
    }
  }, [disabled, expanded]);

  const handleSelect = useCallback(
    (item: OptionItem) => {
      onChange(item);
      setInternalValue(item.label);
      setExpanded(false);
      setSearchQuery("");
    },
    [onChange]
  );

  const handleLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;

    event.target.measure((fx: number, fy: number, w: number, h: number, px: number, py: number) => {
      setDropdownPosition({
        top: py + h + 5,
        left: px,
        width: w,
      });
    });
  };

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <>
      <View style={{ flex: dropInDirection === "column" ? 0 : 1, height: "auto" }}>
        <TouchableOpacity
          style={[styles.button, disabled && styles.disabledButton, error && styles.errorButton]}
          activeOpacity={0.8}
          onPress={toggleExpanded}
          onLayout={handleLayout}
          disabled={disabled}>
          <AppText style={[styles.text, { color: value ? colors.text : colors.textTertiary }]}>
            {value || placeholder}
          </AppText>
          <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        {error ? (
          <View style={styles.errorContainer}>
            <AppText style={styles.errorText}>{error}</AppText>
          </View>
        ) : null}
      </View>

      <Modal visible={expanded} transparent animationType="fade" onRequestClose={() => setExpanded(false)}>
        <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.dropdown,
                  {
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    width: dropdownPosition.width,
                    maxHeight: keyboardHeight > 0 ? 200 : 300,
                    marginBottom: keyboardHeight,
                  },
                ]}>
                {searchable && (
                  <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
                    <TextInput
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder="Search..."
                      placeholderTextColor={colors.textTertiary}
                      style={styles.searchInput}
                      autoCorrect={false}
                      autoCapitalize="none"
                      autoFocus
                    />
                    {searchQuery ? (
                      <TouchableOpacity onPress={clearSearch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                )}

                <FlatList
                  data={filteredData}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => {
                    const isSelected = item.label === value;
                    return (
                      <TouchableOpacity
                        style={[styles.optionItem, isSelected && styles.optionSelected]}
                        activeOpacity={0.7}
                        onPress={() => handleSelect(item)}>
                        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{item.label}</Text>
                        {isSelected && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                      </TouchableOpacity>
                    );
                  }}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                  showsVerticalScrollIndicator={true}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No results found</Text>
                    </View>
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default ReusableDropdown;

const styles = StyleSheet.create({
  button: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
    height: 48,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: colors.shadowDark,
  },
  errorButton: {
    borderColor: colors.error,
  },
  text: {
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 4,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    fontWeight: "400",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
    maxHeight: 300,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 8,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: colors.text,
    padding: 0,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 15,
    minHeight: 44,
  },
  optionSelected: {
    backgroundColor: "rgba(149, 178, 6, 0.15)",
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.textSecondary,
    fontWeight: "500",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: 15,
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});
