const {DataTypes} = require ('sequelize');
const sequelize = require ('../db/connection');

const Student = sequelize.define ('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  marks: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
});

module.exports = Student;
