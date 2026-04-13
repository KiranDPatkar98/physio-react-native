import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./onboarding.styles";

interface OptionChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function OptionChip({ label, selected, onPress }: OptionChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    margin: 4,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.labelText,
  },
  labelSelected: {
    color: "#fff",
    fontWeight: "600",
  },
});
