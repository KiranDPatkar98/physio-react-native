import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { FEATURES } from "@/constants/onboarding";
import { COLORS } from "@/constants/theme";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),

      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.featureCard,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        },
      ]}
    >
      <View style={styles.featureSurface}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={COLORS.secondary} />
        </View>

        <View style={styles.featureTextContainer}>
          <Text style={styles.featureTitle}>{title}</Text>

          <Text style={styles.featureDescription}>{description}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const titleFadeAnim = useRef(new Animated.Value(0)).current;

  const titleSlideAnim = useRef(new Animated.Value(-20)).current;

  const subtitleFadeAnim = useRef(new Animated.Value(0)).current;

  const buttonScaleAnim = useRef(new Animated.Value(0.9)).current;

  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),

        Animated.spring(titleSlideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(subtitleFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.spring(buttonScaleAnim, {
          toValue: 1,
          delay: 800,
          tension: 50,
          friction: 5,
          useNativeDriver: true,
        }),

        Animated.timing(buttonFadeAnim, {
          toValue: 1,
          delay: 800,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          COLORS.backgroundSoft,
          COLORS.backgroundGradient,
          COLORS.background,
        ]}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: titleFadeAnim,
                  transform: [
                    {
                      translateY: titleSlideAnim,
                    },
                  ],
                },
              ]}
            >
              <View style={styles.logoWrapper}>
                <Image
                  source={require("@/assets/images/jpeg/logo.jpeg")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>

            <Animated.View
              style={{
                opacity: titleFadeAnim,
                transform: [
                  {
                    translateY: titleSlideAnim,
                  },
                ],
              }}
            >
              <Text style={styles.brandText}>Kynsera</Text>

              <Text style={styles.tagline}>
                Your Personal Recovery Companion
              </Text>
            </Animated.View>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.featuresHeading}>How Kynsera Helps You</Text>

            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={300 + index * 150}
              />
            ))}
          </View>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonFadeAnim,
                transform: [
                  {
                    scale: buttonScaleAnim,
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onGetStarted}
              style={styles.button}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Start My Journey</Text>

                <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Takes less than 2 minutes • Completely free
            </Text>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
  },

  logoContainer: {
    marginBottom: 14,
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

  brandText: {
    fontSize: 38,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    letterSpacing: -1,
  },

  tagline: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
  },

  description: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 12,
    paddingHorizontal: 8,
  },

  benefitsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    flexWrap: "wrap",
  },

  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  benefitText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
  },

  physioCard: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 26,

    padding: 18,

    marginTop: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,

    elevation: 3,
  },

  physioHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  physioAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,

    backgroundColor: COLORS.backgroundSoft,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  physioTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
  },

  physioSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: "600",
  },

  physioDescription: {
    marginTop: 14,

    fontSize: 13,
    lineHeight: 22,

    color: COLORS.textLight,
  },

  bottomSection: {
    marginTop: 24,
  },

  featuresHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 16,
    textAlign: "center",
  },

  featureCard: {
    marginBottom: 12,
  },

  featureSurface: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,

    backgroundColor: COLORS.white,

    borderRadius: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,

    elevation: 3,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,

    backgroundColor: COLORS.backgroundSoft,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  featureTextContainer: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },

  featureDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.withOpacity("textDark", 60),
  },

  buttonContainer: {
    paddingBottom: 10,
    paddingTop: 24,
  },

  button: {
    borderRadius: 24,
    overflow: "hidden",

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,

    elevation: 6,
  },

  buttonGradient: {
    flexDirection: "row",

    paddingVertical: 14,
    paddingHorizontal: 24,

    justifyContent: "center",
    alignItems: "center",

    gap: 8,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.white,
  },

  footerText: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 12,
    fontWeight: "500",
  },
});
