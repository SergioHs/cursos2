const InscricaoService = require('../services/InscricaoService');

const InscricaoController = {
  async inscrever(req, res) {
    try {
      const usuarioId = req.user.id; // extraído do JWT via middleware
      const cursoId = req.params.idCurso;

      await InscricaoService.inscrever(usuarioId, cursoId);
      res.status(200).json({ mensagem: 'Inscrição realizada com sucesso' });
    } catch (err) {
      res.status(400).json({ mensagem: err.message });
    }
  },

  async cancelar(req, res) {
    try {
      const usuarioId = req.user.id;
      const cursoId = req.params.idCurso;

      await InscricaoService.cancelarInscricao(usuarioId, cursoId);
      res.status(200).json({ mensagem: 'Inscrição cancelada com sucesso' });
    } catch (err) {
      res.status(400).json({ mensagem: err.message });
    }
  },

  async listarInscricoes(req, res) {
    try {
      const usuarioId = req.params.idUsuario;

      // Garante que o usuário só veja suas próprias inscrições
      if (usuarioId != req.user.id) {
        return res.status(403).json({ mensagem: 'Acesso negado' });
      }

      const cursos = await InscricaoService.listarCursosInscritos(usuarioId);
      res.status(200).json(cursos);
    } catch (err) {
      res.status(500).json({ mensagem: 'Erro ao buscar inscrições' });
    }
  }
};

module.exports = InscricaoController;
