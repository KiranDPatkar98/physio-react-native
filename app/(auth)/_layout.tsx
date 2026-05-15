import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <LinearGradient
        colors={[
          COLORS.backgroundSoft,
          COLORS.backgroundGradient,
          COLORS.background,
        ]}
        style={styles.container}
      >
        <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
          <View style={styles.headerSection}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("@/assets/images/jpeg/logo.jpeg")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.welcomeText}>Welcome to Kynsera</Text>

            <Text style={styles.tagline}>
              Your journey to recovery starts here
            </Text>

            <View style={styles.secureContainer}>
              <View style={styles.line} />

              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={COLORS.secondary}
              />

              <View style={styles.line} />
            </View>

            <Text style={styles.secureText}>Secure, private & trusted</Text>
          </View>

          <View style={styles.content}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" },
              }}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },

  logoWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },

  logo: {
    width: 95,
    height: 95,
  },

  welcomeText: {
    marginTop: 26,
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    letterSpacing: -1,
    fontStyle: "italic",
  },

  tagline: {
    marginTop: 4,
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 28,
    fontStyle: "italic",
  },

  secureContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  line: {
    width: 60,
    height: 1.5,
    backgroundColor: COLORS.secondary,
    opacity: 0.5,
    marginHorizontal: 12,
  },

  secureText: {
    marginTop: 12,
    fontSize: 12,
    color: COLORS.textDark,
    opacity: 0.7,
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 32,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingTop: 30,
    paddingHorizontal: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
});
