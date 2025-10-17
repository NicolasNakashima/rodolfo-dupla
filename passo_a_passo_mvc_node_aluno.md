# ✅ Guia Final e Completo: Construindo sua Primeira Aplicação MVC com Node.js

### Atividade de Programação em Pares — Versão à Prova de Erros

Bem-vindos, futuros desenvolvedores! Este não é apenas um tutorial. É uma aula completa e guiada para ser realizada em duplas. Vamos construir uma aplicação web do zero, e a cada linha de código, vocês entenderão não apenas **o que** fazer, mas **por que** estão fazendo. Ao final, vocês terão construído um projeto funcional e compreendido os pilares do desenvolvimento backend moderno.

---

### **1. Pré-Requisitos: A Caixa de Ferramentas do Desenvolvedor**

Antes de escrever qualquer código, precisamos garantir que nossas ferramentas estão prontas.

* **Node.js**: É o ambiente que permite executar nosso código JavaScript no servidor (fora do navegador).
    * **Verificação**: Abra seu terminal e digite `node -v`. Se um número de versão aparecer, ótimo! Se não, [baixe e instale aqui](https://nodejs.org/).
* **MySQL**: É o nosso sistema de banco de dados, onde as tarefas serão armazenadas.
    * **Verificação**: Garanta que você tenha um servidor MySQL instalado e em execução. Ferramentas como XAMPP, WAMP ou o MySQL Community Server oficial são perfeitas.
* **Editor de Código**: Um bom editor torna a vida mais fácil. Recomendamos o **Visual Studio Code**, que é gratuito e poderoso.
* **Terminal (ou Prompt de Comando)**: A ferramenta que usaremos para instalar pacotes e iniciar nossa aplicação. Não tenha medo dele, ele será seu melhor amigo!

---

### **2. Conceitos Fundamentais (O Mínimo que Você Precisa Saber)**

Vamos traduzir alguns termos técnicos que usaremos o tempo todo.

* **Express.js**: Pense no Node.js como o motor de um carro. O Express.js é todo o resto: o chassi, o volante, os pedais. É um *framework* que nos dá ferramentas prontas para construir aplicações web (como criar rotas/URLs) de forma muito mais rápida.
* **Sequelize**: Escrever comandos de banco de dados (SQL) diretamente no código pode ser complexo e repetitivo. O Sequelize é um "tradutor" (chamado de ORM). Nós escrevemos JavaScript (`Task.findAll()`) e ele traduz para o SQL correspondente (`SELECT * FROM Tasks;`), além de nos proteger contra alguns tipos de ataques.
* **NPM (Node Package Manager)**: É o "gerente de pacotes" que vem com o Node.js. Pense nele como uma loja de aplicativos para nosso código. Quando precisamos de uma ferramenta (como o Express), nós simplesmente pedimos ao NPM para baixá-la e gerenciá-la para nós com o comando `npm install`.

---

### **3. O Coração do Projeto: A Arquitetura MVC**

Como já vimos, o MVC (Model-View-Controller) é a nossa estratégia para organizar o código. É o que separa um projeto amador de um profissional.

![Diagrama MVC](https://i.imgur.com/8G5vW2E.png)

1.  O **Usuário** interage com a **View** (a interface).
2.  Um clique ou envio de formulário aciona uma **Rota**, que sabe exatamente qual função do **Controller** chamar.
3.  O **Controller** (o garçom) recebe a requisição. Se precisar de dados, ele pede ao **Model**.
4.  O **Model** (a cozinha) busca ou salva os dados no **Banco de Dados**.
5.  O **Controller** recebe os dados de volta do Model e os envia para a **View**.
6.  A **View** se renderiza com os dados e é exibida para o **Usuário**.

**O fluxo é sempre esse!** Entender essa jornada é a chave para dominar o desenvolvimento web.

---

## 🚀 Mãos à Obra: A Construção Guiada

Agora, vamos à prática. Lembrem-se da dinâmica de **Piloto** (quem digita) e **Navegador** (quem guia), trocando de papéis a cada etapa.

### **Etapa 1: A Fundação do Projeto (30 min)**

* **Papéis:** **Aluno 1 = Piloto** | **Aluno 2 = Navegador**
* **Objetivo:** Criar a estrutura de arquivos e configurar o "cérebro" da aplicação.

#### **1.1. Criando a Estrutura do Projeto (O Esqueleto)**

O **Piloto** deve abrir o terminal e seguir os comandos abaixo, um por um. O **Navegador** confere se cada comando foi executado corretamente.

1.  **Crie a pasta principal do projeto e entre nela:**
    ```bash
    mkdir projeto-tarefas-mvc
    cd projeto-tarefas-mvc
    ```

2.  **Crie todas as pastas de uma vez:**
    ```bash
    mkdir controllers models routes views db public
    ```

3.  **Crie os arquivos vazios. Para usuários de Mac/Linux (com o comando `touch`):**
    ```bash
    touch index.js .gitignore db/conn.js models/Task.js controllers/taskController.js routes/taskRoutes.js views/main.handlebars views/all.handlebars views/create.handlebars views/edit.handlebars
    ```
    > **💡 Dica para usuários de Windows:** O Windows não tem o comando `touch` por padrão. Crie os arquivos vazios manualmente pelo VS Code: clique com o botão direito na árvore de pastas à esquerda e selecione "New File" para cada arquivo, dentro de suas respectivas pastas.

4.  **Verifique a estrutura:** Ao final, sua estrutura de pastas e arquivos no VS Code deve estar idêntica a esta:
    ```text
    /controllers
        └─ taskController.js
    /db
        └─ conn.js
    /models
        └─ Task.js
    /public
    /routes
        └─ taskRoutes.js
    /views
        ├─ all.handlebars
        ├─ create.handlebars
        ├─ edit.handlebars
        └─ main.handlebars
    .gitignore
    index.js
    ```

#### **1.2. `.gitignore`: Ignorando o Desnecessário**

O **Piloto** adiciona a seguinte linha ao arquivo `.gitignore`:
```text
node_modules
```

#### **1.3. `package.json`: A Identidade do Projeto**

1.  **Piloto**: No terminal (já dentro da pasta `projeto-tarefas-mvc`), rode:
    ```bash
    npm init -y
    ```
2.  **Piloto**: Substitua o conteúdo do `package.json` criado pelo código abaixo.
    ```json
    {
      "name": "lista-tarefas-mvc-final",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "start": "nodemon ./index.js"
      },
      "dependencies": {
        "express": "^4.17.1",
        "express-handlebars": "^5.3.3",
        "mysql2": "^2.3.0",
        "sequelize": "^6.6.5",
        "nodemon": "^2.0.12"
      }
    }
    ```
3.  **Piloto**: Agora, baixe todas essas dependências com o comando:
    ```bash
    npm install
    ```

#### **1.4. `index.js`: O Ponto de Partida**

O **Piloto** irá preencher o arquivo `index.js`. O **Navegador** revisa linha a linha.

```javascript
// 1. IMPORTAÇÕES
const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const Task = require('./models/Task');
const taskRoutes = require('./routes/taskRoutes');

// 2. INICIALIZAÇÃO DO EXPRESS
const app = express();
const PORT = 3000;

// 3. CONFIGURAÇÃO DE MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// 4. USO DAS ROTAS
app.use('/tasks', taskRoutes);
app.get('/', (req, res) => res.redirect('/tasks'));

// 5. CONEXÃO COM O BANCO E INICIALIZAÇÃO DO SERVIDOR
conn
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log('❌ Erro ao conectar com o banco de dados:', err));
```
> **Checkpoint de Discussão 🗣️**
> * **Navegador**: Aponte para a linha `app.use('/tasks', taskRoutes)` e pergunte ao Piloto: "O que essa linha está nos dizendo sobre as URLs do nosso site?".
> * **Juntos**: O `nodemon` no script "start" do `package.json` serve para reiniciar o servidor automaticamente quando salvamos um arquivo. Como isso ajuda no nosso desenvolvimento do dia a dia?

---

### **Etapa 2: A Camada de Dados (30 min)**

* **Papéis:** **Aluno 2 = Piloto** | **Aluno 1 = Navegador** (Troquem!)
* **Objetivo:** Conectar ao banco de dados e definir o **Model** de Tarefa.

#### **2.1. `db/conn.js`: A Conexão Segura**

O **Piloto** preenche o `db/conn.js`. O **Navegador** tem a tarefa mais importante aqui: **garantir que as credenciais do banco de dados estão corretas**.

```javascript
const { Sequelize } = require('sequelize');

// ⚠️ ATENÇÃO MÁXIMA AQUI ⚠️
// 1. Verifique se o seu servidor MySQL (XAMPP, etc.) está LIGADO.
// 2. Crie o banco de dados 'tasks_db' no seu MySQL com o comando: CREATE DATABASE tasks_db;
// 3. Substitua 'usuario' e 'senha' pelas SUAS credenciais.
//    (Em XAMPP padrão, o usuário é 'root' e a senha é vazia: '')
const sequelize = new Sequelize('tasks_db', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('🔌 Conexão com o MySQL estabelecida com sucesso!');
} catch (error) {
  console.error('❌ Não foi possível conectar ao banco de dados:', error);
}

module.exports = sequelize;
```

#### **2.2. `models/Task.js`: A Planta Baixa da Tarefa**

O **Piloto** preenche o nosso **Model**.

```javascript
const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Task = db.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
```

> **Checkpoint de Discussão 🗣️**
> * **Navegador**: Se o campo `allowNull` em `title` fosse `true`, o que aconteceria se um usuário tentasse criar uma tarefa sem título?
> * **Juntos**: Discutam o que a linha `module.exports = Task` faz. Como outros arquivos conseguem "saber" sobre o Model `Task`?

---

### **Etapa 3: A Lógica e as Rotas (40 min)**

* **Papéis:** **Aluno 1 = Piloto** | **Aluno 2 = Navegador** (Troquem!)
* **Objetivo:** Criar o **Controller**, o cérebro que conecta tudo, e as **Rotas** que o ativam.

#### **3.1. `controllers/taskController.js`: O Maestro da Aplicação**

O **Piloto** preenche o **Controller**. O **Navegador** ajuda a entender o fluxo: o controller recebe uma requisição, pede ajuda ao Model e responde enviando uma View.

```javascript
const Task = require('../models/Task'); // O Controller precisa do Model para interagir com o banco

module.exports = {
  // Função para RENDERIZAR a página com todas as tarefas
  async showTasks(req, res) {
    // Pede ao Model para buscar TODAS as tarefas no banco. `raw: true` simplifica os dados.
    const tasks = await Task.findAll({ raw: true });
    // Renderiza a view 'all.handlebars' e envia o objeto { tasks } com os dados do banco
    res.render('all', { tasks });
  },

  // Função para RENDERIZAR a página de criação de tarefa
  createTask(req, res) {
    res.render('create');
  },

  // Função para SALVAR uma nova tarefa no banco
  async saveTask(req, res) {
    // Pega os dados enviados pelo formulário no corpo (body) da requisição
    await Task.create({
      title: req.body.title,
      description: req.body.description,
      done: false, // O status inicial é sempre 'false'
    });
    // Redireciona o usuário para a página inicial após a criação
    res.redirect('/tasks');
  },

  // Função para RENDERIZAR a página de edição com dados de UMA tarefa
  async editTask(req, res) {
    // Pega o 'id' que vem na URL (ex: /tasks/edit/5)
    const id = req.params.id;
    // Pede ao Model para buscar a tarefa específica pela sua Chave Primária (id)
    const task = await Task.findByPk(id, { raw: true });
    // Renderiza a view 'edit.handlebars' e envia os dados da tarefa encontrada
    res.render('edit', { task });
  },

  // Função para ATUALIZAR uma tarefa no banco
  async updateTask(req, res) {
    // Pega o 'id' que vem do campo escondido (<input type="hidden">) do formulário
    const id = req.body.id;
    await Task.update(
      {
        title: req.body.title,
        description: req.body.description,
        // Lógica para checkbox: se ele for marcado, req.body.done será 'on', senão será 'undefined'.
        done: req.body.done === 'on' ? true : false,
      },
      { where: { id: id } } // Cláusula WHERE: atualize APENAS a tarefa com este id
    );
    res.redirect('/tasks');
  },

  // Função para DELETAR uma tarefa
  async deleteTask(req, res) {
    const id = req.body.id;
    await Task.destroy({ where: { id: id } }); // DELETE FROM Tasks WHERE id = ?
    res.redirect('/tasks');
  },
};
```

#### **3.2. `routes/taskRoutes.js`: O Cardápio de URLs**

O **Piloto** preenche o arquivo de **Rotas**. Este arquivo é o "mapa" que diz: "Quando o usuário acessar esta URL com este método (GET/POST), execute esta função daquele Controller".

```javascript
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // A Rota precisa saber qual Controller chamar

// Rota para a página inicial (listar todas as tarefas)
router.get('/', taskController.showTasks);

// Rota para a página de formulário de criação
router.get('/create', taskController.createTask);

// Rota para RECEBER os dados do formulário de criação
router.post('/create', taskController.saveTask);

// Rota para a página de formulário de edição
router.get('/edit/:id', taskController.editTask);

// Rota para RECEBER os dados do formulário de edição
router.post('/edit', taskController.updateTask);

// Rota para RECEBER a requisição de deletar uma tarefa
router.post('/delete', taskController.deleteTask);

module.exports = router;
```

> **Checkpoint de Discussão 🗣️**
> * **Navegador**: Explique a jornada completa do usuário ao clicar no botão "Excluir". Qual Rota é ativada? Qual função do Controller é chamada? Como o Controller sabe QUAL tarefa excluir?
> * **Juntos**: Qual a diferença entre `res.render()` e `res.redirect()`? Quando usamos cada um?

---

### **Etapa 4: A Interface (Views) (30 min)**

* **Papéis:** **Aluno 2 = Piloto** | **Aluno 1 = Navegador** (Última troca!)
* **Objetivo:** Construir a camada de apresentação que o usuário final irá ver.

#### **4.1. `views/main.handlebars`: O Layout Principal**

Este é o "esqueleto" de todas as nossas páginas. `{{{ body }}}` é o espaço reservado onde o conteúdo das outras views será injetado.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Lista de Tarefas</title>
  <link rel="stylesheet" href="/css/styles.css"> </head>
<body>
  <header>
    <h1>📋 Lista de Tarefas</h1>
    <nav>
      <a href="/tasks">Ver Todas</a> |
      <a href="/tasks/create">Criar Nova Tarefa</a>
    </nav>
  </header>
  <hr>
  <main>
    {{{ body }}}
  </main>
</body>
</html>
```

#### **4.2. `views/all.handlebars`: A Lista de Tarefas**

Esta view recebe a lista de `tasks` do controller e usa o `{{#each}}` para criar um `<li>` para cada uma.

```html
<h2>Todas as Tarefas:</h2>
{{#if tasks.length}}
  <ul>
    {{#each tasks}}
      <li>
        <b>{{this.title}}</b> - {{this.description}} - 
        {{#if this.done}}
            ✅ Concluída
        {{else}}
            🕗 Pendente
        {{/if}}
        <a href="/tasks/edit/{{this.id}}">Editar</a>
        <form style="display:inline;" method="post" action="/tasks/delete">
          <input type="hidden" name="id" value="{{this.id}}"/>
          <button type="submit">Excluir</button>
        </form>
      </li>
    {{/each}}
  </ul>
{{else}}
  <p>🎉 Nenhuma tarefa cadastrada. Que tal criar uma nova?</p>
{{/if}}
```

#### **4.3. `views/create.handlebars`: Formulário de Criação**

Um formulário simples cujo `action` e `method` correspondem exatamente ao que nossa Rota espera.

```html
<h2>Criando uma nova tarefa</h2>
<form action="/tasks/create" method="post">
  <label>Título:</label><br>
  <input type="text" name="title" placeholder="O que precisa ser feito?" required/><br>
  <label>Descrição:</label><br>
  <input type="text" name="description" placeholder="Algum detalhe extra?" /><br><br>
  <button type="submit">Criar Tarefa</button>
</form>
```

#### **4.4. `views/edit.handlebars`: Formulário de Edição**

Similar ao de criação, mas os campos `value` já vêm preenchidos com os dados da tarefa que o Controller enviou.

```html
<h2>Editando a tarefa: {{task.title}}</h2>
<form action="/tasks/edit" method="post">
  <input type="hidden" name="id" value="{{task.id}}" />
  <label>Título:</label><br>
  <input type="text" name="title" value="{{task.title}}" required/><br>
  <label>Descrição:</label><br>
  <input type="text" name="description" value="{{task.description}}" /><br><br>
  <label for="done">Concluída?</label>
  <input type="checkbox" id="done" name="done" {{#if task.done}}checked{{/if}}/>
  <br><br>
  <button type="submit">Salvar Alterações</button>
</form>
```

#### **✅ Teste Final**

Juntos, rodem `npm start` no terminal, acessem <http://localhost:3000> e testem todas as funcionalidades da aplicação.

---

### **Guia de Sobrevivência: Resolvendo os Erros Mais Comuns**

* **Erro: `Error: connect ECONNREFUSED 127.0.0.1:3306`**
    * **Solução:** Seu servidor MySQL não está rodando! Inicie o XAMPP, WAMP ou o serviço do MySQL.

* **Erro: `Error: Access denied for user 'usuario'@'localhost'`**
    * **Solução:** Abra `db/conn.js` e revise CUIDADOSAMENTE o nome de usuário e a senha. Lembre-se que em muitas instalações locais, o usuário é `'root'` e a senha é vazia (`''`).

* **Erro: `Cannot find module 'express'` (ou qualquer outro módulo)**
    * **Solução:** Você esqueceu de rodar `npm install`. Rode esse comando no terminal e tente novamente.

* **A página carrega, mas os dados não aparecem (lista vazia, etc.)**
    * **Solução:** Use `console.log()`! Dentro da função do seu controller (ex: `showTasks`), coloque `console.log(tasks)` logo após a linha do `Task.findAll()`. Veja o que aparece no terminal onde o `npm start` está rodando.

---

### **🏆 O Desafio Final: Evoluindo o Projeto**

Parabéns! Agora, apliquem o que aprenderam para estender o projeto.

#### **🚀 Desafio: Níveis de Prioridade**

Adicionem um campo "Prioridade" (**Baixa**, **Média**, **Alta**) para cada tarefa.

#### **Plano de Ação para a Dupla (Apliquem o MVC!)**

1.  **Onde você define a estrutura de um dado?**
    * No **Model**. Modifiquem o `models/Task.js` para incluir o campo `priority`.

2.  **Onde o usuário insere essa nova informação?**
    * Na **View**. Adicionem um campo `<select>` nos formulários `create.handlebars` e `edit.handlebars`. Não se esqueçam de exibir a prioridade também em `all.handlebars`.

3.  **Quem pega o dado da View e manda para o Model salvar?**
    * O **Controller**. Ajustem as funções `saveTask` e `updateTask` em `controllers/taskController.js` para lidar com o novo campo `req.body.priority`.

4.  **Reiniciar e Testar!**

#### **🏆 Desafios Extras (Nível Hard)**

* **Estilização por Prioridade:** Crie um arquivo `public/css/styles.css` e use classes CSS para colorir as tarefas de acordo com a prioridade.
* **Data de Entrega:** Adicionem um campo de data (`type="date"`).
* **Filtro de Tarefas:** Crie um filtro para mostrar apenas tarefas "Pendentes" ou "Concluídas".