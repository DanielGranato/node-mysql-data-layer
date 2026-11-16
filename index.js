import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({ input: stdin, output: stdout });

async function iniciarMenu() {
  let opcion = "";

  while (opcion !== "3") {
    console.log("\nSERVICIO DE PELICULAS");
    console.log("1. Listar peliculas");
    console.log("2. Agregar pelicula");
    console.log("3. Salir");

    opcion = await rl.question("Opción: ");

    switch (opcion) {
      case "1":
        console.log("Listar peliculas: en construcción");
        break;
      case "2":
        console.log("Agregar pelicula: en construcción");
        break;
      case "3":
        console.log("Hasta luego");
        break;
      default:
        console.log("Opción inválida");
    }
  }

  rl.close();
}

iniciarMenu();
