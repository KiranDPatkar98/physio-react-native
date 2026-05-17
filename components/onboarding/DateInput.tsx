import React, { useState } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { COLORS } from "@/constants/theme";

interface DateInputProps {
  label: string;
  placeholder: string;
  value: string;
  onDateChange: (date: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  placeholder,
  value,
  onDateChange,
  icon,
  required = false,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString("en-GB");
      onDateChange(formattedDate);

      if (Platform.OS === "ios") {
        setShowDatePicker(false);
      }
    } else if (event.type === "dismissed") {
      setShowDatePicker(false);
    }
  };

  return (
    <>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}
      >
        {icon && <Ionicons name={icon} size={20} color={COLORS.secondary} />}
        <Text
          style={[
            styles.text,
            !value && styles.placeholder,
            icon && styles.textWithIcon,
          ]}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={COLORS.textLight} />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    marginTop: 12,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },

  required: {
    color: COLORS.error || "#DC2626",
  },

  inputContainer: {
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },

  textWithIcon: {
    marginLeft: 14,
  },

  placeholder: {
    color: COLORS.textLight,
  },
});
