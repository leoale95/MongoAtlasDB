const app = require('./app');
const { connectToDatabase } = require('./database');

const port = 8080;

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}

startServer();
