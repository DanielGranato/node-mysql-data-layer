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

async function crearTabla() {
  const sql = `
    CREATE TABLE IF NOT EXISTS peliculas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(150) NOT NULL,
      director VARCHAR(100),
      anio INT NOT NULL,
      genero VARCHAR(50) NOT NULL
    )
  `;

  try {
    await pool.execute(sql);
    console.log("Tabla 'peliculas' lista");
  } catch (error) {
    console.error("Error al crear la tabla:", error.message);
  }
}

async function agregarPelicula() {
  console.log("\n=== AGREGAR PELICULA ===");
  const titulo = (await rl.question("Título: ")).trim();
  const director = (await rl.question("Director (opcional): ")).trim();
  const anio = Number.parseInt(await rl.question("Año: "), 10);
  const genero = (await rl.question("Género: ")).trim();

  if (!titulo || !genero || Number.isNaN(anio)) {
    console.log("Datos inválidos: título, año y género son obligatorios");
    return;
  }

  try {
    const [resultado] = await pool.execute(
      "INSERT INTO peliculas (titulo, director, anio, genero) VALUES (?, ?, ?, ?)",
      [titulo, director || null, anio, genero]
    );
    console.log(`Pelicula agregada con id ${resultado.insertId}`);
  } catch (error) {
    console.error("Error al agregar la pelicula:", error.message);
  }
}

async function listarPeliculas() {
  console.log("\n=== LISTAR PELICULAS ===");

  try {
    const [peliculas] = await pool.execute(
      "SELECT id, titulo, director, anio, genero FROM peliculas ORDER BY id"
    );

    if (peliculas.length === 0) {
      console.log("No hay peliculas registradas");
      return;
    }

    console.table(peliculas);
  } catch (error) {
    console.error("Error al listar las peliculas:", error.message);
  }
}

async function actualizarPelicula() {
  console.log("\n=== ACTUALIZAR PELICULA ===");

  const id = Number.parseInt(await rl.question("Id de la pelicula: "), 10);
  if (Number.isNaN(id)) {
    console.log("Id inválido");
    return;
  }

  const titulo = (await rl.question("Nuevo título: ")).trim();
  const director = (await rl.question("Nuevo director (opcional): ")).trim();
  const anio = Number.parseInt(await rl.question("Nuevo año: "), 10);
  const genero = (await rl.question("Nuevo género: ")).trim();

  if (!titulo || !genero || Number.isNaN(anio)) {
    console.log("Datos inválidos: título, año y género son obligatorios");
    return;
  }

  try {
    const [resultado] = await pool.execute(
      "UPDATE peliculas SET titulo = ?, director = ?, anio = ?, genero = ? WHERE id = ?",
      [titulo, director || null, anio, genero, id]
    );

    if (resultado.affectedRows === 0) {
      console.log(`No existe una pelicula con id ${id}`);
      return;
    }
    console.log(`Pelicula ${id} actualizada`);
  } catch (error) {
    console.error("Error al actualizar la pelicula:", error.message);
  }
}

async function iniciarMenu() {
  await crearTabla();

  let opcion = "";

  while (opcion !== "4") {
    console.log("\nSERVICIO DE PELICULAS");
    console.log("1. Listar peliculas");
    console.log("2. Agregar pelicula");
    console.log("3. Actualizar pelicula");
    console.log("4. Salir");

    opcion = await rl.question("Opción: ");

    switch (opcion) {
      case "1":
        await listarPeliculas();
        break;
      case "2":
        await agregarPelicula()
        break;
      case "3":
        await actualizarPelicula();
        break;
      case "4":
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
