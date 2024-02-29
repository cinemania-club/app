import { Center, Spinner, Text, VStack } from "@gluestack-ui/themed";
import axios from "axios";
import { useEffect, useState } from "react";

import MovieCard, { Movie } from "../../components/movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <Center bg="$darkBackground" flex={1}>
        <Spinner color="$primary" size="large" />
      </Center>
    );
  }

  return (
    <VStack bg="$darkBackground" flex={1} p="$4" space="lg">
      <Text color="$text" size="md" my="$2">
        Listando{" "}
        <Text bold color="$primary">
          {movies.length}
        </Text>{" "}
        itens
      </Text>

      {movies.map((movie) => (
        <MovieCard key={movie._id} movieData={movie} />
      ))}
    </VStack>
  );

  async function getMovies() {
    const response = await axios.get<Movie[]>(
      `${process.env.EXPO_PUBLIC_API_URL}/movies`,
    );

    setMovies(response.data);
    setLoading(false);
  }
}
