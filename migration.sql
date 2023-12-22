DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    content TEXT
);

INSERT INTO notes (title, content) VALUES ('test', 'this is just a test');
INSERT INTO notes (title, content) VALUES ('more', 'this is just more tests');
