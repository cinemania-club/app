export function getMovies() {
  const promise = new Promise(function (resolve, reject) {
    /* missing implementation */
    setTimeout(() => {
      resolve([
        { name: "Oppenheimer", duracao: 120 },
        { name: "Titanic", duracao: 185 },
      ]);
    }, 5000);
  });

  return promise;
}
