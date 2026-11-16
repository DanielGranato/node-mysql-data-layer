import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DB_NAME || "peliculas_db",
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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
  await pool.end();
}

iniciarMenu();
