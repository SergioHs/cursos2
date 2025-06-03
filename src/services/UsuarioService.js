const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const UsuarioService = {
    async listarUsuarios() {
        const sql = 'SELECT id, nome, email FROM usuarios ORDER BY nome';

        const [results, metadata] = await sequelize.query(sql);

        console.log('Resultados da consulta:', results);

        // results é o array de objetos resultado da query
        return results;
  },

  async cadastrar({ nome, email, senha, nascimento }) {
    // Verificar se email já existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      throw new Error('Email já cadastrado');
    }

    // Hashear senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário no banco
    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      nascimento,
    });

    return usuario;
  },

  async login({ email, senha }) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    // Gerar token JWT usando a variável de ambiente diretamente
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,  // <--- AQUI
      { expiresIn: '1h' }
    );

    return token;
  },
};

module.exports = UsuarioService;