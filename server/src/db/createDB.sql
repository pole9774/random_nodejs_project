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
('Sample Document 3', 'This is the description for sample document Three.', 3),
('Sample Document 4', 'This is the description for sample document Four.', 4),
('Sample Document 5', 'This is the description for sample document Five.', 5),
('Sample Document 6', 'This is the description for sample document Six.', 6),
('Sample Document 7', 'This is the description for sample document Seven.', 7),
('Sample Document 8', 'This is the description for sample document Eight.', 8),
('Sample Document 9', 'This is the description for sample document Nine.', 9);
