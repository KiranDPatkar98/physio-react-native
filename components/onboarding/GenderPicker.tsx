import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, sharedStyles } from "./onboarding.styles";

const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];

interface GenderPickerProps {
  value: string;
  onChange: (gender: string) => void;
}

export default function GenderPicker({ value, onChange }: GenderPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={sharedStyles.fieldGroup}>
      <Text style={sharedStyles.label}>Gender</Text>

      <TouchableOpacity
        style={[sharedStyles.inputWrapper, styles.trigger]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="people-outline"
          size={18}
          color={colors.iconText}
          style={sharedStyles.inputIcon}
        />
        <Text
          style={[styles.triggerText, !value && { color: colors.placeholder }]}
        >
          {value || "Select gender"}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.iconText}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {GENDERS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.item, value === option && styles.itemActive]}
              onPress={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              <Text
                style={[
                  styles.itemText,
                  value === option && styles.itemTextActive,
                ]}
              >
                {option}
              </Text>
              {value === option && (
                <Ionicons name="checkmark" size={16} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    justifyContent: "space-between",
  },
  triggerText: {
    flex: 1,
    fontSize: 15,
    color: colors.bodyText,
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  itemActive: {
    backgroundColor: "#F0F9FF",
  },
  itemText: {
    fontSize: 15,
    color: colors.labelText,
  },
  itemTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
});
