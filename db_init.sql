CREATE DATABASE IF NOT EXISTS contact_db;
USE contact_db;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    title VARCHAR(50),
    company VARCHAR(100),
    linkedin VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    place VARCHAR(50),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO contacts (fname, lname, title, company, linkedin, email, method)
VALUES
('John', 'Doe', 'Software Engineer', 'TechCorp', 'https://linkedin.com/in/johndoe', 'johndoe@example.com', 'meetup'),
('Jane', 'Smith', 'Product Manager', 'BizInc', 'https://linkedin.com/in/janesmith', 'janesmith@example.com', 'meetup');
