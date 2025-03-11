-- Create the account database
CREATE DATABASE account;

-- Connect to the account database
\c account;

-- Create user for the account database
CREATE USER account_usr WITH ENCRYPTED PASSWORD 'account_pwd';


-- Create Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    type INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Apply permissions after table creation
GRANT USAGE ON SCHEMA public TO account_usr;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO account_usr;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO account_usr;
