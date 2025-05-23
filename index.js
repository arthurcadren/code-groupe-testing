const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const vehicleRoutes = require('./routes/vehicles');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(process.env.PORT, () => console.log(`🚀 Serveur sur le port ${process.env.PORT}`));
  })
  .catch(err => console.error('❌ Erreur MongoDB', err));

module.exports = app;