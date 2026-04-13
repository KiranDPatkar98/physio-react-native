import { View, Text, StyleSheet } from "react-native";
import LabeledInput from "../LabeledInput";
import { OnboardingData } from "../types";
import { sharedStyles, colors } from "../onboarding.styles";

interface BasicInfoStepProps {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  return (
    <View>
      <Text style={sharedStyles.label}>Tell us about yourself</Text>
      <Text style={styles.subtitle}>
        This helps us personalise your physio plan.
      </Text>

      <LabeledInput
        label="Full Name"
        icon="person-outline"
        placeholder="e.g. Jane Doe"
        value={data.name}
        onChangeText={(v) => onChange({ name: v })}
        autoCapitalize="words"
      />

      <LabeledInput
        label="Age"
        icon="calendar-outline"
        placeholder="e.g. 28"
        value={data.age}
        onChangeText={(v) => onChange({ age: v.replace(/\D/g, "") })}
        keyboardType="numeric"
        maxLength={3}
      />

      <LabeledInput
        label="Profession"
        icon="briefcase-outline"
        placeholder="e.g. Software Engineer"
        value={data.profession}
        onChangeText={(v) => onChange({ profession: v })}
        autoCapitalize="words"
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 13,
    color: colors.subText,
    marginBottom: 20,
    marginTop: -2,
  },
});
