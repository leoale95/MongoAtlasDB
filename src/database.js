const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://leoale95:Sanjon13@cluster.lw8azkn.mongodb.net/?retryWrites=true&w=majority');
    console.log('Conectado a la base de datos de MongoDB Atlas');
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
}

module.exports = { connectToDatabase };
