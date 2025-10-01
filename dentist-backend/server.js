const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // Ajusta según tu frontend
  credentials: true
}));

mongoose.connect('mongodb+srv://alejo:alejo@cluster0.o5halzu.mongodb.net/dentistya');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: String,
  name: String,
  phone: String,
  createdAt: Date,
  linkedProfileId: String
});

const User = mongoose.model('User', UserSchema, 'users');

app.post('/api/login-doctor', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos.' });
    }
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({
        success: true,
        user: {
          email: user.email,
          role: user.role,
          name: user.name
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await mongoose.connection.collection('patients').find({}).toArray();
    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener pacientes', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API Dentist Backend funcionando');
});

app.listen(3001, () => {
  console.log('Servidor backend escuchando en puerto 3001');
});