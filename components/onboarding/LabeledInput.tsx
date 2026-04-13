import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sharedStyles, colors } from "./onboarding.styles";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface LabeledInputProps {
  label: string;
  icon: IoniconsName;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  returnKeyType?: "next" | "done" | "go" | "search" | "send";
}

export default function LabeledInput({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "sentences",
  maxLength,
  returnKeyType = "next",
}: LabeledInputProps) {
  return (
    <View style={sharedStyles.fieldGroup}>
      <Text style={sharedStyles.label}>{label}</Text>
      <View style={sharedStyles.inputWrapper}>
        <Ionicons
          name={icon}
          size={18}
          color={colors.iconText}
          style={sharedStyles.inputIcon}
        />
        <TextInput
          style={sharedStyles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
        />
      </View>
    </View>
  );
}
