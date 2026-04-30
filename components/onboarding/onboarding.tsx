import { Alert } from "react-native";
import { router } from "expo-router";
import ChatOnboarding from "./ChatOnboarding";

export default function Onboarding() {
  const handleOnboardingComplete = (data: Record<string, any>) => {
    console.log('Onboarding completed with data:', data);
    
    // Show completion message
    Alert.alert(
      "Welcome to Physio Connect! 🎉", 
      `Hi ${data.name}! Your personalized physio plan is ready. Let's start your recovery journey!`,
      [
        {
          text: "Get Started",
          onPress: () => {
            // Navigate to main app or home screen
            router.replace("/(tabs)/home");
          }
        }
      ]
    );
  };

  return <ChatOnboarding onComplete={handleOnboardingComplete} />;
}
