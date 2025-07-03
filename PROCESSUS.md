# Processus de Conception de l'API

## 1. Compréhension des besoins
### Fonctionnels :
- Gestion des véhicules (création, lecture, mise à jour, suppression).
- Recherche et réservation de véhicules par les utilisateurs.
### Non-fonctionnels :
- Performance : réponse rapide des endpoints.
- Évolutivité : architecture microservices.
- Sécurité : protection des données via JWT.

## 2. Cible de l'application
- Utilisateurs finaux (clients louant des véhicules via mobile/web).
- Administrateurs gérant la flotte de véhicules.

## 3. Objectifs
- Fournir une API REST simple et intuitive.
- Garantir la fiabilité via des tests unitaires et d'intégration.
- Faciliter l'intégration avec d'autres microservices.

## 4. Processus de conception
### Ressources :
- Véhicule (registrationNumber, make, model, year, rentalPrice).
### Actions :
- Lister, créer, lire, mettre à jour, supprimer des véhicules.
### Design choisi :
- REST (léger, compatible, standardisé).
### Endpoints :
- GET /api/vehicles
- POST /api/vehicles
- GET /api/vehicles/:id
- PUT /api/vehicles/:id
- DELETE /api/vehicles/:id
### Formats :
- Requête POST : { "registrationNumber": "ABC123", "make": "Toyota", ... }
- Réponse : JSON avec code de statut (200, 201, 404, etc.).

## 5. Sécurité
- Authentification : JWT pour les routes protégées.
- Autorisation : Seuls les utilisateurs authentifiés peuvent modifier/supprimer.
- Protection des données : Mots de passe hashés avec bcrypt.

## 6. Documentation
- Swagger UI disponible sur /api-docs.