import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>
        Listando <Text style={styles.movieCount}>1234</Text> itens
      </Text>
      <View style={styles.card}>
        <View style={styles.upperSubCard}>Filme 1</View>
        <View style={styles.bottomSubCard}>Filme 1</View>
      </View>

      <View>
        <Text>Filme 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  headTitle: {
    textAlign: "center",
    color: "white",
    margin: 30,
  },
  movieCount: {
    color: "#F9284E",
  },
  card: {
    overflow: "hidden",
    borderRadius: 80,
    margin: 16,
  },
  upperSubCard: {
    backgroundColor: "#181818",
  },
  bottomSubCard: {
    backgroundColor: "#202020",
  },
});
