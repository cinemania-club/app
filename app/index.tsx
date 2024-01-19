import { Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>
        Listando <Text style={styles.movieCount}>1234</Text> itens
      </Text>
      <View style={styles.card}>
        <View style={styles.upperSubCard}>
          <Image
            source={require("../assets/images/posters/oppenheimer-poster.webp")}
            style={styles.upperSubCardPosterImage}
          />
          <View>
            <Text style={styles.upperSubCardMovieTitle}>Oppenheimer</Text>
            <Image
              source={require("../assets/images/favicon.png")}
              style={styles.upperSubCardEmojis}
            />
          </View>
        </View>
        <View style={styles.bottomSubCard}>
          <Image
            source={require("../assets/images/favicon.png")}
            style={styles.bottomSubCardIcons}
          />
          <Image
            source={require("../assets/images/favicon.png")}
            style={styles.bottomSubCardIcons}
          />
          <Image
            source={require("../assets/images/favicon.png")}
            style={styles.bottomSubCardIcons}
          />
          <Image
            source={require("../assets/images/favicon.png")}
            style={styles.bottomSubCardIcons}
          />
          <Image
            source={require("../assets/images/favicon.png")}
            style={styles.bottomSubCardIcons}
          />
        </View>
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
    borderRadius: 16,
    margin: 16,
  },
  upperSubCard: {
    flexDirection: "row",
    backgroundColor: "#181818",
    height: 128,
  },
  upperSubCardPosterImage: {
    width: 100,
    height: 150,
    resizeMode: "stretch",
    backgroundColor: "white",
  },
  upperSubCardMovieTitle: {
    color: "white",
    marginTop: 16,
  },
  upperSubCardEmojis: {
    justifyContent: "space-around",
    width: 32,
    height: 32,
  },
  bottomSubCard: {
    backgroundColor: "#202020",
    height: 64,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSubCardIcons: {
    width: 32,
    height: 32,
    margin: 16,
  },
});
