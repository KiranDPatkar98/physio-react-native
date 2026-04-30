import ChatOnboarding from "@/components/onboarding/ChatOnboarding";
import OnboardingStatusService from "@/services/OnboardingStatusService";
import { router } from "expo-router";
import { Alert } from "react-native";

export default function OnboardingScreen() {
  const handleOnboardingComplete = async (data: Record<string, any>) => {
    console.log("Onboarding completed with data:", data);

    try {
      // Save onboarding completion status and data
      await OnboardingStatusService.markOnboardingCompleted();
      await OnboardingStatusService.saveUserData(data);

      // Show completion message and navigate to home
      Alert.alert(
        "Welcome to Physio Connect! 🎉",
        `Hi ${data.name}! Your personalized physio plan is ready. Let's start your recovery journey!`,
        [
          {
            text: "Get Started",
            onPress: () => {
              router.replace("/(tabs)/home");
            },
          },
        ],
      );
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    }
  };

  return <ChatOnboarding onComplete={handleOnboardingComplete} />;
}
