# Plan de Test pour l'API Propelize

## 1. Introduction
Ce document décrit les cas de test pour l'API de gestion des véhicules et des utilisateurs.

## 2. Tests Unitaires
### Véhicules
- **GET /api/vehicles** : Vérifier que tous les véhicules sont retournés.
- **POST /api/vehicles** : Vérifier la création d'un véhicule avec des données valides.
- **GET /api/vehicles/:id** : Vérifier la récupération d'un véhicule par ID.
- **PUT /api/vehicles/:id** : Vérifier la mise à jour d'un véhicule.
- **DELETE /api/vehicles/:id** : Vérifier la suppression d'un véhicule.

### Utilisateurs
- **POST /api/auth/register** : Vérifier la création d'un utilisateur.
- **POST /api/auth/login** : Vérifier la connexion avec des identifiants valides.
- **POST /api/auth/refresh-token** : Vérifier le renouvellement du token.

## 3. Tests d'Intégration
- Vérifier que POST /api/vehicles ajoute un véhicule et que GET /api/vehicles le retourne.
- Vérifier que les routes protégées renvoient 401 sans token.
- Vérifier que seuls les admins peuvent supprimer des véhicules (si implémenté).

## 4. Tests de Sécurité
- Vérifier que les mots de passe sont hashés.
- Vérifier que les tokens JWT expirent après 15 minutes.
- Vérifier que les refresh tokens permettent de générer de nouveaux access tokens.