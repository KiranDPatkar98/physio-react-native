import { colors } from "@/constants/colors";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTPScreen = () => {
  const params = useLocalSearchParams();
  const phoneNumber = params.phoneNumber as string;

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Refs for OTP inputs
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    // Focus first input
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 500);

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);
    setErrors("");

    // Move to next input if digit entered
    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-verify if all digits entered
    if (text && index === inputRefs.length - 1) {
      const fullOtp = newOtpValues.join("");
      if (fullOtp.length === 6) {
        handleVerifyOTP(fullOtp);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);
    }
  };

  const handleVerifyOTP = async (otp?: string) => {
    const otpToVerify = otp || otpValues.join("");

    if (otpToVerify.length !== 6) {
      setErrors("Please enter complete OTP");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo: Accept 123456 as valid OTP
      if (otpToVerify === "123456") {
        router.replace("/home");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      setErrors("Invalid OTP. Please try again.");
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs[0].current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setCanResend(false);
    setTimeLeft(30);
    setErrors("");

    // Restart countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate resend API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("OTP Sent", "A new OTP has been sent to your mobile number.");
    } catch (error) {
      setErrors("Failed to resend OTP. Please try again.");
    }
  };

  const handleEditNumber = () => {
    router.back();
  };

  const maskedPhone = phoneNumber
    ? `+91 ${phoneNumber.slice(0, 2)}***${phoneNumber.slice(-3)}`
    : "+91 ******";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>PC</Text>
            </View>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to {maskedPhone}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {errors ? <Text style={styles.error}>{errors}</Text> : null}

            <Text style={styles.label}>Enter OTP</Text>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              {otpValues.map((value, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={styles.otpInput}
                  value={value}
                  onChangeText={(text) =>
                    handleOtpChange(text.slice(-1), index)
                  }
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                  editable={!isLoading}
                  returnKeyType={index === 5 ? "done" : "next"}
                  onSubmitEditing={() => {
                    if (index < 5) {
                      inputRefs[index + 1].current?.focus();
                    } else if (otpValues.join("").length === 6) {
                      handleVerifyOTP();
                    }
                  }}
                />
              ))}
            </View>

            {/* Resend Section */}
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

            {/* CTA */}
            <TouchableOpacity
              onPress={() => handleVerifyOTP()}
              disabled={otpValues.join("").length !== 6 || isLoading}
              activeOpacity={0.85}
              style={{ marginTop: 24 }}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.button,
                  otpValues.join("").length !== 6 && styles.buttonDisabled,
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Verify & Continue</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Edit Number Link */}
            <TouchableOpacity
              onPress={handleEditNumber}
              style={{ marginTop: 16, alignItems: "center" }}
            >
              <Text style={styles.link}>Edit mobile number</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{" "}
              <Text style={styles.link}>Terms</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },

  header: {
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  logoText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    textAlign: "center",
  },

  form: {
    marginTop: 40,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.labelText,
    marginBottom: 8,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  otpInput: {
    width: 45,
    height: 50,
    backgroundColor: colors.input,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: colors.textPrimary,
  },

  resendSection: {
    alignItems: "center",
    marginBottom: 16,
  },

  timerText: {
    fontSize: 13,
    color: colors.textMuted,
  },

  resendLink: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
  },

  resendLinkDisabled: {
    color: colors.textMuted,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  error: {
    color: colors.error,
    marginBottom: 10,
    fontSize: 13,
  },

  footer: {
    marginBottom: 20,
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },

  link: {
    color: colors.primary,
    fontWeight: "500",
  },
});

export default OTPScreen;
