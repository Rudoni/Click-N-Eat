-- Create the restaurant database
CREATE DATABASE orders;

-- Connect to the restaurant database
\c orders;

-- Create user for the restaurant database
CREATE USER order_usr WITH ENCRYPTED PASSWORD 'order_pwd';

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    restaurant_id integer NOT NULL,
    user_id integer NOT NULL,
    restaurant_description VARCHAR(300),
    image_main_binary BYTEA,
    image_back_binary BYTEA,
    address_country VARCHAR(50),
    address_city VARCHAR(100),
    address_postal_code VARCHAR(20),
    address_name VARCHAR(100)
);

CREATE TABLE article_types (
    article_type_id SERIAL PRIMARY KEY,
    article_type_name VARCHAR(50) NOT NULL
);

CREATE TABLE article (
    article_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    article_type_id INTEGER NOT NULL,
    article_name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    can_be_sold_individually BOOLEAN DEFAULT TRUE
);

CREATE TABLE menu (
    menu_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    menu_name VARCHAR(100),
    price NUMERIC(10,2)
);

CREATE TABLE list_article_menu (
    menu_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL
);


-- Apply permissions after table creation
GRANT USAGE ON SCHEMA public TO restaurant_usr;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO restaurant_usr;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO restaurant_usr;

insert into article_types (article_type_name) values ('Boisson');
insert into article_types (article_type_name) values ('Dessert');
insert into article_types (article_type_name) values ('Entree');
insert into article_types (article_type_name) values ('Plat');
insert into article_types (article_type_name) values ('Accompagnement');
