create database gato_caolho;
\c gato_caolho
set datestyle to 'ISO,DMY';

-- ##########################################################################################################################################################
-- CREATE TABLES
-- ##########################################################################################################################################################

CREATE TABLE IF NOT EXISTS "usuario" (
  "id_usuario" SERIAL PRIMARY KEY,
  "nome" VARCHAR(60) NOT NULL,
  "cpf" VARCHAR(18) NOT NULL UNIQUE,
  "senha" VARCHAR(100) NOT NULL,
  "email" VARCHAR(256) NOT NULL,
  "telefone" BIGINT,
  "comanda_id" INTEGER
);

CREATE TABLE IF NOT EXISTS "cargo" (
  "id_cargo" INTEGER PRIMARY KEY,
  "cargo" VARCHAR(30) NOT NULL,
  "id_usuario" INTEGER NOT NULL,
  "status" BOOLEAN

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
                  (2, 'Funcionário'),
                  (3, 'Cliente');

insert into usuario (nome, cpf, senha, email, cargo_id, status, comanda_id) values 
                    ('Julia', '662.929.240-50', 'senhavalida', 'juju@gmail.com', 3, true, null),
                    ('Gatinha Comunista', '571.049.780-03', 'senhavalida', 'gata@gmail.com', 3, true, null),
                    ('Bruno', '172.336.570-09', 'senhavalida', 'brunao@gmail.com', 1, true, null),
                    ('Fran', '001.720.750-92', 'senhavalida', 'fran@gmail.com', 2, true, null);

insert into telefone  (usuario_id, telefone) values 
                      (1, 48984468381),
											(2, 99999999999);
