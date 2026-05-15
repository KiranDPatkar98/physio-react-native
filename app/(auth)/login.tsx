import CustomButton from "@/components/customButton.tsx/customButton";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
      setError("");
    }
  };

  const validatePhoneNumber = (phone: string) => {
    if (phone.length !== 10) return "Enter a valid 10-digit mobile number";
    if (!phone.match(/^[6-9]\d{9}$/)) return "Invalid Indian mobile number";
    return null;
  };

  const handleSendOTP = async () => {
    const err = validatePhoneNumber(phoneNumber);
    if (err) {
      setError(err);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1200));

      router.push({
        pathname: "/otp",
        params: { phoneNumber },
      });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <Text style={styles.label}>Mobile Number</Text>

            <View style={styles.inputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.flagEmoji}>🇮🇳</Text>
                <Text style={styles.countryText}>+91</Text>
                <Ionicons
                  name="chevron-down"
                  size={14}
                  color={COLORS.textDark}
                  style={styles.dropdownIcon}
                />
              </View>
              <View style={styles.separator} />
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                keyboardType="numeric"
                maxLength={10}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
              />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.button,
                phoneNumber.length !== 10 && {
                  opacity: 0.5,
                },
              ]}
            >
              <CustomButton
                title={isLoading ? "Sending..." : "Send OTP"}
                onPress={handleSendOTP}
                disabled={phoneNumber.length !== 10 || isLoading}
                textStyle={styles.buttonText}
                endContent={
                  <Ionicons name="send" size={20} color={COLORS.white} />
                }
                style={{
                  backgroundColor: "transparent",
                  shadowOpacity: 0,
                  elevation: 0,
                  width: "100%",
                }}
              />
            </LinearGradient>
          </View>

          <View
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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

  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: COLORS.textDark,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#E8EEF3",
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 58,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },

  countryCode: {
    flexDirection: "row",
    alignItems: "center",
  },

  flagEmoji: {
    fontSize: 20,
    marginRight: 6,
  },

  countryText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
  },

  dropdownIcon: {
    marginLeft: 4,
  },

  separator: {
    width: 1,
    height: 28,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },

  button: {
    marginTop: 28,
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
