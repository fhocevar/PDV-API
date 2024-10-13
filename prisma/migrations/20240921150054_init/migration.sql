-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "imagem_url" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "observacao" TEXT,
    "valor_total" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    "valor_produto" INTEGER NOT NULL,

    CONSTRAINT "PedidoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
