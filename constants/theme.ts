const BASE_COLORS = {
  primary: "#003F7D",
  primaryLight: "#0059B3",

  secondary: "#11C5BB",
  tertiary: "#22D3C5",

  background: "#F5F9FC",
  backgroundSoft: "#DDF6F2",
  backgroundGradient: "#C8F1EC",

  textDark: "#0B1F33",
  textLight: "#5B6B7A",

  grayAccent: "#D9E4EC",
  gray: "#E5E7EB",
  border: "#E8EEF3",

  white: "#FFFFFF",
  black: "#1F2937",

  success: "#0FA958",
  error: "#DC2626",
};

export const COLORS = {
  ...BASE_COLORS,

  withOpacity: (
    colorKey: keyof typeof BASE_COLORS,
    opacity: number,
  ): string => {
    const hexColor = BASE_COLORS[colorKey];

    const boundedOpacity = Math.min(Math.max(opacity, 0), 100);

    const alphaValue = Math.round((boundedOpacity / 100) * 255);

    const alphaHex = alphaValue.toString(16).toUpperCase().padStart(2, "0");

    return `${hexColor}${alphaHex}`;
  },
};
