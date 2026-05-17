import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // const data = await OnboardingStatusService.getUserData();
      // setUserData(data);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetOnboarding = async () => {
    setUserData(null);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons
          name="person-circle-outline"
          size={80}
          color={colors.textMuted}
        />
        <Text style={styles.title}>Welcome to Kynsera!</Text>
        <Text style={styles.subtitle}>
          Complete your setup to get personalized recommendations
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Welcome Section */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeHeader}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{userData.name}! 👋</Text>
          </View>
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>AI</Text>
          </View>
        </View>
        <Text style={styles.welcomeSubtitle}>
          Ready for your physio session today?
        </Text>
      </View>

      {/* Profile Summary */}
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Your Profile</Text>
        <View style={styles.profileGrid}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Age</Text>
            <Text style={styles.profileValue}>{userData.age} years</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Work Style</Text>
            <Text style={styles.profileValue}>
              {userData.work_mode === "desk"
                ? "💻 Desk Work"
                : userData.work_mode === "standing"
                  ? "🚶 Standing"
                  : userData.work_mode === "physical"
                    ? "💪 Physical"
                    : userData.work_mode === "mixed"
                      ? "⚖️ Mixed"
                      : "Not specified"}
            </Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Daily Sitting</Text>
            <Text style={styles.profileValue}>
              {userData.sitting_hours === "<4"
                ? "⏱️ Less than 4h"
                : userData.sitting_hours === "4-8"
                  ? "🕐 4-8 hours"
                  : userData.sitting_hours === ">8"
                    ? "⏰ More than 8h"
                    : "Not specified"}
            </Text>
          </View>
          {userData.pain_areas && userData.pain_areas.length > 0 && (
            <View style={[styles.profileItem, styles.fullWidth]}>
              <Text style={styles.profileLabel}>Pain Areas</Text>
              <Text style={styles.profileValue}>
                {userData.pain_areas.includes("none")
                  ? "✅ No current pain"
                  : userData.pain_areas
                      .map((area: string) => {
                        const areaMap: { [key: string]: string } = {
                          neck: "🦒 Neck",
                          shoulders: "💪 Shoulders",
                          upper_back: "⬆️ Upper Back",
                          lower_back: "⬇️ Lower Back",
                          wrists: "✋ Wrists/Hands",
                          hips: "🦴 Hips",
                        };
                        return areaMap[area] || area;
                      })
                      .join(", ")}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="play-circle" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Start Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
            <Text style={styles.actionText}>AI Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Progress</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Debug Section (remove in production) */}
      {__DEV__ && (
        <View style={styles.debugCard}>
          <Text style={styles.cardTitle}>Debug Actions</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetOnboarding}
          >
            <Ionicons name="refresh" size={16} color={colors.error} />
            <Text style={styles.resetButtonText}>Reset Onboarding</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  welcomeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  aiAvatarText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  profileItem: {
    flex: 1,
    minWidth: "45%",
  },
  fullWidth: {
    minWidth: "100%",
  },
  profileLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "500",
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  actionsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.input,
    minWidth: 80,
  },
  actionText: {
    fontSize: 12,
    color: colors.textPrimary,
    marginTop: 8,
    fontWeight: "500",
  },
  debugCard: {
    backgroundColor: colors.errorBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  resetButtonText: {
    color: colors.error,
    fontWeight: "500",
  },
});

export default Home;
