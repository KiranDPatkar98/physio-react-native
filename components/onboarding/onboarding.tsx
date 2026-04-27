import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OnboardingHeader from "./OnboardingHeader";
import ProgressBar from "./ProgressBar";
import SubmitButton from "./SubmitButton";
import BasicInfoStep from "./steps/BasicInfoStep";
import WorkLifestyleStep from "./steps/WorkLifestyleStep";
import PainAreasStep from "./steps/PainAreasStep";
import FrequencyStep from "./steps/FrequencyStep";
import { colors } from "@/constants/colors";
import { OnboardingData, INITIAL_DATA } from "./types";

const STEP_LABELS = ["Basic Info", "Work Lifestyle", "Pain Areas", "Frequency & Time"];
const TOTAL_STEPS = STEP_LABELS.length;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

  const update = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const validate = (): boolean => {
    if (step === 0) {
      if (!data.name.trim()) { Alert.alert("Required", "Please enter your name."); return false; }
      if (!data.age.trim()) { Alert.alert("Required", "Please enter your age."); return false; }
      if (!data.profession.trim()) { Alert.alert("Required", "Please enter your profession."); return false; }
    }
    if (step === 1) {
      if (!data.workMode) { Alert.alert("Required", "Please select your work mode."); return false; }
      if (!data.sittingHours) { Alert.alert("Required", "Please select your daily sitting hours."); return false; }
    }
    if (step === 2) {
      if (data.painAreas.length === 0) { Alert.alert("Required", "Please select at least one pain area."); return false; }
    }
    if (step === 3) {
      if (!data.frequency) { Alert.alert("Required", "Please select how often you feel discomfort."); return false; }
      if (data.timeOfDiscomfort.length === 0) { Alert.alert("Required", "Please select at least one time of discomfort."); return false; }
    }
    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    Alert.alert("You're all set!", `Welcome, ${data.name.split(" ")[0]}! Your personalised physio plan is ready.`);
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <BasicInfoStep data={data} onChange={update} />;
      case 1: return <WorkLifestyleStep data={data} onChange={update} />;
      case 2: return <PainAreasStep data={data} onChange={update} />;
      case 3: return <FrequencyStep data={data} onChange={update} />;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <OnboardingHeader />
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} labels={STEP_LABELS} />

        <View style={styles.card}>
          {renderStep()}
          <View style={styles.navRow}>
            {step > 0 ? (
              <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.75}>
                <Ionicons name="arrow-back" size={16} color={colors.primary} />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {step < TOTAL_STEPS - 1
              ? <SubmitButton label="Next" onPress={handleNext} />
              : <SubmitButton label="Finish" onPress={handleSubmit} />
            }
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  card: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
});
