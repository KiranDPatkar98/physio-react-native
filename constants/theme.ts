const BASE_COLORS = {
  primary: "#003F7D",
  secondary: "#11C5BB",
  tertiary: "#22D3C5",
  background: "#F5F9FC",
  textDark: "#0B1F33",
  grayAccent: "#D9E4EC",
  white: "#FFFFFF",
  gray: "#E5E7EB",
  black: "#1F2937",
};

export const COLORS = {
  ...BASE_COLORS,

  withOpacity: (
    colorKey: keyof typeof BASE_COLORS,
    opacity: number,
  ): string => {
    const hexColor = BASE_COLORS[colorKey];

    // Ensure the opacity bound stays safely between 0 and 100
    const boundedOpacity = Math.min(Math.max(opacity, 0), 100);

    // Convert 0-100 percentage to a 0-255 integer
    const alphaValue = Math.round((boundedOpacity / 100) * 255);

    // Convert the integer to a 2-digit hex string and pad with zero if needed
    const alphaHex = alphaValue.toString(16).toUpperCase().padStart(2, "0");

    // Combine original hex color with the calculated alpha suffix
    return `${hexColor}${alphaHex}`;
  },
};
