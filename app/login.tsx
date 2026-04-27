import { colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
            <Text style={styles.title}>Physio Connect</Text>
            <Text style={styles.subtitle}>Your recovery, connected</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text style={styles.label}>Mobile Number</Text>

            <View style={styles.inputRow}>
              <View style={styles.country}>
                <Text style={styles.countryText}>+91</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                maxLength={10}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
              />
            </View>

            {/* CTA */}
            <TouchableOpacity
              onPress={handleSendOTP}
              disabled={!phoneNumber || phoneNumber.length !== 10 || isLoading}
              activeOpacity={0.85}
              style={{ marginTop: 24 }}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.button,
                  (!phoneNumber || phoneNumber.length !== 10) &&
                    styles.buttonDisabled,
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </LinearGradient>
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

export default LoginScreen;

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

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  country: {
    backgroundColor: colors.input,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 10,
  },

  countryText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.labelText,
  },

  input: {
    flex: 1,
    backgroundColor: colors.input,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 15,
    color: colors.textPrimary,
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
