import React, { useEffect, useRef } from "react";
import {
    StyleSheet,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  autoFocus?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  containerStyle,
  inputStyle,
  autoFocus = true,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Initialize refs
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // Auto-focus first input on mount
    if (autoFocus) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 500);
    }
  }, [autoFocus]);

  const handleOtpChange = (text: string, index: number) => {
    const newValues = [...value];
    newValues[index] = text;
    onChange(newValues);

    // Move to next input if digit entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newValues = [...value];
      newValues[index - 1] = "";
      onChange(newValues);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[styles.input, inputStyle]}
          value={value[index] || ""}
          onChangeText={(text) => handleOtpChange(text.slice(-1), index)}
          onKeyPress={({ nativeEvent }) =>
            handleKeyPress(nativeEvent.key, index)
          }
          keyboardType="numeric"
          maxLength={1}
          selectTextOnFocus
          editable={!disabled}
          returnKeyType={index === length - 1 ? "done" : "next"}
          onSubmitEditing={() => {
            if (index < length - 1) {
              inputRefs.current[index + 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  input: {
    flex: 1,
    maxWidth: 52,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EEF3",
    borderRadius: 16,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#0B1F33",
  },
});

export default OtpInput;
