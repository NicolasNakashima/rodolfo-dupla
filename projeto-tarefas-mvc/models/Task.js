const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Task = db.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.ENUM("Baixa", "Média", "Alta"),
    allowNull: false,
    defaultValue: "Baixa",
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = Task;
