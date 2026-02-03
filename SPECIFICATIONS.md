# 🏗️ Spécifications techniques

Document technique détaillant l'architecture et les spécifications du projet.

## 🎯 Vue d'ensemble du projet

### Objectifs
- Centraliser la gestion des courriers administratifs
- Offrir une visibilité complète sur le cycle de vie des courriers
- Automatiser le workflow de traitement
- Fournir des statistiques et rapports

### Portée
**In scope:**
- Authentification multi-rôles
- Création et gestion des courriers
- Workflow d'assignation et traitement
- Notifications
- Tableaux de bord et statistiques
- Interface responsive

**Out of scope (v2+):**
- Intégration email
- Signature électronique
- Archivage long terme
- API mobile native

## 🏛️ Architecture système

### Architecture globale

```
┌─────────────────────────────────────────┐
│         Frontend (React + TS)           │
│  - SPA with Client-side routing         │
│  - State Management (Context API)       │
│  - Responsive UI (Tailwind CSS)         │
└──────────────┬──────────────────────────┘
               │ HTTP/REST
               │ (Axios)
┌──────────────▼──────────────────────────┐
│     Backend API (JSON Server)           │
│  - Mock API for development             │
│  - File-based data storage (db.json)    │
│  - RESTful endpoints                    │
└─────────────────────────────────────────┘
```

### Architecture en couches du Frontend

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  (React Components, Pages)          │
├─────────────────────────────────────┤
│     State Management Layer          │
│  (React Context, Hooks)             │
├─────────────────────────────────────┤
│     Business Logic Layer            │
│  (Services, useEffect logic)        │
├─────────────────────────────────────┤
│     Data Access Layer               │
│  (Repositories, API calls)          │
├─────────────────────────────────────┤
│     Communication Layer             │
│  (HTTP Client, API configuration)  │
└─────────────────────────────────────┘
```

## 🔐 Sécurité

### Authentification

```
┌─────────────┐
│   Login     │
│  Email/Pwd  │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Vérifier vs BD   │
│ (db.json users) │
└──────┬───────────┘
       │
       ▼ (Si valide)
┌──────────────────┐
│ Générer token    │
│ (base64 simple)  │
└──────┬───────────┘
       │
       ▼
┌──────────────────────────┐
│ Sauvegarder localStorage │
│ - authToken             │
│ - currentUser           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────┐
│ Update Context  │
│ (AuthContext)   │
└──────┬───────────┘
       │
       ▼
┌────────────────────┐
│ Navigation route   │
│ (selon le rôle)    │
└────────────────────┘
```

### Autorisation (RBAC)

Chaque route est protégée par `ProtectedRoute` qui vérifie :
1. **isAuthenticated** - Token présent et valide
2. **requiredRoles** - Rôle dans la liste autorisée

```tsx
<ProtectedRoute requiredRoles={['director', 'department']}>
  <PageContent />
</ProtectedRoute>
```

### Stockage des données sensibles

| Donnée | Stockage | Sécurité |
|--------|----------|----------|
| Token | localStorage | ❌ Non chiffré (dev) |
| User | localStorage | ❌ Non chiffré (dev) |
| Password | db.json | ❌ Plaintext (dev) |

**⚠️ À améliorer en production:**
- Chiffrer localStorage avec encryption.js
- Utiliser JWT au lieu de tokens simples
- Hasher les passwords avec bcrypt
- HTTPS obligatoire
- CORS strictement configuré

## 🗄️ Modèle de données

### Utilisateurs
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;           // Champ de connexion uniquement
  role: 'director' | 'department' | 'porteur' | 'assistant';
  avatar: string;
  departmentId?: string;       // Null pour directeur et assistante
  isActive: boolean;
  createdAt: string;          // ISO 8601
}
```

### Courriers
```typescript
interface Courrier {
  id: string;
  reference: string;           // CR-2024-001
  sender: string;
  senderPhone: string;
  senderEmail: string;
  subject: string;
  type: 'officiel' | 'administratif' | 'commercial';
  priority: 'normal' | 'priority';
  workflowStatus: 'pending' | 'assigned' | 'in_progress' | 'settled';
  receptionDate: string;
  registrationDate: string;
  assignedDepartmentId?: string;
  assignedPorteurId?: string;
  deadline: string;
  escalationLevel: number;     // 0, 1, 2, etc.
  tags: string[];
  duration: number;            // jours
  createdBy: string;           // userId
  settledAt?: string;
  documentUrl: string;
  responses: Response[];
  createdAt: string;
  updatedAt: string;
}
```

### Réponses
```typescript
interface Response {
  id: string;
  type: 'positive' | 'negative' | 'transfer' | 'information';
  data: Record<string, any>;
  attachments: string[];
  submittedBy: string;
  submittedAt: string;
  status: 'approved' | 'pending' | 'rejected';
}
```

### Notifications
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'new_courrier' | 'assignment' | 'deadline_warning' | 'courrier_settled';
  title: string;
  message: string;
  courrierId?: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
```

### Statistiques
```typescript
interface Stats {
  id: string;
  userId: string;
  role: string;
  period: 'monthly' | 'daily';
  date: string;
  metrics: {
    totalReceived?: number;
    totalAssigned?: number;
    totalInProgress?: number;
    totalSettled?: number;
    totalPending?: number;
    totalOverdue?: number;
    averageProcessingTime?: number;
    // ... autres métriques
  };
  lastUpdated: string;
}
```

## 📡 API REST

### Conventions

- **Base URL**: `http://localhost:3001` (dev)
- **Format**: JSON
- **Auth**: Token en localStorage (actuellement)
- **Pagination**: Query params `?_page=1&_limit=10`

### Endpoints principaux

#### Users
```
GET    /users                          # Lister tous
GET    /users/:id                      # Un seul
POST   /users                          # Créer
PUT    /users/:id                      # Mettre à jour
DELETE /users/:id                      # Supprimer

Filtres:
GET    /users?role=director
GET    /users?isActive=true
```

#### Courriers
```
GET    /courriers                      # Lister tous
GET    /courriers/:id                  # Un seul
POST   /courriers                      # Créer
PUT    /courriers/:id                  # Mettre à jour
DELETE /courriers/:id                  # Supprimer

Filtres:
GET    /courriers?status=pending
GET    /courriers?priority=priority
GET    /courriers?assignedDepartmentId=2
GET    /courriers?createdBy=user1
GET    /courriers?_sort=createdAt&_order=desc
```

#### Départements
```
GET    /departments                    # Lister tous
GET    /departments/:id                # Un seul
POST   /departments                    # Créer
PUT    /departments/:id                # Mettre à jour
DELETE /departments/:id                # Supprimer
```

#### Notifications
```
GET    /notifications                  # Lister tous
GET    /notifications/:id              # Une seule
GET    /notifications?userId=123       # Pour un utilisateur
PUT    /notifications/:id              # Mettre à jour (marquer comme lue)
DELETE /notifications/:id              # Supprimer
```

#### Statistiques
```
GET    /stats                          # Toutes les stats
GET    /stats/:id                      # Une stat
GET    /stats?userId=123               # Stats d'un utilisateur
GET    /stats?period=monthly           # Par période
POST   /stats                          # Créer une stat
PUT    /stats/:id                      # Mettre à jour
```

## 🔄 Workflows

### Workflow de création de courrier (Assistante)

```
1. Assistante clique "Nouveau courrier"
   ↓
2. Saisit les informations (sender, subject, etc.)
   ↓
3. Upload le document
   ↓
4. Clique "Créer"
   ↓
5. API: POST /courriers
   ↓
6. Courrier créé avec status = "pending"
   ↓
7. Notification au Directeur
   ↓
8. Redirection au dashboard
```

### Workflow de traitement (Département)

```
1. Département voit le courrier dans "Courriers imputés"
   ↓
2. Clique pour voir les détails
   ↓
3. Ajoute une réponse:
   - Positive: "Accepté, voici la réponse"
   - Négative: "Refusé, voici la raison"
   - Transfer: "Transféré à X département"
   - Information: "Informations supplémentaires"
   ↓
4. Upload les documents de réponse
   ↓
5. Clique "Soumettre"
   ↓
6. API: PUT /courriers/:id (status = "in_progress" ou "settled")
   ↓
7. API: POST /notifications (notifier les intéressés)
   ↓
8. Notification à l'Assistante et au Directeur
```

### Workflow de suivi (Directeur)

```
1. Directeur accède au dashboard
   ↓
2. Voit les statistiques et courriers en attente
   ↓
3. Peut escalader si dépassement de délai:
   - escalationLevel += 1
   - Envoie notification urgente
   ↓
4. Voit les rapports par période
   ↓
5. Peut exporter/imprimer les données
```

## 📊 Flux de données

### Récupération de données (Read)

```
Component
   ↓ useEffect
Service (e.g., courrierService.getAll())
   ↓ httpClient.get('/courriers')
HTTP Request (axios)
   ↓
JSON Server
   ↓
HTTP Response (200 OK + data)
   ↓
setState(data)
   ↓
Re-render component
```

### Créer/Mettre à jour (Write)

```
User Action (form submit)
   ↓
handleSubmit()
   ↓
Service.create(data) / Service.update(id, data)
   ↓
httpClient.post() / httpClient.put()
   ↓
HTTP Request (POST/PUT + JSON body)
   ↓
JSON Server
   ↓
Valider et sauvegarder dans db.json
   ↓
HTTP Response (201/200 + updated data)
   ↓
Update state
   ↓
Notification à l'utilisateur
   ↓
Re-fetch data (optional)
   ↓
Re-render
```

## 🚀 Performance & Scalabilité

### Considérations actuelles

| Aspect | Status | Notes |
|--------|--------|-------|
| Pagination | ❌ Non | À implémenter pour grandes listes |
| Lazy loading | ❌ Non | À implémenter pour routes |
| Caching | ❌ Non | À implémenter (React Query) |
| Optimisation images | ❌ Non | À implémenter (next/image ou sharp) |
| Bundle size | ⚠️ | ~150KB gzipped (acceptable) |
| Database | ⚠️ | JSON Server ok pour dev, SQLite/PostgreSQL pour prod |

### Recommandations

1. **Remplacer JSON Server par une vraie BD**
   - PostgreSQL + Express.js
   - Ou Firebase/Supabase pour quick wins

2. **Implémenter la pagination**
   ```tsx
   const [page, setPage] = useState(1)
   const data = await service.getAll({ page, limit: 10 })
   ```

3. **Ajouter React Query pour le caching**
   ```tsx
   const { data } = useQuery(['courriers'], () => service.getAll())
   ```

4. **Optimiser les images**
   - Compresser avec TinyPNG
   - Utiliser formats modernes (WebP)

## 📈 Métriques et monitoring

### À tracker en production

- Page load time
- API response time
- Error rate
- User login success rate
- Courrier processing time
- User engagement (DAU, MAU)

### Tools recommandés

- Google Analytics
- Sentry (error tracking)
- Datadog (APM)
- New Relic (monitoring)

## 🔄 Versioning

**Semantic Versioning** (MAJOR.MINOR.PATCH)

```
1.0.0
│ │ │
│ │ └─ Patch (bug fixes)
│ └─── Minor (new features, backward compatible)
└───── Major (breaking changes)
```

## 📝 Changelog

### v1.0.0 (Février 2026)
- ✅ Authentification
- ✅ Gestion des courriers
- ✅ Tableaux de bord
- ✅ Notifications basiques
- ✅ Interface responsive

### v1.1.0 (À venir)
- [ ] Pagination
- [ ] Filtres avancés
- [ ] Export PDF/Excel
- [ ] Intégration email

### v2.0.0 (À venir)
- [ ] Base de données réelle
- [ ] API backend avec authentification JWT
- [ ] Signature électronique
- [ ] Mobile app (React Native)

---

**Document version**: 1.0
**Last updated**: Février 2026
**Status**: Approuvé
