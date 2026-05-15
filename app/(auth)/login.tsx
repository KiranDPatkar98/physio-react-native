import CustomButton from "@/components/customButton.tsx/customButton";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
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

            <CustomButton
              title={"Send OTP"}
              onPress={handleSendOTP}
              style={styles.button}
              disabled={phoneNumber.length !== 10 || isLoading}
            />
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
    backgroundColor: COLORS.white,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },

  form: {
    marginTop: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 6,
  },

  flagEmoji: {
    fontSize: 18,
    marginRight: 4,
  },

  countryText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
  },

  dropdownIcon: {
    marginLeft: 2,
  },

  separator: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.gray,
    marginHorizontal: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.black,
    padding: 0,
  },

  button: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  error: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 13,
    color: "#DC2626",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#DC2626",
    fontWeight: "500",
  },

  footer: {
    marginBottom: 20,
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    textAlign: "center",
  },

  link: {
    fontWeight: "500",
  },
});
