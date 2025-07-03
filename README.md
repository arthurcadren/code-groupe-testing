Propelize API - Location de Véhicules 
Bienvenue dans l'API de gestion des véhicules de location de l'application Propelize.
Cette API a été conçue avec Node.js et Express, et respecte une architecture RESTful, contenue dans des microservices, avec des tests automatisés et une infrastructure Docker.

Objectifs de l'application

Permettre aux utilisateurs de consulte, réserve, ajoute, modifie ou supprime des véhicules disponibles.
Proposer une API REST sûre, testée et bien documentée.
S'intégrer facilement avec l'application mobile/web.
Servir de base pour les futurs microservices (paiement, gestion client, etc.).

Design choisi : REST

« REST », c'est un style d'architecture qui permet à notre API d'être simple, claire et bien organisée.

Pourquoi REST ?

C'est léger, rapide, très utilisé.

Chaque ressource (ex: véhicule) est accessible via une URL.

Compatible avec tous les clients (mobile, web, etc.).


Endpoints

Méthode

Endpoint

Description

GET

/api/vehicles

Liste tous les véhicules

POST

/api/vehicles

Créer un nouveau véhicule

GET

/api/vehicles/:id

Obtenir un véhicule par ID

PUT

/api/vehicles/:id

Modifier un véhicule

DELETE

/api/vehicles/:id

Supprimer un véhicule

POST

/api/auth/register

Créer un utilisateur

POST

/api/auth/login

Se connecter (et recevoir un token)

Les endpoints protégés nécessitent un token JWT dans les headers.



Format des requêtes et réponses

Exemple de requête POST /api/vehicles
{
  "marque": "Toyota",
  "modele": "Corolla",
  "annee": 2020,
  "disponible": true
}

Exemple de réponse (succès)
{
  "_id": "663fd4a7f4e77e5ec37eab12",
  "marque": "Toyota",
  "modele": "Corolla",
  "annee": 2020,
  "disponible": true
}

Exemple de réponse (erreur)
{
  "error": "Le champ 'marque' est obligatoire."
}

Sécurité (authentification)

Pas besoin d'entrer sur le site . Il faut une clé (token JWT)  !

Mécanisme utilisé : JWT (JSON Web Token)

Après connexion, l'utilisateur reçoit un token JWT.

Ce token est nécessaire pour accéder aux routes sensibles (ex: ajout/suppression).

Protection des données

On ne stocke jamais les mots de passe en clair.

On utilise bcrypt pour hasher les mots de passe.

La base est isolée dans un conteneur.

Tests réalisés

Tests unitaires avec Jest

Chaque fonction de contrôleur est testée isolément (ex: création, suppression de véhicule).

Tests d'intégration avec Supertest

Tests complets de l'API comme si un utilisateur l'utilisait vraiment.

Exemple : test de POST suivi d'un GET pour vérifier que les données ont été ajoutées.

Instructions Docker (docker-compose)

Pour tout lancer automatiquement, comme un boss ☝️

1. Lancer le projet

docker-compose up --build

2. Structure

Service

Description

mongo

Base de données MongoDB

api

Serveur Node.js/Express

3. Seeders

Les données de démo sont ajoutées automatiquement à l'initialisation.

 Documentation interactive

Disponible via Swagger UI sur http://localhost:3000/api-docs une fois l'API lancée.