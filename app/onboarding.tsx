import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import HealthDetailsForm from "@/components/onboarding/healthDetailsForm";
import PersonalDetailsForm from "@/components/onboarding/personalDetailsForm";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import { COLORS } from "@/constants/theme";

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for welcome screen

  // Store form data for future API calls
  const [personalData, setPersonalData] = useState<{
    name: string;
    email: string;
    dob: string;
    gender: string;
    profession: string;
  } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [healthData, setHealthData] = useState<{
    workMode: string;
    sittingHours: string;
    discomfortArea: string[];
    frequency: string;
    discomfortTime: string;
  } | null>(null);

  const handlePersonalDetailsComplete = (data: {
    name: string;
    email: string;
    dob: string;
    gender: string;
    profession: string;
  }) => {
    setPersonalData(data);
    // Here you can make API call with personal data if needed
    // await submitPersonalDetails(data);
    setCurrentStep(2);
  };

  const handleHealthDetailsComplete = (data: {
    workMode: string;
    sittingHours: string;
    discomfortArea: string[];
    frequency: string;
    discomfortTime: string;
  }) => {
    setHealthData(data);
    // Here you can make API call with health data
    // const completeData = { ...personalData, ...data };
    // await submitOnboarding(completeData);
    console.log("Onboarding complete", {
      personal: personalData,
      health: data,
    });

    // Navigate to home screen
    router.replace("/(tabs)/home");
  };

  // Welcome screen has its own styling, render it separately
  if (currentStep === 0) {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <WelcomeScreen onGetStarted={() => setCurrentStep(1)} />
      </>
    );
  }

  return (
    <LinearGradient
      colors={[
        COLORS.backgroundSoft,
        COLORS.backgroundGradient,
        COLORS.background,
      ]}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          nestedScrollEnabled={true}
        >
          {currentStep === 1 ? (
            <PersonalDetailsForm onNext={handlePersonalDetailsComplete} />
          ) : (
            <HealthDetailsForm
              onBack={() => setCurrentStep(1)}
              onComplete={handleHealthDetailsComplete}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 100,
  },

  stepperContainer: {
    marginBottom: 40,
  },

  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  stepCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  activeStep: {
    backgroundColor: COLORS.secondary,
  },

  stepText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: "700",
  },

  activeStepText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  stepLine: {
    width: 90,
    height: 4,
    backgroundColor: COLORS.withOpacity("textLight", 15),
    marginHorizontal: 12,
    borderRadius: 100,
  },

  activeLine: {
    backgroundColor: COLORS.secondary,
  },

  stepLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 14,
  },

  activeLabel: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 15,
  },

  inactiveLabel: {
    color: COLORS.textLight,
    fontWeight: "600",
    fontSize: 15,
  },

  smallHeading: {
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  heading: {
    fontSize: 42,
    lineHeight: 50,
    color: COLORS.textDark,
    fontWeight: "800",
    letterSpacing: -1,
  },

  subHeading: {
    marginTop: 16,
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.textLight,
    marginBottom: 34,
  },
});
