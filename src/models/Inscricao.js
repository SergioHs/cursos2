const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./Usuario');
const Curso = require('./Curso');

const Inscricao = sequelize.define('Inscricao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cancelada_em: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'inscricoes',
  timestamps: true, // createdAt, updatedAt
});

Usuario.hasMany(Inscricao, { foreignKey: 'usuario_id' });
Inscricao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Curso.hasMany(Inscricao, { foreignKey: 'curso_id' });
Inscricao.belongsTo(Curso, { foreignKey: 'curso_id' });

module.exports = Inscricao;