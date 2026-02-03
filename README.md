# 📮 Plateforme de Gestion des Courriers DCIRE-SONATEL

Une application web moderne pour la gestion centralisée des courriers administratifs avec un système de workflow multi-rôles.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Caractéristiques](#caractéristiques)
- [Stack technologique](#stack-technologique)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Authentification](#authentification)
- [Rôles et permissions](#rôles-et-permissions)
- [API](#api)
- [Développement](#développement)
- [Déploiement](#déploiement)
- [Dépannage](#dépannage)

## 🎯 Aperçu

La plateforme **Gestion des Courriers DCIRE** est une solution intégrée permettant à différents rôles (Directeur, Département, Porteur de courrier, Assistante) de gérer efficacement le cycle de vie des courriers administratifs, depuis la réception jusqu'à la clôture.

### Vision
- **Centralisé** : Un point d'accès unique pour tous les courriers
- **Traçable** : Historique complet de chaque courrier
- **Efficace** : Workflow automatisé et rôles distincts
- **Intuitif** : Interface utilisateur moderne et responsive

## ✨ Caractéristiques

### Gestion des courriers
- ✅ Création et enregistrement des courriers
- ✅ Classification par type (officiel, administratif, commercial)
- ✅ Priorités (normal, urgent)
- ✅ Statut de workflow (en attente, assigné, en cours, clôturé)
- ✅ Upload de documents
- ✅ Tags et catégorisation
- ✅ Commentaires et réponses

### Gestion de workflow
- ✅ Assignation aux départements
- ✅ Escalade si dépassement de délai
- ✅ Historique des actions
- ✅ Notifications en temps réel
- ✅ Suivi de l'état

### Analyses et statistiques
- ✅ Tableau de bord personnalisé par rôle
- ✅ Statistiques de performance
- ✅ Rapports par période
- ✅ Graphiques interactifs

### Sécurité
- ✅ Authentification par email/mot de passe
- ✅ Gestion des rôles (RBAC)
- ✅ Sessions persistantes
- ✅ Déconnexion sécurisée

## 🛠 Stack technologique

### Frontend
- **React 18** - Librairie UI
- **TypeScript** - Typage statique
- **Vite** - Bundler ultra-rapide
- **React Router** - Routing côté client
- **Tailwind CSS** - Styling utility-first
- **Axios** - Client HTTP

### Backend
- **JSON Server** - Mock API/Database (développement)
- **REST API** - Architecture

### DevTools
- **ESLint** - Linting
- **TypeScript Compiler** - Vérification des types
- **Prettier** - Code formatting

### Système de fichiers
```
kombai/
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── layout/        # Layouts (Sidebar, Header, etc.)
│   │   ├── ui/            # Composants UI (Button, Modal, etc.)
│   │   ├── dashboard/     # Composants spécifiques au dashboard
│   │   ├── director/      # Composants du directeur
│   │   ├── department/    # Composants département
│   │   ├── porteur/       # Composants porteur de courrier
│   │   └── upload/        # Composants upload de fichiers
│   ├── pages/             # Pages/Routes
│   │   ├── Dashboard.tsx
│   │   ├── NewCourrierForm.tsx
│   │   ├── director/
│   │   ├── department/
│   │   └── porteur/
│   ├── services/          # Logique métier
│   │   ├── auth/          # Authentification
│   │   ├── api.ts         # Configuration API
│   │   ├── httpClient.ts  # Client HTTP
│   │   ├── courriers.ts   # Service courriers
│   │   ├── users.ts       # Service utilisateurs
│   │   └── ...
│   ├── repositories/      # Accès aux données
│   ├── context/           # Contextes React (Auth)
│   ├── types/             # Types TypeScript
│   ├── assets/            # Ressources (images, icônes)
│   ├── App.tsx            # Composant principal
│   └── main.tsx           # Point d'entrée
├── public/                # Fichiers publics
├── db.json               # Base de données JSON Server
├── package.json          # Dépendances
├── tsconfig.json         # Config TypeScript
├── vite.config.ts        # Config Vite
└── .gitignore           # Fichiers à ignorer
```

## 🚀 Installation

### Prérequis
- Node.js >= 16.0.0
- npm ou yarn

### Étapes

1. **Cloner le repository**
```bash
git clone <repository-url>
cd kombai
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**
```bash
npm run dev
```

4. **Accéder à l'application**
- Frontend: http://localhost:5173
- JSON Server: http://localhost:3001

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Gestion des Courriers DCIRE
VITE_APP_ENVIRONMENT=development
```

### JSON Server

Le fichier `db.json` contient la base de données mock :

```json
{
  "users": [...],
  "courriers": [...],
  "departments": [...],
  "notifications": [...],
  "stats": [...]
}
```

**Démarrer le serveur JSON** (si nécessaire) :
```bash
npx json-server --watch db.json --port 3001
```

## 👥 Utilisation

### Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| 👨‍💼 Directeur | `director@sonatel.sn` | `password123` |
| 🏢 Département | `department@sonatel.sn` | `password123` |
| 📮 Porteur | `porteur@sonatel.sn` | `password123` |
| 👩‍💻 Assistante | `assistant@sonatel.sn` | `password123` |

### Workflows par rôle

#### 1. Assistante
- Création de nouveaux courriers
- Upload de documents
- Suivi du statut
- Assignation aux départements

#### 2. Département
- Réception des courriers
- Traitement et réponses
- Marquage comme clôturé
- Suivi des délais

#### 3. Porteur de courrier
- Livraison physique
- Confirmation de réception
- Gestion des archives
- Suivi des statuts

#### 4. Directeur
- Vue d'ensemble complète
- Statistiques globales
- Gestion des escalades
- Rapports de performance

## 🏗 Architecture

### Architecture en couches

```
Présentation (React Components)
    ↓
State Management (React Context)
    ↓
Services (Business Logic)
    ↓
Repositories (Data Access)
    ↓
HTTP Client (API Communication)
    ↓
Backend API (JSON Server)
```

### Flux de données

```
Component → Hook (useAuth, useQuery) 
  → Service (authService, courrierService)
    → Repository (fetch/update data)
      → httpClient (REST call)
        → Backend (JSON Server)
```

## 🔐 Authentification

### Système d'authentification

1. **Login** : Email + Mot de passe
2. **Vérification** : Validation contre les utilisateurs en BD
3. **Token** : Génération d'un token de session
4. **Stockage** : LocalStorage (token + user)
5. **Contexte** : AuthContext met à jour l'état global

### Fichiers clés
- `src/services/auth/AuthService.ts` - Logique d'authentification
- `src/context/AuthContext.tsx` - Contexte d'authentification
- `src/components/Login.tsx` - Composant de connexion
- `src/components/ProtectedRoute.tsx` - Protection des routes
- `src/components/PublicRoute.tsx` - Routes publiques

### Flux de login

```mermaid
Login Form
   ↓
authService.login(email, password)
   ↓
Vérification credentials vs BD
   ↓
Génération token
   ↓
Sauvegarde localStorage
   ↓
AuthContext.login() met à jour state
   ↓
useEffect détecte isAuthenticated = true
   ↓
Navigation vers dashboard
   ↓
ProtectedRoute valide et laisse passer
```

## 👨‍👩‍👧‍👦 Rôles et permissions

### RBAC (Role-Based Access Control)

Chaque rôle a accès à des routes spécifiques :

```typescript
// Routes publiques
/ - Accueil
/login - Connexion
/mot-de-passe-oublie - Récupération mot de passe

// Routes assistante
/dashboard
/nouveau-courrier
/nouveau-courrier/formulaire

// Routes département
/departement/tableau-de-bord
/departement/tous-les-courriers
/departement/courriers-imputes
/departement/courriers-soldes

// Routes directeur
/directeur/tableau-de-bord
/directeur/tous-les-courriers
/directeur/courriers-imputes
/directeur/courriers-soldes

// Routes porteur
/porteur/tableau-de-bord
/porteur/courriers-a-solder
/porteur/courriers-soldes
/porteur/courriers-archives
```

### Vérification des rôles

```tsx
<ProtectedRoute requiredRoles={['director', 'department']}>
  <SomeComponent />
</ProtectedRoute>
```

## 📡 API

### Endpoints disponibles

#### Utilisateurs
```
GET    /users                    - Lister les utilisateurs
GET    /users/:id               - Récupérer un utilisateur
POST   /users                   - Créer un utilisateur
PUT    /users/:id               - Mettre à jour un utilisateur
DELETE /users/:id               - Supprimer un utilisateur
```

#### Courriers
```
GET    /courriers               - Lister les courriers
GET    /courriers/:id           - Récupérer un courrier
POST   /courriers               - Créer un courrier
PUT    /courriers/:id           - Mettre à jour un courrier
DELETE /courriers/:id           - Supprimer un courrier
GET    /courriers?status=X      - Filtrer par statut
```

#### Départements
```
GET    /departments             - Lister les départements
GET    /departments/:id         - Récupérer un département
POST   /departments             - Créer un département
PUT    /departments/:id         - Mettre à jour un département
```

#### Notifications
```
GET    /notifications           - Lister les notifications
GET    /notifications/:id       - Récupérer une notification
PUT    /notifications/:id       - Marquer comme lue
DELETE /notifications/:id       - Supprimer une notification
```

#### Statistiques
```
GET    /stats                   - Lister les statistiques
GET    /stats/:userId           - Stats d'un utilisateur
GET    /stats?period=monthly    - Stats par période
```

### Format de réponse

```typescript
// Succès
{
  "data": [...],
  "error": null
}

// Erreur
{
  "data": null,
  "error": "Message d'erreur"
}
```

## 💻 Développement

### Scripts disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check

# Formatter le code
npm run format
```

### Ajouter une nouvelle page

1. Créer le composant dans `src/pages/`
2. Ajouter la route dans `src/App.tsx`
3. Envelopper avec `<ProtectedRoute>` si nécessaire

```tsx
<Route 
  path="/ma-page" 
  element={
    <ProtectedRoute requiredRoles={['assistant']}>
      <MaPage />
    </ProtectedRoute>
  } 
/>
```

### Ajouter un service

1. Créer le service dans `src/services/`
2. Implémenter les méthodes
3. Exporter depuis `src/services/index.ts`

```typescript
export class MonService {
  async getData() { ... }
  async createItem(data) { ... }
}

export const monService = new MonService();
```

### Styles

L'application utilise **Tailwind CSS**. Consultez la [documentation Tailwind](https://tailwindcss.com).

## 🚢 Déploiement

### Build de production

```bash
npm run build
```

Cela génère un dossier `dist/` prêt pour le déploiement.

### Hébergement

L'application peut être hébergée sur :
- Vercel
- Netlify
- GitHub Pages
- Heroku
- AWS S3 + CloudFront
- Etc.

### Variables d'environnement production

```env
VITE_API_URL=https://api.monappli.com
VITE_APP_ENVIRONMENT=production
```

## 🐛 Dépannage

### Le login ne fonctionne pas

1. Vérifier que JSON Server est en cours d'exécution
2. Vérifier les credentials dans `db.json`
3. Vérifier la console du navigateur (F12) pour les erreurs
4. Vérifier que `VITE_API_URL` est correcte

### Les données ne se chargent pas

1. Vérifier la connexion au serveur API
2. Vérifier l'authentification (token valide)
3. Vérifier les erreurs réseau (onglet Network du navigateur)
4. Vérifier les logs du serveur

### Erreur "Cannot read property 'map' of undefined"

- Généralement due à des données mal structurées
- Vérifier la structure des données retournées par l'API
- Ajouter des vérifications nullish coalescing (`?.`)

### TypeScript errors

```bash
npm run type-check
```

Résout les erreurs de typage avant la compilation.

### Performance lente

- Vérifier la taille des bundles : `npm run build -- --stats`
- Utiliser React DevTools Profiler
- Implémenter la lazy loading pour les routes
- Optimiser les images

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [JSON Server](https://github.com/typicode/json-server)

## 📝 Licences et droits

Cette application est développée pour **SONATEL - DCIRE**.

## 👥 Support

Pour toute question ou problème :
1. Vérifier cette documentation
2. Consulter les fichiers de log
3. Contacter l'équipe de développement

---

**Dernière mise à jour** : Février 2026  
**Version** : 1.0.0
