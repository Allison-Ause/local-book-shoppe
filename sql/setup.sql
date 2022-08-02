-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

-- TABLES = Books, Authors, books_authors

DROP table if exists books_authors;
DROP table if exists books;
Drop table if exists authors;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO books (title, released) VALUES
('Gods War', 2004),
('The Stars Are Legion', 2018),
('The Midnight Library', 2020),
('The Comfort Book', 2022),
('The Love Hypothesis', 2021),
('Good Omens', 2000);


CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE,
  pod VARCHAR
);

INSERT INTO authors (name, dob, pod) VALUES
('Katherine Hurley', '1986-05-05', 'Florida'), 
('Matt Haig', '1957-06-06', 'England'),
('Ali Hazelwood', '1998-07-07', 'Chicago'),
('Neil Gaiman', '1965-08-08', 'London'),
('Terry Prachet', '1945-09-09', 'UK');


CREATE table books_authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id INT,
  author_id INT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books_authors(book_id, author_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 4),
(6, 5);