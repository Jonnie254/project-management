CREATE TABLE Users (id VARCHAR(255)PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(20) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(10) DEFAULT 'user' NOT NULL )

  