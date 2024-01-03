import express from 'express';
import path from 'path';
import pg from 'pg';
import 'dotenv/config';
import bodyParser from 'body-parser';

const { Pool } = pg;
const app = express();

// port
const PORT = process.env.PORT;

// database
let dbURL = process.env.PG_DATABASE_URL;

let pool = new Pool ({
    connectionString: dbURL
});

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(logger);

// get route
app.get('/notes', async (req, res) => {
    try {
        let data = await pool.query('SELECT * FROM notes;');
        res.status(200).json(data.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('error!!')
    }
})

// post route 
app.post('/notes', async (req, res) => {
    try {
        let text = 'INSERT INTO notes (title, content) VALUES ($1, $2)';
        let values = [req.body.title, req.body.content];
        let result = await pool.query(text, values);
        res.status(200).json(result);
    } catch (err) {
        console.error(err)
        res.status(500).send('error!!')
    }
})

app.delete('/notes/:note_id', async (req, res) => {
    try {
        const noteId = req.params.note_id;
        const deleteQuery = 'DELETE FROM notes WHERE note_id = $1';
        const deleteResult = await pool.query(deleteQuery, [noteId]);
        
        if (deleteResult.rowCount === 0) {
            return res.status(404).send('Note not found');
        }
        
        res.status(200).send('Note deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting note');
    }
});

app.delete('/notes', async (req, res) => {
    try {
        await pool.query('DELETE FROM notes;')
        res.status(200).send('Cleared successfully')
    } catch (error) {
        console.error(error)
        res.status(500).send('Clear failed')
    }
})

// Server listening 
function logger(req, res, next) {
    console.log("Request method: ", req.method);
    console.log("Request path:", req.url);
    next()
}

app.listen(PORT, () => console.log('Listening on port ', PORT))