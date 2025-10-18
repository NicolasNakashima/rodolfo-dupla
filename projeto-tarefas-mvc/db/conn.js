const { Sequelize } = require("sequelize");

// Configuração da conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize(
  "rodolfo-dupla-db",
  "avnadmin",
  process.env.DATABASE_KEY,
  {
    host: "daichi-grilo-germinares.g.aivencloud.com",
    port: 17034,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Força uso de SSL
        rejectUnauthorized: false, // Aceita certificado autoassinado
      },
    },
    logging: console.log, // Mostra as queries SQL no console
    define: {
      timestamps: true, // createdAt / updatedAt
      underscored: false, // Usa camelCase
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Função para testar a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com PostgreSQL estabelecida com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error.message);
  }
}

testConnection();

module.exports = sequelize;
