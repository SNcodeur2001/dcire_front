# Credentials de test pour la connexion

Le système de login utilise maintenant le jsonserver avec les credentials suivants :

## Comptes de test disponibles

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Directeur | director@sonatel.sn | password123 |
| Département | department@sonatel.sn | password123 |
| Porteur | porteur@sonatel.sn | password123 |
| Assistante | assistant@sonatel.sn | password123 |

## Utilisation

1. Accédez à la page de login
2. Entrez l'email et le mot de passe du rôle que vous souhaitez tester
3. L'application vous redirigera automatiquement vers le tableau de bord approprié

## Architecture d'authentification

- **AuthService** (`src/services/auth/AuthService.ts`) : Gère la logique de connexion/déconnexion
- **AuthContext** (`src/context/AuthContext.tsx`) : Fournit l'état d'authentification dans toute l'application
- **ProtectedRoute** (`src/components/ProtectedRoute.tsx`) : Protège les routes qui nécessitent une authentification
- **Login.tsx** : Composant de connexion rénovée

Le token et l'utilisateur actuels sont sauvegardés dans le localStorage pour maintenir la session.
