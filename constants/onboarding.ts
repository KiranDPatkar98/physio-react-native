export const WORK_MODES = [
  { label: "🏠 Work From Home", value: "wfh" },
  { label: "🏢 Office", value: "office" },
  { label: "🔄 Hybrid", value: "hybrid" },
];

export const SITTING_HOURS = [
  { label: "⚡ Less than 2 hours", value: "<2" },
  { label: "🕐 2-4 hours", value: "2-4" },
  { label: "🕓 4-6 hours", value: "4-6" },
  { label: "🕕 6-8 hours", value: "6-8" },
  { label: "⏰ More than 8 hours", value: ">8" },
];

export const DISCOMFORT_AREAS = [
  { label: "🦒 Neck", value: "neck" },
  { label: "💪 Shoulders", value: "shoulders" },
  { label: "⬆️ Upper Back", value: "upper_back" },
  { label: "⬇️ Lower Back", value: "lower_back" },
  { label: "✋ Wrists/Hands", value: "wrists" },
  { label: "🦴 Hips", value: "hips" },
  { label: "🦵 Knees", value: "knees" },
  { label: "✅ No discomfort currently", value: "none" },
];

export const FREQUENCY_OPTIONS = [
  { label: "🔴 Constantly (all the time)", value: "constantly" },
  { label: "📆 Daily", value: "daily" },
  { label: "📊 Few times a week", value: "few_times_week" },
  { label: "🗓️ Once a week", value: "weekly" },
  { label: "🟢 Occasionally", value: "occasionally" },
];

export const DISCOMFORT_TIMES = [
  { label: "🌅 Morning", value: "morning" },
  { label: "💼 During work", value: "during_work" },
  { label: "☀️ Afternoon", value: "afternoon" },
  { label: "🌆 Evening", value: "evening" },
  { label: "🌙 Night", value: "night" },
  { label: "🏃 After activity", value: "after_activity" },
];

export const GENDER_OPTIONS = [
  { label: "👨 Male", value: "male" },
  { label: "👩 Female", value: "female" },
  { label: "🌈 Other", value: "other" },
  { label: "🤐 Prefer not to say", value: "prefer_not_to_say" },
];

export const FEATURES = [
  {
    icon: "body-outline" as const,
    title: "Personalized Recovery",
    description:
      "Physical physiotherapy programs tailored to your posture, lifestyle, and recovery needs.",
  },

  {
    icon: "analytics-outline" as const,
    title: "Track Progress",
    description:
      "Monitor your recovery journey with guided progress tracking and insights.",
  },

  {
    icon: "chatbubbles-outline" as const,
    title: "24/7 AI Assistant",
    description:
      "Get instant support, exercise guidance, and recovery assistance anytime.",
  },
];
