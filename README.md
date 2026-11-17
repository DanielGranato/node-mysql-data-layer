# Node MySQL Data Layer

Data access layer in Node.js with mysql2: connection pool, prepared statements, async/await and error handling.

A terminal application for managing movies, built while studying how a Node.js back end talks to a relational database without an ORM: plain SQL, sent safely through the `mysql2` driver.

## Stack

- **Node.js** (ES modules)
- **mysql2** – MySQL/MariaDB driver with Promise support
- **MySQL / MariaDB** – database server (XAMPP in local development)
- **dotenv** – loads credentials from a `.env` file, keeping them out of the code
- **node:readline** – interactive terminal menu

## Progress

- [x] Interactive terminal menu with `readline/promises` and `async/await`
- [x] Connection pool configured through environment variables
- [x] Table creation on startup (`crearTabla`, `CREATE TABLE IF NOT EXISTS`)
- [x] `SELECT` queries with result destructuring (`const [rows]`)
- [x] `INSERT`, `UPDATE` and `DELETE` with prepared statements (`?` placeholders)
- [x] Error handling with `try/catch`
- [x] Full CRUD for movies
- [ ] Move the connection pool to its own module (`config/db.js`)
- [ ] Data layer: all SQL for an entity in one file, the rest of the code calls functions

## CRUD

| Operation | Function | SQL |
|---|---|---|
| Create | `agregarPelicula` | `INSERT` |
| Read | `listarPeliculas` | `SELECT` |
| Update | `actualizarPelicula` | `UPDATE` |
| Delete | `eliminarPelicula` | `DELETE` (asks for confirmation) |

`UPDATE` and `DELETE` use `affectedRows` to tell whether the given id exists.

## Concepts practiced

- **Connection pool**: connections are opened once and reused, instead of opening one per query
- **async/await**: every database call returns a Promise and must be awaited
- **Prepared statements**: values are sent separately from the SQL text, which prevents SQL injection

## Project structure

Everything currently lives in `index.js`. Splitting it into layers is the next step (see Progress).

```
.
├── database/
│   └── schema.sql     # creates the peliculas_db database
├── index.js           # pool, CRUD functions and terminal menu
├── .env.example
├── package.json
└── .gitignore
```

## How to run

**1. Start MySQL/MariaDB** (for example, from the XAMPP Control Panel) and create the database by running `database/schema.sql`:

```bash
mysql -u root < database/schema.sql
```

You can also paste its content into the SQL tab of phpMyAdmin. The `peliculas` table is created by the app on startup.

**2. Configure the credentials.** Copy `.env.example` to `.env` and fill in your local values:

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME=peliculas_db
```

**3. Install the dependencies and start the app:**

```bash
npm install
npm start
```

## Menu

```
SERVICIO DE PELICULAS
1. Listar peliculas
2. Agregar pelicula
3. Actualizar pelicula
4. Eliminar pelicula
5. Salir
```

## Notes

- `.env` holds real credentials and is never versioned.
- `node_modules/` is not versioned; `npm install` recreates it from `package.json`.
- Identifiers and menu texts are in Spanish, following the course this project is based on (UTN Backend Developer, Module 2: Relational Databases).
