import { Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export default function TermsFooter() {
  return (
    <Text style={styles.terms}>
      By continuing, you agree to our{" "}
      <Text style={styles.link}>Terms of Service</Text> and{" "}
      <Text style={styles.link}>Privacy Policy</Text>.
    </Text>
  );
}

const styles = StyleSheet.create({
  terms: {
    fontSize: 12,
    color: colors.mutedText,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    fontWeight: "600",
  },
});
