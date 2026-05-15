import CustomButton from "@/components/customButton.tsx/customButton";
import OtpInput from "@/components/OtpInput";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTPScreen = () => {
  const params = useLocalSearchParams();
  const phoneNumber = params.phoneNumber as string;

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimeLeft(30);
    setCanResend(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleOtpChange = (values: string[]) => {
    setOtpValues(values);
    setError("");

    // Auto-verify if all digits entered
    const fullOtp = values.join("");
    if (fullOtp.length === 6) {
      handleVerifyOTP(fullOtp);
    }
  };

  const handleVerifyOTP = async (otp?: string) => {
    const otpToVerify = otp || otpValues.join("");

    if (otpToVerify.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo: Accept 123456 as valid OTP
      if (otpToVerify === "123456") {
        // Check if user has completed onboarding
        const isOnboarded = false;

        if (isOnboarded) {
          // User is onboarded, go directly to main app
          router.replace("/(tabs)/home");
        } else {
          // User needs onboarding, redirect to onboarding flow
          router.replace("/onboarding");
        }
      } else {
        throw new Error("Invalid OTP");
      }
    } catch {
      setError("Invalid OTP. Please try again.");
      setOtpValues(["", "", "", "", "", ""]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setError("");

    // Restart countdown
    startTimer();

    // Simulate resend API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("OTP Sent", "A new OTP has been sent to your mobile number.");
    } catch {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const handleEditNumber = () => {
    router.back();
  };

  const maskedPhone = phoneNumber
    ? `+91 ${phoneNumber.slice(0, 2)}***${phoneNumber.slice(-3)}`
    : "+91 ******";

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to{" "}
              <Text style={{ fontWeight: "bold" }}>{maskedPhone}</Text>
            </Text>

            <Text style={styles.label}>Enter OTP</Text>

            <OtpInput
              value={otpValues}
              onChange={handleOtpChange}
              disabled={isLoading}
              containerStyle={styles.otpContainer}
              inputStyle={styles.otpInput}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.resendSection}>
              {timeLeft > 0 ? (
                <Text style={styles.timerText}>Resend OTP in {timeLeft}s</Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={!canResend}
                >
                  <Text
                    style={[
                      styles.resendLink,
                      !canResend && styles.resendLinkDisabled,
                    ]}
                  >
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.button,
                otpValues.join("").length !== 6 && {
                  opacity: 0.5,
                },
              ]}
            >
              <CustomButton
                title={isLoading ? "Verifying..." : "Continue"}
                onPress={() => handleVerifyOTP()}
                disabled={otpValues.join("").length !== 6 || isLoading}
                textStyle={styles.buttonText}
                endContent={
                  isLoading ? (
                    <ActivityIndicator color={COLORS.white} size="small" />
                  ) : (
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={COLORS.white}
                    />
                  )
                }
                style={{
                  backgroundColor: "transparent",
                  shadowOpacity: 0,
                  elevation: 0,
                  width: "100%",
                }}
              />
            </LinearGradient>

            <TouchableOpacity
              onPress={handleEditNumber}
              style={styles.backToLogin}
            >
              <Ionicons name="arrow-back" size={16} color={COLORS.secondary} />
              <Text style={styles.link}>Back to Login</Text>
            </TouchableOpacity>
          </View>

          {/* <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 26,
            }}
          >
            <View style={styles.line} />

            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color={COLORS.secondary}
            />

            <View style={styles.line} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{" "}
              <Text style={styles.link}>Terms</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
  },

  form: {
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 10,
    lineHeight: 22,
  },

  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: COLORS.textDark,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 8,
  },

  otpInput: {
    flex: 1,
    maxWidth: 52,
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.textDark,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },

  resendSection: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },

  timerText: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  resendLink: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: "600",
  },

  resendLinkDisabled: {
    color: COLORS.textLight,
    opacity: 0.5,
  },

  button: {
    marginTop: 10,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#007BFF",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.white,
  },

  backToLogin: {
    marginTop: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  error: {
    marginTop: 12,
    fontSize: 14,
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },

  footer: {
    marginBottom: 28,
    alignItems: "center",
  },

  footerText: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.textDark,
    lineHeight: 24,
    opacity: 0.8,
  },

  line: {
    width: 120,
    height: 1.5,
    backgroundColor: COLORS.secondary,
    opacity: 0.5,
    marginHorizontal: 12,
  },

  link: {
    color: COLORS.secondary,
    fontWeight: "700",
  },
});

export default OTPScreen;
