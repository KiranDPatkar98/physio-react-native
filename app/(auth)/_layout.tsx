import { COLORS } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerSection}>
        <Image
          source={require("@/assets/images/jpeg/logo.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome to Kynsera</Text>
        <Text style={styles.tagline}>
          Your journey to precision recovery begins here.
        </Text>
      </View>

      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.withOpacity("secondary", 30),
  },
  headerSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 10,
    flex: 0.5,
  },
  logo: {
    marginTop: 20,
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "600",
    color: COLORS.primary,
    fontStyle: "italic",
  },
  tagline: {
    width: 220,
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 18,
    fontStyle: "italic",
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
    paddingTop: 24,
    paddingHorizontal: 16,
  },
});

export default AuthLayout;
