import React from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

import { COLORS } from "@/constants/theme";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  startContent,
  endContent,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabledButton]}
    >
      {startContent && <View style={styles.startContent}>{startContent}</View>}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {endContent && <View style={styles.endContent}>{endContent}</View>}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    height: 62,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },

  startContent: {
    marginRight: 8,
  },

  endContent: {
    marginLeft: 8,
  },
});
