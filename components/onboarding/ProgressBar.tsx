import { View, Text, StyleSheet } from "react-native";
import { colors } from "./onboarding.styles";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepsRow}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <View key={i} style={styles.stepWrapper}>
              <View
                style={[
                  styles.dot,
                  done && styles.dotDone,
                  active && styles.dotActive,
                ]}
              >
                {done ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text style={[styles.dotLabel, active && styles.dotLabelActive]}>
                    {i + 1}
                  </Text>
                )}
              </View>
              {i < totalSteps - 1 && (
                <View style={[styles.line, done && styles.lineDone]} />
              )}
            </View>
          );
        })}
      </View>
      <Text style={styles.stepText}>
        Step {currentStep + 1} of {totalSteps} —{" "}
        <Text style={styles.stepLabel}>{labels[currentStep]}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    alignItems: "center",
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  dotActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  dotDone: {
    backgroundColor: "#0EA5E9",
    opacity: 0.6,
  },
  dotLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.iconText,
  },
  dotLabelActive: {
    color: "#fff",
  },
  checkmark: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "700",
  },
  line: {
    width: 36,
    height: 2,
    backgroundColor: "#E2E8F0",
  },
  lineDone: {
    backgroundColor: colors.primary,
    opacity: 0.5,
  },
  stepText: {
    fontSize: 12,
    color: colors.subText,
  },
  stepLabel: {
    fontWeight: "700",
    color: colors.primaryDark,
  },
});
