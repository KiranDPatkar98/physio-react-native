import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Dropdown from "@/components/onboarding/Dropdown";
import { COLORS } from "@/constants/theme";

import {
    DISCOMFORT_AREAS,
    DISCOMFORT_TIMES,
    FREQUENCY_OPTIONS,
    SITTING_HOURS,
    WORK_MODES,
} from "@/constants/onboarding";

interface HealthDetailsFormProps {
  onBack: () => void;
  onComplete: (data: {
    workMode: string;
    sittingHours: string;
    discomfortArea: string[];
    frequency: string;
    discomfortTime: string;
  }) => void;
}

const HealthDetailsForm: React.FC<HealthDetailsFormProps> = ({
  onBack,
  onComplete,
}) => {
  const [formData, setFormData] = useState({
    workMode: "",
    sittingHours: "",
    discomfortArea: [] as string[],
    frequency: "",
    discomfortTime: "",
  });

  const updateField = (key: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.workMode !== "" &&
      formData.sittingHours !== "" &&
      formData.discomfortArea.length > 0 &&
      formData.frequency !== "" &&
      formData.discomfortTime !== ""
    );
  };

  const handleComplete = () => {
    if (isFormValid()) {
      onComplete(formData);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="fitness-outline" size={24} color={COLORS.secondary} />
        </View>

        <View>
          <Text style={styles.title}>Health & Lifestyle</Text>
          <Text style={styles.subtitle}>Step 2 of 2</Text>
        </View>
      </View>

      <Dropdown
        label="Work Mode"
        placeholder="Select work mode"
        value={formData.workMode}
        options={WORK_MODES}
        onSelect={(value) => updateField("workMode", value as string)}
        icon="briefcase-outline"
        required
        selectionMode="single"
      />

      <Dropdown
        label="Daily Sitting Hours"
        placeholder="Select sitting hours"
        value={formData.sittingHours}
        options={SITTING_HOURS}
        onSelect={(value) => updateField("sittingHours", value as string)}
        icon="time-outline"
        required
        selectionMode="single"
      />

      <Dropdown
        label="Discomfort Area"
        placeholder="Select area(s)"
        value={formData.discomfortArea}
        options={DISCOMFORT_AREAS}
        onSelect={(value) => updateField("discomfortArea", value)}
        icon="body-outline"
        required
        selectionMode="multiple"
      />

      <Dropdown
        label="Discomfort Frequency"
        placeholder="Select frequency"
        value={formData.frequency}
        options={FREQUENCY_OPTIONS}
        onSelect={(value) => updateField("frequency", value as string)}
        icon="pulse-outline"
        required
        selectionMode="single"
      />

      <Dropdown
        label="When is it Most Intense?"
        placeholder="Select time"
        value={formData.discomfortTime}
        options={DISCOMFORT_TIMES}
        onSelect={(value) => updateField("discomfortTime", value as string)}
        icon="alarm-outline"
        required
        selectionMode="single"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={18} color={COLORS.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={[COLORS.secondary, COLORS.primaryLight]}
          style={[
            styles.completeButton,
            !isFormValid() && styles.buttonDisabled,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.completeInner}
            onPress={handleComplete}
            disabled={!isFormValid()}
          >
            <Text style={styles.completeText}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HealthDetailsForm;

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

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    gap: 12,
  },

  backButton: {
    width: 100,
    height: 56,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  backText: {
    marginLeft: 6,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },

  completeButton: {
    flex: 1,
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

  completeInner: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },

  completeText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
});
