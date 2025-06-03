const Inscricao = require('../models/Inscricao');
const Curso = require('../models/Curso');

const InscricaoService = {
  async inscrever(usuarioId, cursoId) {
    // Verifica se o curso existe
    const curso = await Curso.findByPk(cursoId);
    if (!curso) throw new Error('Curso não encontrado');

    // Verifica se o usuário já tem inscrição não cancelada nesse curso
    const existente = await Inscricao.findOne({
      where: {
        usuario_id: usuarioId,
        curso_id: cursoId,
        cancelada_em: null,
      },
    });

    if (existente) {
      throw new Error('Usuário já inscrito nesse curso');
    }

    // Cria a inscrição
    return await Inscricao.create({
      usuario_id: usuarioId,
      curso_id: cursoId,
      cancelada_em: null,
    });
  },

  async cancelarInscricao(usuarioId, cursoId) {
    const inscricao = await Inscricao.findOne({
      where: {
        usuario_id: usuarioId,
        curso_id: cursoId,
        cancelada_em: null,
      },
    });

    if (!inscricao) {
      throw new Error('Inscrição ativa não encontrada');
    }

    inscricao.cancelada_em = new Date();
    await inscricao.save();

    return inscricao;
  },

  async listarCursosInscritos(usuarioId) {
    const inscricoes = await Inscricao.findAll({
      where: { usuario_id: usuarioId },
      include: [{
        model: Curso,
      }],
    });

    // Formatar resultado conforme front espera
    return inscricoes.map(i => ({
      id: i.curso.id,
      nome: i.curso.nome,
      descricao: i.curso.descricao,
      capa: i.curso.capa,
      inicio: i.curso.inicio.toLocaleDateString('pt-BR'),
      inscricoes: 0, // pode ser contado em outro método se quiser
      inscricao_cancelada: i.cancelada_em !== null,
      inscrito: i.cancelada_em === null,
    }));
  }
};

module.exports = InscricaoService;