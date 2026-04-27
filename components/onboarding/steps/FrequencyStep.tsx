import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { sharedStyles } from "../onboarding.styles";
import OptionChip from "../OptionChip";
import { OnboardingData } from "../types";

const FREQUENCIES = [
  "Daily",
  "3–5 times a week",
  "Weekly",
  "Occasionally",
  "Rarely",
];

const TIMES_OF_DISCOMFORT = [
  "During work hours",
  "End of workday",
  "After long sitting",
  "Morning",
  "At night",
];

interface FrequencyStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function FrequencyStep({ data, onChange }: FrequencyStepProps) {
  const toggleTime = (time: string) => {
    const current = data.timeOfDiscomfort;
    const updated = current.includes(time)
      ? current.filter((t) => t !== time)
      : [...current, time];
    onChange({ timeOfDiscomfort: updated });
  };

  return (
    <View>
      {/* Frequency */}
      <View style={styles.section}>
        <Text style={sharedStyles.label}>
          How often do you feel discomfort?
        </Text>
        <View style={styles.chipRow}>
          {FREQUENCIES.map((f) => (
            <OptionChip
              key={f}
              label={f}
              selected={data.frequency === f}
              onPress={() => onChange({ frequency: f })}
            />
          ))}
        </View>
      </View>

      {/* Time of Discomfort */}
      <View style={styles.section}>
        <Text style={sharedStyles.label}>
          When does discomfort typically occur?
        </Text>
        <Text style={styles.subtitle}>Select all that apply.</Text>
        <View style={styles.chipRow}>
          {TIMES_OF_DISCOMFORT.map((t) => (
            <OptionChip
              key={t}
              label={t}
              selected={data.timeOfDiscomfort.includes(t)}
              onPress={() => toggleTime(t)}
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
  subtitle: {
    fontSize: 13,
    color: colors.subText,
    marginBottom: 8,
    marginTop: 2,
  },
});
