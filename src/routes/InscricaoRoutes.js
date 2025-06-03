const express = require('express');
const InscricaoController = require('../controllers/InscricaoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware); // todas rotas precisam de token válido

router.post('/:idCurso', InscricaoController.inscrever);
router.delete('/:idCurso', InscricaoController.cancelar);
router.get('/:idUsuario', InscricaoController.listarInscricoes);

module.exports = router;