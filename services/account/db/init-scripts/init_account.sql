-- Create the account database
CREATE DATABASE account;

-- Connect to the account database
\c account;

-- Create user for the account database
CREATE USER account_usr WITH ENCRYPTED PASSWORD 'account_pwd';


-- Create Users table
CREATE TABLE client (
                        user_id SERIAL PRIMARY KEY,
                        first_name VARCHAR(50) NOT NULL,
                        last_name VARCHAR(50) NOT NULL,
                        email VARCHAR(100) NOT NULL UNIQUE,
                        password_hash VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        user_type_id integer
);

CREATE TABLE user_type (
                           user_type_id serial PRIMARY KEY,
                           user_type_name VARCHAR(50) NOT NULL
);

-- Create an index on email for faster lookups
CREATE INDEX idx_users_email ON client(email);


-- Apply permissions after table creation
GRANT USAGE ON SCHEMA public TO account_usr;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO account_usr;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO account_usr;

insert into user_type (user_type_name) values ('Client');
insert into user_type (user_type_name) values ('Restaurateur');
insert into user_type (user_type_name) values ('Développeur tiers');
insert into user_type (user_type_name) values ('Livreur');
