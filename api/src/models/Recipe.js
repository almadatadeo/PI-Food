const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    image: {
      type: DataTypes.STRING
    },
    healthScore: {
      type: DataTypes.FLOAT
    },
    level: {
      type: DataTypes.FLOAT
    },
    steptostep: {
      type: DataTypes.TEXT
    }
  });
};

