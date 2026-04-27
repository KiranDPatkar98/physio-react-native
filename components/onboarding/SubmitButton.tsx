import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";

interface SubmitButtonProps {
  label: string;
  onPress: () => void;
}

export default function SubmitButton({ label, onPress }: SubmitButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.buttonText}>{label}</Text>
      <Ionicons
        name="arrow-forward"
        size={18}
        color={colors.white}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 52,
    width: 120,
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.3,
  },
  icon: {
    marginLeft: 8,
  },
});
