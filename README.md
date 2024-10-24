<<<<<<< HEAD
![](https://i.imgur.com/xG74tOh.png)

# Desafio de Final Back-end

## Instruções para entrega

1. Faça o fork deste repositório
2. Clone o repositório forkado
3. Edite o final deste README colocando o nome do grupo no local indicado (não é necessário clonar o repositório. Você pode fazer esse passo pelo próprio GitHub)
4. Abra um pull request colocando os nomes e sobrenomes do grupo no título do pull request
5. Copie o link do seu pull request (PR) e cole-o na Plataforma do Aluno no local indicado para a entrega (o link do pull request termina com "/pull/`NUMERO_DO_PULL_REQUEST`")

#### ⚠️ Importante: o passo a passo acima visa priorizar a entrega do desafio logo nos primeiros minutos. Se desejar, pode deixar para fazer o pull request (PR) e a entrega do link na plataforma após o término do projeto

#### ⚠️ Importante: você NÃO deve abrir mais de um pull request. Ao atualizar a branch main do seu repositório remoto (git push), seu PR será atualizado também

#### ⚠️ Importante: se o pull request não for criado e enviado na plataforma, o feedback não será fornecido

## Dicas

- Faça commits regulares
- Quando terminar, lembre-se de atualizar seu repositório remoto (`git push`)

## Descrição do desafio

Nos dias de hoje, a eficiência e agilidade no atendimento ao cliente são elementos cruciais para o sucesso de qualquer estabelecimento comercial. Seja um supermercado, uma loja de roupas, um restaurante ou qualquer outro tipo de comércio, o ponto de venda (PDV) é o coração das operações diárias. É no PDV que as transações acontecem, onde os produtos são registrados, os pagamentos são processados, e as vendas são finalizadas. Dada a importância desse sistema, o desenvolvimento de uma API para um software PDV é uma tarefa fundamental para garantir que todas essas operações ocorram de maneira fluida, segura e integrada

Um sistema PDV (Ponto de Venda) é uma solução tecnológica que automatiza e gerencia as transações comerciais realizadas em um estabelecimento. Ele geralmente possui uma interface intuitiva onde o operador do caixa pode registrar produtos ou serviços adquiridos pelo cliente, aplicar descontos, calcular impostos, emitir notas fiscais e processar pagamentos em diferentes formas (dinheiro, cartão de crédito, débito, etc.)

Além disso, o software PDV pode se integrar a outros sistemas, como controle de estoque, CRM (Customer Relationship Management), e plataformas de e-commerce, criando um ecossistema completo que auxilia na gestão de todo o negócio. Isso permite ao comerciante ter uma visão clara e em tempo real de como está o desempenho de suas vendas, estoque disponível, e até mesmo preferências dos clientes

O objetivo deste projeto é desenvolver uma API robusta e escalável que será utilizada como a camada de comunicação com o front-end de um sistema PDV

#### ⚠️ Importante: sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação. Essa mensagem, que deverá ser exatamente a pedida em cada cenário, deve ser o valor de uma propriedade chamada "mensagem" de um JSON (veja o exemplo abaixo)

#### ⚠️ Importante: todos os retornos deverão ser no formato JSON

**Exemplo:**

```json
// id informado é de um produto que não existe
// HTTP status 404
{
  "mensagem": "Produto não encontado"
}
```

## ⚠️ Padronização do projeto

- Você deve seguir exatamente o padrão de nomenclatura solitado neste documento. Ou seja, se for pedido que seja criado um campo em um objeto ou tabela do banco de dados chamado "nomeCompleto", você deve seguir exatamente o padrão, não sendo aceito "nome_completo", "nome-completo" ou outros derivados
- A mensagem de erro apropriada é uma decisão que você deve tomar

## Requisitos Obrigatórios

- A API a ser criada deverá acessar o banco de dados a ser criado `pdv` para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação
- O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado
- Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)

### Status Code

Abaixo, listamos alguns dos possíveis **status code** esperados como resposta da API

Obs.: A lista abaixo é para consulta. **Não** significa que todos os **status codes** precisam necessariamente ser utilizados

```ts
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 409 (Conflict) = indica que a requisição não pôde ser completada devido a um conflito com o estado atual do recurso
// 500 (Internal Server Error) = falhas causadas pelo servidor
```

---

---

<details>
<summary>1ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

- usuarios
  - id
  - nome
  - email (campo único)
  - senha
- categorias
  - id
  - descricao

</details>

<details>
<summary><b>Listar categorias</b></summary>

#### `GET` `/categorias`

Essa é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas

As categorias a seguir precisam ser previamente cadastradas para que sejam listadas no endpoint de listagem das categorias

## **Categorias**

- Informática
- Celulares
- Beleza e Perfumaria
- Mercado
- Livros e Papelaria
- Brinquedos
- Moda
- Bebê
- Games

</details>

<details>
<summary><b>Cadastrar usuário</b></summary>

#### `POST` `/usuarios`

Essa é a rota que será utilizada para cadastrar um novo usuário no sistema

Critérios de aceite:

- Validar os campos obrigatórios:
  - nome
  - email
  - senha
- A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
- O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail

</details>

<details>
<summary><b>Efetuar login do usuário</b></summary>

#### `POST` `/login`

Essa é a rota que permite o usuário cadastrado realizar o login no sistema
Critérios de aceite:

    - Validar se o e-mail e a senha estão corretos para o usuário em questão
    - Gerar um token de autenticação para o usuário

</details>

<details>
<summary><b>Redefinir senha do usuário</b></summary>

#### `PATCH` `/usuarios/redefinir`

Essa é a rota que permite o usuário cadastrado redefinir a senha.

Critérios de aceite:

    - Validar os campos obrigatórios:
        - email
        - senha_antiga
        - senha_nova
    - A senha antiga não pode ser igual a senha nova
    - Validar se o e-mail e a senha antiga estão corretos para o usuário em questão
    - Alterar a senha no banco de dados para a nova senha informada
    - Como forma de segurança, enviar e-mail alertando o usuário que a senha foi alterada

</details>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, que será recebido no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado

---

<details>
<summary><b>Detalhar perfil do usuário logado</b></summary>

#### `GET` `/usuarios`

Essa é a rota que permite o usuário logado a visualizar os dados do seu próprio perfil, de acordo com a validação do token de autenticação

</details>

<details>
<summary><b>Editar perfil do usuário logado</b></summary>

#### `PUT` `/usuarios`

Essa é a rota que permite o usuário logado atualizar informações de seu próprio cadastro, de acordo com a validação do token de autenticação

Critérios de aceite:

    - Validar os campos obrigatórios:
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail

</details>

<details>
<summary><b>[Optativo] Efetuar deploy da aplicação</b></summary>
<br>

Fazer deploy do projeto

</details>

</details>

---

<details>
<summary>2ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

- produtos
  - id
  - descricao
  - quantidade_estoque
  - valor
  - categoria_id
- clientes
  - id
  - nome
  - email (campo único)
  - cpf (campo único)
  - cep
  - rua
  - numero
  - bairro
  - cidade
  - estado

</details>

<details>
<summary><b>Cadastrar Produto</b></summary>

#### `POST` `/produtos`

Essa é a rota que permite o usuário logado cadastrar um novo produto no sistema

Critérios de aceite:

- Validar os campos obrigatórios:
  - descricao
  - quantidade_estoque
  - valor
  - categoria_id
- A categoria informada na qual o produto será vinculado deverá existir

</details>

<details>
<summary><b>Editar dados do produto</b></summary>

#### `PUT` `/produtos/:id`

Essa é a rota que permite o usuário logado a atualizar as informações de um produto cadastrado.

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota
    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir

</details>

<details>
<summary><b>Listar Produtos</b></summary>

#### `GET` `/produtos`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os produtos cadastrados

Deveremos incluir um parâmetro do tipo query **categoria_id** para que seja possível consultar produtos por categorias, de modo, que serão filtrados de acordo com o id de uma categoria

Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query **categoria_id**, filtrar os produtos de acordo com a categoria, caso o id de categoria informada exista.
    - Caso não seja informado o parâmetro do tipo query **categoria_id** todos os produtos cadastrados deverão ser retornados

</details>

<details>
<summary><b>Detalhar Produto</b></summary>

#### `GET` `/produtos/:id`

Essa é a rota que permite o usuário logado obter um de seus produtos cadastrados

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota

</details>

<details>
<summary><b>Excluir Produto por ID</b></summary>

#### `DELETE` `/produtos/:id`

Essa é a rota que será chamada quando o usuário logado quiser excluir um de seus produtos cadastrados

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota

</details>

<details>
<summary><b>Cadastrar Cliente</b></summary>

#### `POST` `/clientes`

Essa é a rota que permite usuário logado cadastrar um novo cliente no sistema

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf

</details>

<details>
<summary><b>Editar dados do cliente</b></summary>

#### `PUT` `/clientes/:id`

Essa é a rota que permite o usuário realizar atualização de um cliente cadastrado

Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf

</details>

<details>
<summary><b>Listar Clientes</b></summary>

#### `GET` `/clientes`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os clientes cadastrados

</details>

<details>
<summary><b>Detalhar Cliente</b></summary>

#### `GET` `/clientes/:id`

Essa é a rota que será chamada quando o usuário logado quiser obter um de seus clientes cadastrados

Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota

</details>

</details>

---

<details>
<summary>3ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

- produtos
  - imagem_url
- pedidos
  - id
  - cliente_id
  - observacao
  - valor_total
- pedido_produtos
  - id
  - pedido_id
  - produto_id
  - quantidade_produto
  - valor_produto

</details>

<details>
<summary><b>Cadastrar Pedido</b></summary>

#### `POST` `/pedidos`

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema

**Lembre-se:** Cada pedido deverá conter ao menos um produto vinculado

**Atenção:** As propriedades produto_id e quantidade_produto devem ser informadas dentro de um array e para cada produto deverá ser criado um objeto neste array, como ilustrado no objeto de requisição abaixo
Só deverá ser cadastrado o pedido caso todos produtos vinculados ao pedido realmente existão no banco de dados

```javascript
// Corpo da requisição para cadastro de pedido (body)
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   cliente_id
        -   pedido_produtos
            -   produto_id
            -   quantidade_produto
    -   Validar se existe cliente para o id enviado no corpo (body) da requisição
    -   Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição
    -   Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição
    -   O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados

</details>

<details>
<summary><b>Listar Pedidos</b></summary>

#### `GET` `/pedidos`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os pedidos cadastrados

Deveremos incluir um parâmetro do tipo query **cliente_id** para que seja possível consultar pedidos por clientes, de modo, que serão filtrados de acordo com o id de um cliente

```javascript
// Resposta para listagem de pedido (body)
[
  {
    pedido: {
      id: 1,
      valor_total: 230010,
      observacao: null,
      cliente_id: 1,
    },
    pedido_produtos: [
      {
        id: 1,
        quantidade_produto: 1,
        valor_produto: 10,
        pedido_id: 1,
        produto_id: 1,
      },
      {
        id: 2,
        quantidade_produto: 2,
        valor_produto: 230000,
        pedido_id: 1,
        produto_id: 2,
      },
    ],
  },
];
```

Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query **cliente_id**, filtrar os pedidos de acordo com o cliente, caso o id do cliente informado exista
    - Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados deverão ser retornados

</details>

<details>
<summary><b>Aplicar validação na exclusão de produto</b></summary>
<br>

Deverá ser aplicada uma regra de negócio que não permitirá exclusão de produto que tenha sido registrado em algum pedido

Critérios de aceite:

    - Validar se o produto que está sendo excluído não está vinculado a nenhum pedido, caso estiver, não poderá ser excluído e deverá ser retornada uma mensagem indicando o motivo

</details>

<details>
<summary><b>Upload de imagem do produto</b></summary>
<br>

#### `PATCH` `/produtos/:id/imagem`

Essa é a rota que será utilizada para fazer o upload de uma imagem do produto no servidor de armazenamento

**Atenção:** O nome da imagem deverá ser gerado, de modo, que não deverá ser passada a propriedade relacionada ao nome da imagem

**Lembre-se:** Cada imagem deverá ter um nome gerado exclusivo, ou seja, não poderá ter risco de uma imagem possuir o mesmo nome de uma outra já existente no servidor de armazenamento

Critérios de aceite:

    - Validar se existe produto para o id enviado como parâmetro na rota
    - Validar se a propriedade `imagem`, foi informada no corpo da requisição
    - Receber a propriedade `imagem` em form data (Multipart) e enviar para o servidor de armazenamento
    - Obter e retornar a URL da imagem que teve upload concluído
    - Caso o produto já tenha imagem, deve substiuir a atual pela a nova
    - Caso a propriedade `imagem` seja passo em branco, deve excluir a imagem atual do produto

</details>

<details>
<summary><b>Aprimorar exclusão de produto</b></summary>
<br>

Deverá ser aprimorada a exclusão de produto para que quando o produto for excluído também seja removida a imagem vinculada a ele na servidor de armazenamento

Critérios de aceite:

    - Na exclusão do produto a imagem vinculada a este produto deverá ser excluída do servidor de armazenamento

</details>

</details>

---

---

**COLOQUE O SEU NOME OU O NOME DO GRUPO AQUI:**
=======
# PDV-API SISTEMA DE PONTO DE VENDA
>>>>>>> 618ba358def3818703d30881d538fd029ae17be6
