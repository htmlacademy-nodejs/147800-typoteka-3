DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS article_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    picture character varying(50),
    small_picture character varying(50),
    password character varying(200)
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title character varying(50) NOT NULL,
    created_at date NOT NULL,
    picture character varying(50),
    retina_picture character varying(50),
    announce text NOT NULL,
    full_text text NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT articles_fk FOREIGN KEY (user_id) REFERENCES users(id) 
        ON UPDATE CASCADE 
        ON DELETE RESTRICT
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    label character varying(50) NOT NULL
);

CREATE TABLE article_categories (
    article_id integer NOT NULL,
    category_id integer NOT NULL,
    CONSTRAINT article_categories_fk FOREIGN KEY (category_id) REFERENCES categories(id) 
        ON UPDATE SET NULL 
        ON DELETE RESTRICT,
    CONSTRAINT article_categories_fk_1 FOREIGN KEY (article_id) REFERENCES articles(id) 
        ON UPDATE SET NULL 
        ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    article_id integer NOT NULL,
    text text NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT comments_fk FOREIGN KEY (article_id) REFERENCES articles(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
    CONSTRAINT comments_fk_1 FOREIGN KEY (user_id) REFERENCES users(id) 
        ON UPDATE CASCADE 
        ON DELETE RESTRICT
);