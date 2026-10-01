import { StyleSheet, Text, View } from "react-native";

export default function AppHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aziwa</Text>
      <Text>Authenticated App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
});
