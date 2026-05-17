import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import DateInput from "@/components/onboarding/DateInput";
import Dropdown from "@/components/onboarding/Dropdown";
import { GENDER_OPTIONS } from "@/constants/onboarding";
import { COLORS } from "@/constants/theme";

interface PersonalDetailsFormProps {
  onNext: (data: {
    name: string;
    email: string;
    dob: string;
    gender: string;
    profession: string;
  }) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  onNext,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    profession: "",
  });

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.dob.trim() !== "" &&
      formData.gender.trim() !== ""
      // profession is optional
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      onNext(formData);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-outline" size={24} color={COLORS.secondary} />
        </View>

        <View>
          <Text style={styles.title}>Personal Info</Text>
          <Text style={styles.subtitle}>Step 1 of 2</Text>
        </View>
      </View>

      <Text style={styles.label}>
        Full Name<Text style={styles.required}> *</Text>
      </Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color={COLORS.secondary} />
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor={COLORS.textLight}
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => updateField("name", text)}
        />
      </View>

      <Text style={styles.label}>
        Email Address<Text style={styles.required}> *</Text>
      </Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={COLORS.textLight}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => updateField("email", text)}
        />
      </View>

      <DateInput
        label="Date of Birth"
        placeholder="Select your date of birth"
        value={formData.dob}
        onDateChange={(date) => updateField("dob", date)}
        icon="calendar-outline"
        required
      />

      <Dropdown
        label="Gender"
        placeholder="Select your gender"
        value={formData.gender}
        options={GENDER_OPTIONS}
        onSelect={(value) => updateField("gender", value as string)}
        icon="male-female-outline"
        required
        selectionMode="single"
      />

      <Text style={styles.label}>Profession</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="briefcase-outline" size={20} color={COLORS.secondary} />
        <TextInput
          placeholder="Enter your profession (optional)"
          placeholderTextColor={COLORS.textLight}
          style={styles.input}
          value={formData.profession}
          onChangeText={(text) => updateField("profession", text)}
        />
      </View>

      <LinearGradient
        colors={[COLORS.secondary, COLORS.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, !isFormValid() && styles.buttonDisabled]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonInner}
          onPress={handleNext}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Next</Text>
          <Ionicons name="arrow-forward" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default PersonalDetailsForm;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.backgroundSoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textDark,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.textLight,
  },

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

  input: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    color: COLORS.textDark,
  },

  button: {
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonInner: {
    height: 58,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginRight: 10,
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
});
