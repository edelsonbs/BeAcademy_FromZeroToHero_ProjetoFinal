-- Criando o banco de dados
CREATE DATABASE IF NOT EXISTS db_from_zero_to_hero
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
    
USE db_from_zero_to_hero;
    
-- Criando a tabela usuários
CREATE TABLE users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(45) NOT NULL,
    number_friends INT NOT NULL
);

-- Criando a tabela de posts
CREATE TABLE posts(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    post TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user INT UNIQUE,

    FOREIGN KEY (fk_user) REFERENCES users(id)
);

-- Criando a tabela de comentários
CREATE TABLE comments(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user INT,
    fk_post INT,

    FOREIGN KEY (fk_user) REFERENCES users(id),
    FOREIGN KEY (fk_post) REFERENCES posts(id)
);

-- Inserindo dados na tabela usuários (users)
INSERT INTO users (username,email,password,number_friends) VALUES ('João Batista','joao@gmail.com', 'sedW43f4T$iI', 214);
INSERT INTO users (username,email,password,number_friends) VALUES ('Celia Matos','celia@gmail.com','21ecR2foe#', 307);
INSERT INTO users (username,email,password,number_friends) VALUES ('Jorge Moura','jorge@hotmail.com','vnfwjf@#f1',275);
INSERT INTO users (username,email,password,number_friends) VALUES ('Lilian Souza','lilian@gmail.com','MvdcO3r4f',935);
INSERT INTO users (username,email,password,number_friends) VALUES ('Ana Beatriz','ana@globo.com','4fMvweOJ24V1D',734);
INSERT INTO users (username,email,password,number_friends) VALUES ('Carla Ambrosio','carla@terati.com.br','urgd23f8Wg',433);

-- Inserindo dados na tabela de posts (posts)
INSERT INTO posts (post, fk_user) VALUES ('Já viram a nova função do CSS?',1);
INSERT INTO posts (post, fk_user) VALUES ('O Rio de Janeiro continua lindo!',2);
INSERT INTO posts (post, fk_user) VALUES ('Não aguento mais',3);
INSERT INTO posts (post, fk_user) VALUES ('Ouvindo Caetano...',4);
INSERT INTO posts (post, fk_user) VALUES ('Alguém anima um rolê de bike?',5);
INSERT INTO posts (post, fk_user) VALUES ('Estudando Java :)',6);

-- Inserindo dados na tabela de comentários (comments)
INSERT INTO comments (comment, fk_user, fk_post) VALUES ('Incrível! Vai ajudar muito.',3,1);
INSERT INTO comments (comment, fk_user, fk_post) VALUES ('Queria estar aí',6,2);
INSERT INTO comments (comment, fk_user, fk_post) VALUES ('O que está acontecendo?',2,3);
INSERT INTO comments (comment, fk_user, fk_post) VALUES ('Bom demais',1,4);
INSERT INTO comments (comment, fk_user, fk_post) VALUES ('Eu! Me chama 0/',4,5);
INSERT INTO comments (comment, fk_user, fk_post) VALUES ('Coragem kkk',5,6);
INSERT INTO comments (comment, fk_user, fk_post) VALUES ('Ainda não...',4,1);
