import { StyleSheet, Text, View } from "react-native";

const Exercises = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      <Text style={styles.subtitle}>Exercises content will come here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default Exercises;
