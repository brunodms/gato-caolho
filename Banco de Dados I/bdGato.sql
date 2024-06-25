create database gato_caolho;
\c gato_caolho
set datestyle to 'ISO,DMY';

-- ##########################################################################################################################################################
-- CREATE TABLES
-- ##########################################################################################################################################################
CREATE TABLE IF NOT EXISTS "usuario" (
  "id_usuario" SERIAL PRIMARY KEY,
  "nome" VARCHAR(100) NOT NULL,
  "cpf" VARCHAR(20) NOT NULL,
  "senha" VARCHAR(100) NOT NULL,
  "email" VARCHAR(256) NOT NULL,
  "telefone" BIGINT NOT NULL,
  "cargo_id" INTEGER NOT NULL,
  "status" BOOLEAN,
  "comanda_id" INTEGER
);

CREATE TABLE IF NOT EXISTS "cargo" (
  "id_cargo" INTEGER PRIMARY KEY,
  "cargo" VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS "comanda" (
  "id_comanda" SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS "venda" (
  "id_venda" SERIAL PRIMARY KEY,
  "comanda_id" INTEGER NOT NULL,
  "forma_pagamento_id" INTEGER NOT NULL,
  "data_venda" DATE NOT NULL,
  "hora_venda" TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "forma_pagamento" (
  "id_forma_pagamento" SERIAL PRIMARY KEY,
  "nome" VARCHAR(20) NOT NULL,
  "status" BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "pedido" (
  "id_pedido" SERIAL PRIMARY KEY,
  "comanda_id" INTEGER NOT NULL,
  "mesa" INTEGER NOT NULL,
  "valor" INTEGER NOT NULL,
  "status" BOOLEAN NOT NULL,
  "data_pedido" DATE NOT NULL,
  "hora_pedido" TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "item_pedido" (
  "id_item_pedido" SERIAL PRIMARY KEY,
  "pedido_id" INTEGER NOT NULL,
  "produto_id" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "produto" (
  "id_produto" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50) NOT NULL,
  "descricao" VARCHAR(200) NOT NULL,
  "unidade_medida" VARCHAR(5) NOT NULL,
  "valor" INTEGER NOT NULL,
  "marca" VARCHAR(15),
  "secao_id" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "secao" (
  "id_secao" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "desconto" (
  "id_desconto" SERIAL PRIMARY KEY,
  "produto_id" INTEGER NOT NULL,
  "valor_desconto" INTEGER NOT NULL,
  "descricao" VARCHAR(30),
  "data_inicial" DATE,
  "data_final" DATE,
  "hora_inicial" TIME,
  "hora_final" TIME
);

-- ##########################################################################################################################################################
-- FOREIGN KEYS
-- ##########################################################################################################################################################


ALTER TABLE "cargo" ADD CONSTRAINT "fk_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "usuario" ADD CONSTRAINT "fk_comanda_cliente" FOREIGN KEY ("comanda_id") REFERENCES "comanda" ("id_comanda");

ALTER TABLE "venda" ADD CONSTRAINT "fk_venda_comanda" FOREIGN KEY ("comanda_id") REFERENCES "comanda" ("id_comanda");

ALTER TABLE "venda" ADD CONSTRAINT "fk_venda_forma_pagamento" FOREIGN KEY ("forma_pagamento_id") REFERENCES "forma_pagamento" ("id_forma_pagamento");

ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_comanda" FOREIGN KEY ("comanda_id") REFERENCES "comanda" ("id_comanda");

ALTER TABLE "item_pedido" ADD CONSTRAINT "fk_item_pedido_pedido" FOREIGN KEY ("pedido_id") REFERENCES "pedido" ("id_pedido");

ALTER TABLE "item_pedido" ADD CONSTRAINT "fk_item_pedido_produto" FOREIGN KEY ("produto_id") REFERENCES "produto" ("id_produto");

ALTER TABLE "produto" ADD CONSTRAINT "fk_produto_secao" FOREIGN KEY ("secao_id") REFERENCES "secao" ("id_secao");

ALTER TABLE "desconto" ADD CONSTRAINT "fk_desconto_produto" FOREIGN KEY ("produto_id") REFERENCES "produto" ("id_produto");

-- ##########################################################################################################################################################
-- INSERTS
-- ##########################################################################################################################################################
insert into cargo (id_cargo, cargo) values 
                  (1, 'Gerente'), 
                  (2, 'atendente'),
                  (3, 'Cliente');

insert into comanda (id_comanda) select * from generate_series(1,100);

INSERT INTO "usuario" (nome, cpf, senha, email,telefone, cargo_id, status, comanda_id) VALUES 
('Alfred Silva', '123.456.789-00', 'senha123', 'alice.silva@example.com', 49987654321, 1, TRUE, 1),
('Bruno Souza', '987.654.321-00', 'senha123', 'bruno.souza@example.com', 54987654322, 3, TRUE, 2),
('Carla Mendes', '456.789.123-00', 'senha123', 'carla.mendes@example.com',49987654323, 2, FALSE, NULL),
('Daniel Rocha', '789.123.456-00', 'senha123', 'daniel.rocha@example.com', 11987654324, 3, TRUE, 3);


INSERT INTO "secao" (nome) VALUES
('Hambúrgueres'),
('Pizzas'),
('Bebidas'),
('Sobremesas');

INSERT INTO "produto" (nome, descricao, unidade_medida, valor, marca, secao_id) VALUES
('Burguer Gato Caolho', 'Hambúrguer com queijo, alface e tomate', 'UN', 20.00, 'gato caolho', 1),
('Burguer Gato Persa', 'Hambúrguer com queijo e bacon', 'UN', 24.00, 'Marca B', 1),
('Brisa da Manha', 'Chopp', '350ml', 12.00, 'Artesanal', 3),
('Pizza Calabresa', 'Pizza com calabresa e cebola', 'G', 60.00, 'Marca D', 2);


INSERT INTO "desconto" (produto_id, valor_desconto, descricao, data_inicial, data_final, hora_inicial, hora_final) VALUES
(1, 5, 'Desconto de 5 r no Gato Caolho', '2024-06-24', '2024-06-25', '12:00:00', '14:00:00'),
(2, 5, 'Desconto de 5 r no Gato Persa', '2024-06-24', '2024-06-25', '13:00:00', '15:00:00'),
(3, 3, 'Desconto de 3 r no chopp BA', '2024-06-24', '2024-06-25', '14:00:00', '16:00:00'),
(4, 10, 'Desconto de 8 r na Pizza', '2024-06-24', '2024-06-25', '15:00:00', '17:00:00');

INSERT INTO "pedido" (comanda_id, mesa, valor, status, data_pedido, hora_pedido) VALUES
(1, 1, 5000, TRUE, '2024-06-24', '12:30:00'),
(2, 2, 7000, TRUE, '2024-06-24', '13:45:00'),
(3, 3, 9000, FALSE, '2024-06-24', '14:00:00'),
(4, 4, 11000, TRUE, '2024-06-24', '15:20:00');

INSERT INTO "item_pedido" (pedido_id, produto_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);


INSERT INTO "venda" (comanda_id, forma_pagamento_id, data_venda, hora_venda) VALUES
(1, 1, '2024-06-24', '12:30:00'),
(2, 2, '2024-06-24', '13:45:00'),
(3, 3, '2024-06-24', '14:00:00'),
(4, 1, '2024-06-24', '15:20:00');

INSERT INTO "forma_pagamento" (nome, status) VALUES
('Dinheiro', TRUE),
('Cartão de Crédito', TRUE),
('Cartão de Débito', TRUE),
('Pix', TRUE);


INSERT INTO venda (comanda_id, forma_pagamento_id, data_venda, hora_venda)
VALUES (1, 1, '2024-06-24', '12:30:00');
INSERT INTO venda (comanda_id, forma_pagamento_id, data_venda, hora_venda)
VALUES (2, 2, '2024-06-24', '13:45:00');
INSERT INTO venda (comanda_id, forma_pagamento_id, data_venda, hora_venda)
VALUES (3, 3, '2024-06-24', '14:00:00');
INSERT INTO venda (comanda_id, forma_pagamento_id, data_venda, hora_venda)
VALUES (4, 1, '2024-06-24', '15:20:00');


