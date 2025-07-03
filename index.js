// Importation des modules nécessaires
const express = require('express'); // Framework web pour Node.js
const mongoose = require('mongoose'); // ODM (Object Data Modeling) pour MongoDB
require('dotenv').config(); // Charge les variables d'environnement depuis un fichier .env

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Définition du port (utilise le port depuis .env ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// Route racine améliorée avec informations détaillées
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'active',
    message: 'API de location de véhicules en marche 🚗',
    version: '1.0.0',
    documentation: 'http://localhost:3000/api-docs',
    endpoints: {
      vehicles: {
        all: '/api/vehicles',
        byId: '/api/vehicles/:id',
        create: 'POST /api/vehicles',
        update: 'PUT /api/vehicles/:id',
        delete: 'DELETE /api/vehicles/:id'
      }
    }
  });
});

// Importation des routes véhicules
const vehicleRoutes = require('./routes/vehicles');
// Montage des routes véhicules sous le préfixe /api/vehicles
app.use('/api/vehicles', vehicleRoutes);

// Middleware pour gérer les erreurs 404 (Route non trouvée)
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    availableEndpoints: {
      root: '/',
      vehicles: '/api/vehicles'
    }
  });
});

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connecté ✔️");
    // Démarrage du serveur seulement après la connexion à MongoDB
    app.listen(PORT, () => {
      console.log(`Serveur en écoute sur le port ${PORT}`);
      console.log(`URL: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erreur MongoDB ❌", err);
    process.exit(1); // Quitte l'application en cas d'erreur de connexion
  });

// Middleware pour gérer les erreurs globales (doit être le dernier middleware)
app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);
  res.status(500).json({ 
    error: 'Erreur serveur interne',
    message: err.message || 'Une erreur est survenue'
  });
});