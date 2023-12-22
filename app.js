import express from 'express';
import path from 'path';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const app = express();

const PORT = 8080;

// deploying a database
let dbURL = process.env.PG_DATABASE_URL; // might need to change

let pool = new Pool ({
    connectionString: dbURL
});

app.use(express.json());

app.use(logger);







function logger(req, res, next) {
    console.log("Request method: ", req.method);
    console.log("Request path:", req.url);
    next()
}

// Server listening 

app.listen(PORT, () => console.log('Listening on port ', PORT))