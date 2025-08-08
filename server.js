import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
app.use(express.json());

// Conectar ao MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra o servidor em caso de falha
  }
};

// Rota raiz
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Definir o esquema do usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 18 }
});

// Criar o modelo User
const User = mongoose.model('User ', userSchema);

// Rota POST para criar usuários
app.post('/users', async (req, res) => {
  try {
    const newUser  = await User.create(req.body);
    res.status(201).json(newUser );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota GET para listar usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
