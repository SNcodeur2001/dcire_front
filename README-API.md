# 🏢 Application de Gestion des Courriers - API JSON Server

Guide complet pour connecter votre application frontend avec JSON Server comme backend API.

## 📋 Table des Matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Structure de Données](#structure-de-données)
- [Endpoints API](#endpoints-api)
- [Connexion Frontend](#connexion-frontend)
- [Workflows par Rôle](#workflows-par-rôle)
- [Exemples d'Usage](#exemples-dusage)
- [Déploiement](#déploiement)

## 🚀 Installation

### Prérequis

- Node.js (version 16+)
- npm ou yarn

### Installation de JSON Server

```bash
# Installation globale
npm install -g json-server

# Ou installation locale dans le projet
npm install json-server --save-dev
```

### Lancement du serveur

```bash
# Depuis la racine du projet
json-server --watch db.json --port 3001

# Avec CORS activé (si nécessaire)
json-server --watch db.json --port 3001 --middlewares ./server.js
```

### Vérification

Ouvrez http://localhost:3001 dans votre navigateur pour voir l'interface JSON Server.

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
VITE_API_URL=http://localhost:3001
```

### Configuration CORS (optionnel)

Si vous rencontrez des erreurs CORS, créez `server.js` :

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
```

## 📊 Structure de Données

### Collections Principales

#### `courriers` - Entité principale
```json
{
  "id": "string",
  "reference": "CR-2024-001",
  "sender": "Ministère des Finances",
  "senderPhone": "+221331234567",
  "senderEmail": "contact@finance.gouv.sn",
  "subject": "Demande de partenariat",
  "type": "officiel|administratif|commercial",
  "priority": "priority|normal",
  "workflowStatus": "pending|assigned|in_progress|settled",
  "receptionDate": "2024-01-15",
  "registrationDate": "2024-01-15T10:30:00.000Z",
  "assignedDepartmentId": "2",
  "assignedPorteurId": "3",
  "deadline": "2024-01-25T00:00:00.000Z",
  "escalationLevel": 0,
  "tags": ["partenariat", "infrastructure"],
  "duration": 10,
  "createdBy": "4",
  "settledAt": "2024-01-25T14:30:00.000Z",
  "documentUrl": "/documents/CR-2024-001.pdf",
  "responses": [...],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-25T14:30:00.000Z"
}
```

#### `users` - Utilisateurs
```json
{
  "id": "1",
  "name": "Ousseynou Sane",
  "role": "director|department|porteur|assistant",
  "avatar": "/avatar-user.jpg",
  "email": "ousseynou.sane@sonatel.sn",
  "departmentId": "2",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### `departments` - Départements
```json
{
  "id": "2",
  "name": "Département Commercial",
  "code": "DC",
  "managerId": "2",
  "description": "Gestion commerciale et partenariats",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### `stats` - Statistiques
```json
{
  "id": "1",
  "userId": "1",
  "role": "director",
  "period": "monthly",
  "date": "2024-01",
  "metrics": {
    "totalReceived": 45,
    "totalAssigned": 42,
    "totalPending": 3,
    "totalSettled": 38,
    "totalOverdue": 2,
    "averageProcessingTime": 8.5
  },
  "lastUpdated": "2024-01-23T12:00:00.000Z"
}
```

#### `notifications` - Notifications
```json
{
  "id": "1",
  "userId": "1",
  "type": "new_courrier|assignment|deadline_warning|courrier_settled",
  "title": "Nouveau courrier prioritaire",
  "message": "Un nouveau courrier prioritaire a été reçu",
  "courrierId": "1",
  "isRead": false,
  "priority": "high|medium|low",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### `logs` - Traçabilité
```json
{
  "id": "1",
  "courrierId": "1",
  "action": "created|assigned|response_submitted|settled",
  "description": "Courrier créé par l'assistante",
  "userId": "4",
  "userRole": "assistant",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "metadata": {
    "sender": "Ministère des Finances",
    "priority": "priority"
  }
}
```

## 🔗 Endpoints API

### Courriers

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/courriers` | GET | Liste de tous les courriers |
| `/courriers/{id}` | GET | Détails d'un courrier |
| `/courriers` | POST | Créer un courrier |
| `/courriers/{id}` | PUT | Modifier un courrier |
| `/courriers/{id}` | DELETE | Supprimer un courrier |

### Filtrage des Courriers

```bash
# Par statut workflow
GET /courriers?workflowStatus=pending
GET /courriers?workflowStatus=assigned
GET /courriers?workflowStatus=settled

# Par département/porteur
GET /courriers?assignedDepartmentId=2
GET /courriers?assignedPorteurId=3

# Par créateur (assistante)
GET /courriers?createdBy=4

# Par priorité
GET /courriers?priority=priority

# Combinaisons
GET /courriers?assignedDepartmentId=2&workflowStatus=in_progress

# Tri et pagination
GET /courriers?_sort=createdAt&_order=desc&_page=1&_limit=10
```

### Autres Collections

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/users` | GET | Liste des utilisateurs |
| `/departments` | GET | Liste des départements |
| `/stats` | GET | Statistiques |
| `/notifications` | GET | Notifications |
| `/logs` | GET | Logs d'audit |

## 🔌 Connexion Frontend

### Service API (`src/services/api.ts`)

Le service API fournit des méthodes typées pour interagir avec JSON Server :

```typescript
import { api } from '../services/api';

// Exemples d'usage
const courriers = await api.getCourriers({ workflowStatus: 'pending' });
const user = await api.getUser('1');
const stats = await api.getStats('1', 'monthly');
```

### Intégration dans les Composants

```typescript
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

function AllCouriers() {
  const [courriers, setCourriers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getPendingCourriers();
      if (result.data) {
        setCourriers(result.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {courriers.map(courrier => (
        <div key={courrier.id}>{courrier.reference}</div>
      ))}
    </div>
  );
}
```

## 👥 Workflows par Rôle

### Assistante
```typescript
// Créer un courrier
await api.createCourrier({
  sender: "Ministère des Finances",
  subject: "Demande de partenariat",
  // ... autres champs
});

// Voir ses courriers créés
const myCourriers = await api.getMyCreatedCourriers('assistant-1');
```

### Directeur
```typescript
// Voir courriers à imputer
const pendingCourriers = await api.getPendingCourriers();

// Assigner à un département
await api.assignCourrierToDepartment('1', '2', 'director-1');

// Voir courriers imputés
const assignedCourriers = await api.getAssignedCourriers();

// Voir courriers soldés
const settledCourriers = await api.getSettledCourriers();
```

### Département
```typescript
// Voir courriers assignés au département
const deptCourriers = await api.getDepartmentCourriers('2');

// Voir courriers en attente d'assignation à un porteur
const pendingDeptCourriers = await api.getDepartmentPendingCourriers('2');

// Assigner à un porteur
await api.assignCourrierToPorteur('1', '3', '2');
```

### Porteur
```typescript
// Voir courriers à solder
const toSettleCourriers = await api.getPorteurToSettleCourriers('3');

// Voir courriers soldés
const settledCourriers = await api.getPorteurSettledCourriers('3');

// Marquer comme soldé
await api.settleCourrier('1', '3');
```

## 💡 Exemples d'Usage

### Recherche Avancée

```typescript
// Courriers prioritaires non assignés
const urgentPending = await api.getCourriers({
  priority: 'priority',
  workflowStatus: 'pending'
});

// Courriers en retard
const overdue = await api.getCourriers({
  deadline_lt: new Date().toISOString()
});

// Courriers par tags
const tagged = await api.getCourriers({
  tags_like: 'urgent'
});
```

### Notifications

```typescript
// Récupérer notifications non lues
const notifications = await api.getNotifications('1', true);

// Marquer comme lue
await api.markNotificationAsRead('1');
```

### Statistiques

```typescript
// Stats mensuelles du directeur
const directorStats = await api.getStats('1', 'monthly');

// Toutes les stats
const allStats = await api.getAllStats();
```

## 🚀 Déploiement

### Production

Pour la production, vous pouvez :

1. **Utiliser un serveur JSON Server dédié**
2. **Migrer vers une vraie base de données** (PostgreSQL, MongoDB)
3. **Utiliser un service BaaS** (Supabase, Firebase)

### Migration suggérée

Remplacez les appels API par des appels vers votre API REST réelle :

```typescript
// Avant (JSON Server)
const result = await api.getCourriers(filters);

// Après (API REST)
const result = await fetch('/api/courriers?' + new URLSearchParams(filters));
```

## 🐛 Dépannage

### Erreurs Courantes

**CORS errors :**
- Ajoutez les headers CORS dans `server.js`
- Ou utilisez un proxy dans Vite

**Port déjà utilisé :**
```bash
# Changer le port
json-server --watch db.json --port 3002
```

**Données non persistées :**
- JSON Server sauvegarde automatiquement dans `db.json`

## 📞 Support

Pour toute question concernant l'API ou l'intégration frontend, consultez :

- La documentation JSON Server : https://github.com/typicode/json-server
- Les types TypeScript dans `src/services/api.ts`
- Les exemples dans les composants existants

---

**🎉 Votre application est maintenant connectée à JSON Server !**