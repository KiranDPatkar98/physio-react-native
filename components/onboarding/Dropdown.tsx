import React, { useState } from "react";
import {
    LayoutAnimation,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    UIManager,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/theme";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string | string[];
  options: Option[];
  onSelect: (value: string | string[]) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  required?: boolean;
  selectionMode?: "single" | "multiple";
}

const CustomDropdown = ({
  label,
  placeholder,
  value,
  options,
  onSelect,
  icon,
  required = false,
  selectionMode = "single",
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);

  const selectedValues = Array.isArray(value) ? value : [value];

  const selectedLabels = options
    .filter((item) => selectedValues.includes(item.value))
    .map((item) => item.label)
    .join(", ");

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setOpen((prev) => !prev);
  };

  const handleSelect = (selected: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // SINGLE SELECT
    if (selectionMode === "single") {
      onSelect(selected);
      setOpen(false);
      return;
    }

    // MULTIPLE SELECT
    let updatedValues = [...selectedValues];

    if (updatedValues.includes(selected)) {
      updatedValues = updatedValues.filter((item) => item !== selected);
    } else {
      updatedValues.push(selected);
    }

    onSelect(updatedValues);
  };

  const isSelected = (optionValue: string) => {
    return selectedValues.includes(optionValue);
  };

  return (
    <View style={styles.container}>
      {/* LABEL */}
      <Text style={styles.label}>
        {label}

        {required && <Text style={styles.required}> *</Text>}
      </Text>

      {/* SELECTOR */}
      <Pressable
        onPress={toggleDropdown}
        style={[styles.selector, open && styles.selectorActive]}
      >
        {/* LEFT */}
        <View style={styles.leftSection}>
          {icon && <Ionicons name={icon} size={20} color={COLORS.secondary} />}

          <Text
            numberOfLines={1}
            style={[
              styles.selectedText,
              !selectedLabels && styles.placeholderText,
            ]}
          >
            {selectedLabels || placeholder}
          </Text>
        </View>

        {/* RIGHT ICON */}
        <Ionicons
          name={open ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color={COLORS.textLight}
        />
      </Pressable>

      {/* OPTIONS */}
      {open && (
        <View style={styles.dropdownContainer}>
          {options.map((item) => {
            const active = isSelected(item.value);

            return (
              <Pressable
                key={item.value}
                onPress={() => handleSelect(item.value)}
                style={[styles.option, active && styles.activeOption]}
              >
                <Text
                  style={[styles.optionText, active && styles.activeOptionText]}
                >
                  {item.label}
                </Text>

                {selectionMode === "multiple" ? (
                  <Ionicons
                    name={active ? "checkbox" : "square-outline"}
                    size={22}
                    color={active ? COLORS.secondary : COLORS.textLight}
                  />
                ) : (
                  active && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={COLORS.secondary}
                    />
                  )
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },

  label: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },

  required: {
    color: COLORS.error,
  },

  selector: {
    minHeight: 60,

    borderRadius: 22,

    borderWidth: 1,
    borderColor: COLORS.border,

    backgroundColor: COLORS.white,

    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 10,

    elevation: 2,
  },

  selectorActive: {
    borderColor: COLORS.secondary,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  selectedText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: "500",
    flex: 1,
  },

  placeholderText: {
    color: COLORS.textLight,
  },

  dropdownContainer: {
    marginTop: 10,

    borderRadius: 24,

    backgroundColor: COLORS.white,

    paddingVertical: 10,

    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.06,
    shadowRadius: 18,

    elevation: 6,
  },

  option: {
    minHeight: 56,

    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  activeOption: {
    backgroundColor: COLORS.backgroundSoft,
  },

  optionText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: "500",
  },

  activeOptionText: {
    color: COLORS.secondary,
    fontWeight: "700",
  },
});
