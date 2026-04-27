import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { sharedStyles } from "../onboarding.styles";
import OptionChip from "../OptionChip";
import { OnboardingData } from "../types";

const PAIN_AREAS = [
  "Neck",
  "Lower back",
  "Upper back",
  "Shoulder",
  "Wrist / hand",
  "Knee",
  "Poor posture",
  "General stiffness",
];

interface PainAreasStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function PainAreasStep({ data, onChange }: PainAreasStepProps) {
  const toggle = (area: string) => {
    const current = data.painAreas;
    const updated = current.includes(area)
      ? current.filter((a) => a !== area)
      : [...current, area];
    onChange({ painAreas: updated });
  };

  return (
    <View>
      <Text style={sharedStyles.label}>
        Where do you experience discomfort?
      </Text>
      <Text style={styles.subtitle}>Select all that apply.</Text>
      <View style={styles.chipGrid}>
        {PAIN_AREAS.map((area) => (
          <OptionChip
            key={area}
            label={area}
            selected={data.painAreas.includes(area)}
            onPress={() => toggle(area)}
          />
        ))}
      </View>
      {data.painAreas.length > 0 && (
        <Text style={styles.selected}>
          {data.painAreas.length} area{data.painAreas.length > 1 ? "s" : ""}{" "}
          selected
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 13,
    color: colors.subText,
    marginBottom: 14,
    marginTop: -2,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  selected: {
    marginTop: 12,
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
});
