import { StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/contexts/AuthContext";

export default function HomeScreen() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Memuat Aziwa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aziwa</Text>

      <Text>{session ? "Session aktif" : "Belum login"}</Text>
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
