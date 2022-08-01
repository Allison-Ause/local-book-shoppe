-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

-- TABLES = Books, Authors, books_authors

DROP table if exists books;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
)

INSERT INTO books (title, released) VALUES
('Gods War', 2004),
('The Stars Are Legion', 2018),
('The Midnight Library', 2020),
('The Comfort Book', 2022),
('The Love Hypothesis', 2021);

