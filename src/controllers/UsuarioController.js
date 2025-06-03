const UsuarioService = require('../services/UsuarioService');

const UsuarioController = {
    async listarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.listarUsuarios();

      console.log('Usuários encontrados:', usuarios);
      
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ mensagem: 'Erro ao listar usuários' });
    }
  },

  async cadastrar(req, res) {
    try {
      const resultado = await UsuarioService.cadastrar(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },

  async login(req, res) {
    try {
      const token = await UsuarioService.login(req.body);

      res
        .cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json({ mensagem: 'Login realizado com sucesso' });
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
};

module.exports = UsuarioController;