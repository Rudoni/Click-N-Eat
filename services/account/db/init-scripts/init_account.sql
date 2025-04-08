-- Create the account database
CREATE DATABASE account;

-- Connect to the account database
\c account;

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

CREATE TABLE adress (
    adress_id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    adress_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES client(user_id)
        ON DELETE CASCADE
);


insert into user_type (user_type_name) values ('client');
insert into user_type (user_type_name) values ('Restaurateur');
insert into user_type (user_type_name) values ('Développeur tiers');
insert into user_type (user_type_name) values ('Livreur');
insert into user_type (user_type_name) values ('Developpeur interne');
insert into user_type (user_type_name) values ('Commercial');

CREATE TABLE referral_codes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES client(user_id) ON DELETE CASCADE,
  code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER REFERENCES client(user_id),
  referred_id INTEGER REFERENCES client(user_id),
  created_at TIMESTAMP DEFAULT NOW()
);
