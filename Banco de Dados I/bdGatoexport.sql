CREATE TABLE "usuario" (
  "id_usuario" SERIAL PRIMARY KEY,
  "nome" VARCHAR(30) NOT NULL,
  "cpf" VARCHAR(14) NOT NULL,
  "senha" VARCHAR(100) NOT NULL,
  "email" VARCHAR(25) NOT NULL,
  "cargo_id" INTEGER,
  "status" BOOLEAN,
  "comanda_id" INTEGER
);

CREATE TABLE "telefone" (
  "id_telefone" SERIAL PRIMARY KEY,
  "usuario_id" INTEGER NOT NULL,
  "telefone" INTEGER NOT NULL
);

CREATE TABLE "cargo" (
  "id_cargo" INTEGER PRIMARY KEY,
  "cargo" VARCHAR(30) NOT NULL
);

CREATE TABLE "comanda" (
  "id_comanda" SERIAL PRIMARY KEY
);

CREATE TABLE "venda" (
  "id_venda" SERIAL PRIMARY KEY,
  "comanda_id" INTEGER NOT NULL,
  "forma_pagamento_id" INTEGER NOT NULL,
  "data_venda" DATE NOT NULL,
  "hora_venda" TIME NOT NULL
);

CREATE TABLE "forma_pagamento" (
  "id_forma_pagamento" SERIAL PRIMARY KEY,
  "nome" VARCHAR(20) NOT NULL,
  "status" BOOLEAN NOT NULL
);

CREATE TABLE "pedido" (
  "id_pedido" SERIAL PRIMARY KEY,
  "comanda_id" INTEGER NOT NULL,
  "mesa" INTEGER NOT NULL,
  "valor" INTEGER NOT NULL,
  "status" BOOLEAN NOT NULL,
  "data_pedido" DATE NOT NULL,
  "hora_pedido" TIME NOT NULL
);

CREATE TABLE "item_pedido" (
  "id_item_pedido" SERIAL PRIMARY KEY,
  "pedido_id" INTEGER NOT NULL,
  "produto_id" INTEGER NOT NULL
);

CREATE TABLE "produto" (
  "id_produto" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50) NOT NULL,
  "descricao" VARCHAR(200) NOT NULL,
  "unidade_medida" VARCHAR(5) NOT NULL,
  "valor" INTEGER NOT NULL,
  "marca" VARCHAR(15),
  "secao_id" INTEGER NOT NULL
);

CREATE TABLE "secao" (
  "id_secao" SERIAL PRIMARY KEY,
  "nome" VARCHAR(50) NOT NULL
);

CREATE TABLE "desconto" (
  "id_desconto" SERIAL PRIMARY KEY,
  "produto_id" INTEGER NOT NULL,
  "valor_desconto" INTEGER NOT NULL,
  "descricao" VARCHAR(30),
  "data_inicial" DATE,
  "data_final" DATE,
  "hora_inicial" TIME,
  "hora_final" TIME
);

ALTER TABLE "telefone" ADD CONSTRAINT "fk_usuario_telefone" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id_usuario");

ALTER TABLE "usuario" ADD CONSTRAINT "fk_cargo_funcionario" FOREIGN KEY ("cargo_id") REFERENCES "cargo" ("id_cargo");

ALTER TABLE "usuario" ADD CONSTRAINT "fk_comanda_cliente" FOREIGN KEY ("comanda_id") REFERENCES "comanda" ("id_comanda");

ALTER TABLE "venda" ADD CONSTRAINT "fk_venda_comanda" FOREIGN KEY ("comanda_id") REFERENCES "comanda" ("id_comanda");

ALTER TABLE "venda" ADD CONSTRAINT "fk_venda_forma_pagamento" FOREIGN KEY ("forma_pagamento_id") REFERENCES "forma_pagamento" ("id_forma_pagamento");

ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_comanda" FOREIGN KEY ("comanda_id") REFERENCES "comanda" ("id_comanda");

ALTER TABLE "item_pedido" ADD CONSTRAINT "fk_item_pedido_pedido" FOREIGN KEY ("pedido_id") REFERENCES "pedido" ("id_pedido");

ALTER TABLE "item_pedido" ADD CONSTRAINT "fk_item_pedido_produto" FOREIGN KEY ("produto_id") REFERENCES "produto" ("id_produto");

ALTER TABLE "produto" ADD CONSTRAINT "fk_produto_secao" FOREIGN KEY ("secao_id") REFERENCES "secao" ("id_secao");

ALTER TABLE "desconto" ADD CONSTRAINT "fk_desconto_produto" FOREIGN KEY ("produto_id") REFERENCES "produto" ("id_produto");
