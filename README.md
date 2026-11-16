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
- [ ] Connection pool in a single module, configured through environment variables
- [ ] `SELECT` queries with result destructuring (`const [rows]`)
- [ ] `INSERT`, `UPDATE` and `DELETE` with prepared statements (`?` placeholders)
- [ ] Data layer: all SQL for an entity in one file, the rest of the code calls functions
- [ ] Error handling with `try/catch`

## Concepts practiced

- **Connection pool**: connections are opened once and reused, instead of opening one per query
- **async/await**: every database call returns a Promise and must be awaited
- **Prepared statements**: values are sent separately from the SQL text, which prevents SQL injection
- **Layered structure**: connection, data access and user interface live in separate modules

## Project structure

```
.
├── config/
│   └── db.js          # connection pool (created once, imported where needed)
├── services/          # data layer: one file per entity, all SQL lives here
├── index.js           # terminal menu, calls the data layer
├── .env.example
├── package.json
└── .gitignore
```

## How to run

**1. Start MySQL/MariaDB** (for example, from the XAMPP Control Panel) and create the database used by the project.

**2. Configure the credentials.** Copy `.env.example` to `.env` and fill in your local values:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME=your_database
MYSQL_PORT=3306
```

**3. Install the dependencies and start the app:**

```bash
npm install
node index.js
```

## Menu

```
SERVICIO DE PELICULAS
1. Listar peliculas
2. Agregar pelicula
3. Salir
```

## Notes

- `.env` holds real credentials and is never versioned.
- `node_modules/` is not versioned; `npm install` recreates it from `package.json`.
- Identifiers and menu texts are in Spanish, following the course this project is based on (UTN Backend Developer, Module 2: Relational Databases).
