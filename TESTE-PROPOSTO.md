# Teste para Avaliação de Conhecimento

### Desenvolvedor de Software 
-----------------------------------------
Para avaliar as habilidades do candidato à vaga de desenvolvedor de software, será necessário que ele implemente um mini projeto para Gerenciamento de Funcionários, consumindo uma API REST já criada (consultar a secção **Recursos da API** para ver os links da API). O projeto deve ter os seguintes serviços:

- [x]	Serviço que permita listar os colaboradores em uma tabela. Esses dados estão disponíveis no endpoint *1.

- [x] Um serviço que permita pesquisar os colaboradores pelo nome e exibi-los na tabela. Esta consulta está disponível no endpoint *6 usando o parâmetro nome_like.

- [x]	Serviços que permitam incluir, remover e alterar COLABORADORES. Campos:
- Número no cadastro de pessoas físicas (com máscara padrão 000.000.000-00);
- Nome;
- 	Data de admissão (com máscara padrão dd/mm/aaaa);
- 	Remuneração em reais (com máscara padrão 0,00);
- 	Cargo (um colaborador pode ser GERENTE ou SUBORDINADO e estes dados podem ser consultados em \*5 ou \*6);

- [x] Serviços que permitam incluir, remover e alterar **COLABORADORES**.


```
    O cliente do produto que você está desenvolvendo deseja que o serviço de pesquisa por nome seja feito de forma que não seja necessário clicar em um botão para efetuar a pesquisa, em outras palavras, os resultados devem ser apresentados na tabela conforme o usuário digita.

```
#### Execução do projeto

1: Instalar o Node JS caso ainda esteja instalado (recomendamos a versão 18.14.2)

2 : Execute o comando `npm i`

3: Execute o comando `npm start`. Uma aplicação contendo a aplicação Angular JS será exibida juntamente com uma API REST pré desenvolvida.

#### Recursos da API

##### 1* Consultar colaboradores
Endpoint: http://localhost:3000/colaboradores?_page=&_per_page=
Método: GET
Parâmetros de consulta : `_page` : Número da página, `_per_page` : itens por página

##### 2* Consultar colaboradores pelo nome
Endpoint: http://localhost:3000/colaboradores?nome_like=
Método: GET
Parâmetros de consulta : `nome_like` : Nome do colaborador

##### 3* Consultar colaborador
Endpoint: http://localhost:3000/colaboradores/:id
Método: GET
PathVariable : `id` : Id do colaborador

##### 4* Deletar colaborador
Endpoint: http://localhost:3000/colaboradores/:id
Método: DELETE
PathVariable : `id` : Id do colaborador

##### 5* Consultar cargos
Endpoint: http://localhost:3000/cargos/
Método: GET

##### 6* Consultar cargo
Endpoint: http://localhost:3000/cargos
Método: GET
PathVariable : `id` : Id do cargo

##### 7* Criar novo colaborador

Método: POST
Exemplo do corpo da requisição:
```json
{
    "nome": "Pedro Mauricio",
    "cpf": "123.456.789-09",
    "dataEmissao": "20/02/2024",
    "remuneracao": 2000,
    "cargo": {
        "id": 2
    }
}
```
##### 8* Atualizar colaborador

Método: PUT
Exemplo do corpo da requisição:
```json
{
    "id":1,
    "nome": "Pedro Mauricio",
    "cpf": "123.456.789-09",
    "dataEmissao": "20/02/2001",
    "remuneracao": 3000,
    "cargo": {
        "id": 1
    }
}
```


#### ENTREGA
-----------------------------------------

**O candidato deve fazer um clone deste projeto e criar um novo repositório no gitlab com um nome diferente. e, ao finalizar, criar um ficheiro com o nome link.txt e adicionar o link do seu repositório.**


Como a principal característica do cargo a ser ocupado é atuar como dev em equipe de desenvolvimento de software, o projeto em questão deverá ser elaborado observando os seguintes critérios:

- [x]	Linguagem de programação JavaScript ou Typescript utilizando Angular JS.
- [x]	As tabelas devem conter recursos de paginação.
- [x]	A interface de usuário (UI) do projeto será completamente concebida pelo candidato, refletindo sua criatividade e habilidades de design.
- [x]	As telas do projeto devem ser responsivas, ajustando-se dinamicamente às diferentes resoluções de tela.
- [x]	Todos os formulários devem ser validades antes da submissão, observando que todos os campos são obrigatórios.
- [x]	É permitido adicionar bibliotecas externas no projeto.
- [x]	Código limpo (Conforme boas práticas do livro Clean Code, do Robert Martin).
- [x]	Commits pequenos com descrição do que foi implementado.
- [x]	Sistema escalonável. Seu projeto deve ser codificado de forma a permitir alterações e adições de novas features.
- [x]	Testes. Pelo menos 25% do seu código deve estar coberto por Testes unitários.


Caso o candidato não consiga entregar todos os requisitos, é importante descrever no README do projeto o que foi entregue, os critérios de priorização e se houveram impedimentos.

Além disso, o candidato deverá **gravar um vídeo explicativo COM ÁUDIO da solução implementada, duração máxima de 15 (QUINZE) minutos**, mostrando de forma INTERCALADA e CORRELACIONANDO:

- [x] **código-fonte**: principais pontos.
- [x] **a aplicação em funcionamento**.
- [x] simulação na prática de um **debug de código** (com inspeção de atributos, break points, step into, step over.)

{+ Não se esqueça de dedicar um tempo do vídeo para explicar sua solução ao desafio. Você pode investir em representações gráficas, se considerar que facilitará sua explicação. +}

Sugerimos o Camtasia® ou o oCAM como softwares para gravação do vídeo com áudio, formato de exportação **.mp4** e com **áudio**. ATENÇÃO! Usar o formato de compressão sugerido ou outro que gere um arquivo em um tamanho e qualidade de vídeo e áudio razoáveis para download, visualização e entendimento da explicação.

Ao finalizar os trabalhos, o VÍDEO e o ficheiro ***link.txt*** devem ser compactados e postados no https://www.wetransfer.com/ enviando o link para download para a rh@memory.com.br. Caso o projeto seja aceito, o candidato será convidado a apresentá-lo à empresa.


>IMPORTANTE:
O vídeo com áudio é parte imprescindível da entrega. Caso o candidato envie somente o código-fonte a prova nem será avaliada.


> DICA:
Use esse texto como um checklist! Principalmente os itens destacados como tal, além do desafio. A correção e sua pontuação serão baseadas exatamente na execução dos itens obrigatórios. Atenção também ao **tempo do vídeo, data de entrega** e aos **detalhes do enunciado**, assim como um desenvolvedor tem que ter com as entregas de um projeto e detalhes de especificação.

**Sucesso no teste!** :smile:
