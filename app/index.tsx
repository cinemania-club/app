import { Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

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
          <View style={[{ backgroundColor: "teal" }, styles.UpperSubCardInfo]}>
            <Text style={styles.upperSubCardMovieTitle}>
              Oppenheimer Oppenheimer Oppenheimer
            </Text>
            <View
              style={[{ backgroundColor: "yellow" }, styles.upperSubCardEmojis]}
            >
              <FontAwesome5
                name="laugh-squint"
                size={24}
                color="black"
                style={{ marginRight: 12 }}
              />
              <FontAwesome5
                name="grin-hearts"
                size={24}
                color="black"
                style={{ marginRight: 12 }}
              />
              <Text>2023</Text>
            </View>
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
    backgroundColor: "pink",
    height: 128,
  },
  upperSubCardPosterImage: {
    width: 100,
    height: 150,
    resizeMode: "stretch",
    backgroundColor: "white",
  },
  UpperSubCardInfo: {
    flex: 1,
    padding: 12,
  },
  upperSubCardMovieTitle: {
    color: "white",
    marginBottom: 16,
  },
  upperSubCardEmojis: {
    flexDirection: "row",
    alignItems: "center",
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
