// 1. IMPORTAÇÕES
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const taskRoutes = require("./routes/taskRoutes");

// 2. INICIALIZAÇÃO DO EXPRESS
const app = express();
const PORT = 3000;

// 3. CONFIGURAÇÃO DE MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // ✅ serve arquivos estáticos (CSS, imagens etc.)

// ✅ Configuração completa do Handlebars com helper e layout padrão
const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b, // usado no edit.handlebars para comparar valores
  },
  defaultLayout: "main", // usa views/layouts/main.handlebars como base
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views"); // garante que ele olhe para a pasta views/

// 4. USO DAS ROTAS
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => res.redirect("/tasks"));

// 5. CONEXÃO COM O BANCO E INICIALIZAÇÃO DO SERVIDOR
conn
  .sync() // se quiser atualizar automaticamente o banco, use: .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`)
    );
  })
  .catch((err) =>
    console.log("❌ Erro ao conectar com o banco de dados:", err)
  );
