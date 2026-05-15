import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../onboarding";

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled: boolean;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[style, disabled && { opacity: 0.6 }]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.white,
  },
});

export default CustomButton;
