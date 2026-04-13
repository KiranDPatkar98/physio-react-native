import { StyleSheet } from "react-native";

export const colors = {
  primary: "#0EA5E9",
  primaryDark: "#0C4A6E",
  background: "#F0F9FF",
  white: "#FFFFFF",
  inputBg: "#F8FAFC",
  border: "#E2E8F0",
  labelText: "#374151",
  bodyText: "#1E293B",
  iconText: "#6B7280",
  placeholder: "#9CA3AF",
  subText: "#64748B",
  mutedText: "#94A3B8",
  divider: "#F1F5F9",
};

export const sharedStyles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.labelText,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.bodyText,
    paddingVertical: 0,
  },
});
