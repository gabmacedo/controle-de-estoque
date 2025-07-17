import express from 'express'
import materiaisRoutes from './routes/materiaisRoutes.js'
import clientesRouter from './routes/clientesRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta pages
const pagesPath = path.join(__dirname, '..', 'frontend', 'pages');

// Servir arquivos estáticos da pasta pages
app.use(express.static(pagesPath));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(pagesPath, 'main.html'));
});

app.use('/src', express.static(path.join(__dirname, '..', 'frontend', 'src')));

app.use('/materiais', materiaisRoutes)
app.use('/clientes', clientesRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} acesse em localhost:3000`)
})