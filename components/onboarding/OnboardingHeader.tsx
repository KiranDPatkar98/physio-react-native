import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function OnboardingHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoCircle}>
        <Ionicons name="body" size={36} color={colors.white} />
      </View>
      <Text style={styles.appName}>PhysioConnect</Text>
      <Text style={styles.tagline}>Your recovery journey starts here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 72,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primaryDark,
    letterSpacing: 0.4,
  },
  tagline: {
    fontSize: 14,
    color: colors.subText,
    marginTop: 4,
  },
});
