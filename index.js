const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const CursoRoutes = require('./src/routes/CursoRoutes')
const authRoutes = require('./src/routes/authRoutes');
const UsuarioRoutes = require('./src/routes/UsuarioRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/cursos', CursoRoutes)
app.use('/auth', authRoutes);
app.use('/usuarios', UsuarioRoutes)

sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
    app.listen(3000, ()=> console.log("Servidor rodando na porta 3000"));
}).catch(err => console.error("Erro ao conectar com banco de dados", err));