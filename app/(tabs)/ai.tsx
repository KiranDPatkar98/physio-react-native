import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

const AI = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <Text style={styles.subtitle}>AI features will come here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default AI;