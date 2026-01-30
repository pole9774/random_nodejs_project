-- database: db.db
DROP TABLE IF EXISTS Document;

CREATE TABLE Document (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    pos INTEGER NOT NULL
);

INSERT INTO Document (title, description, pos) VALUES
('Sample Document 1', 'This is the description for sample document One.', 1),
('Sample Document 2', 'This is the description for sample document Two.', 2),
('Sample Document 3', 'This is the description for sample document Three.', 3);
