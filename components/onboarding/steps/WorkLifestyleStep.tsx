import { View, Text, StyleSheet } from "react-native";
import OptionChip from "../OptionChip";
import { OnboardingData } from "../types";
import { sharedStyles, colors } from "../onboarding.styles";

const WORK_MODES = ["Work from office", "Work from home", "Hybrid"];
const SITTING_HOURS = [
  "Less than 4 hours",
  "4–6 hours",
  "6–8 hours",
  "8–10 hours",
  "10+ hours",
];

interface WorkLifestyleStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function WorkLifestyleStep({ data, onChange }: WorkLifestyleStepProps) {
  return (
    <View>
      {/* Work Mode */}
      <View style={styles.section}>
        <Text style={sharedStyles.label}>Work Mode</Text>
        <View style={styles.chipRow}>
          {WORK_MODES.map((mode) => (
            <OptionChip
              key={mode}
              label={mode}
              selected={data.workMode === mode}
              onPress={() => onChange({ workMode: mode })}
            />
          ))}
        </View>
      </View>

      {/* Sitting Hours */}
      <View style={styles.section}>
        <Text style={sharedStyles.label}>Sitting hours per day</Text>
        <View style={styles.chipRow}>
          {SITTING_HOURS.map((h) => (
            <OptionChip
              key={h}
              label={h}
              selected={data.sittingHours === h}
              onPress={() => onChange({ sittingHours: h })}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    marginHorizontal: -4,
  },
});
