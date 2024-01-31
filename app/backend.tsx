export type MovieType = {
  id: string;
  title: string;
  duration: number;
  releaseYear: number;
  grade: number;
};

export function fetchMovies() {
  const promise = new Promise<MovieType[]>(function (resolve, reject) {
    /* missing implementation */
    setTimeout(() => {
      resolve([
        {
          id: "123",
          title: "Oppenheimer",
          releaseYear: 1999,
          duration: 180,
          grade: 2.5,
        },
        {
          id: "456",
          title: "Titanic",
          releaseYear: 2012,
          duration: 120,
          grade: 4.53,
        },
      ]);
    }, 5000);
  });

  return promise;
}
