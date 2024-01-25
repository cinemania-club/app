function pegaFilme() {
  const promise = new Promise(function (resolve, reject) {
    /* missing implementation */
    setTimeout(() => {
      console.log("o filme chegou do backend");
      reject([{ name: "Titanic" }]);
    }, 5000);
  });

  return promise;
}

function syncPegaFilme() {
  console.log("o filme chegou do backend");
  return [{ name: "Titanic" }];
}

function main() {
  console.log("antes do pega filme");

  pegaFilme()
    .then(() => console.log("depois do pega filme, esperando"))
    .catch(() => console.log("deu errado"));

  console.log("depois do pega filme, sem esperar");
}

console.log("antes do main");
main();
// console.log("depois do main");
