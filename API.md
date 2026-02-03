# 📡 Guide API - Endpoints & Intégration

Documentation complète de tous les endpoints API et exemples d'intégration.

## 📋 Table des matières

1. [Configuration API](#configuration-api)
2. [Authentication](#authentication)
3. [Endpoints Users](#endpoints-users)
4. [Endpoints Courriers](#endpoints-courriers)
5. [Endpoints Departments](#endpoints-departments)
6. [Endpoints Notifications](#endpoints-notifications)
7. [Endpoints Stats](#endpoints-stats)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Examples](#examples)

---

## ⚙️ Configuration API

### Base URL

```
Development:  http://localhost:3001
Test:         https://api-test.example.com
Production:   https://api.example.com
```

### Headers par défaut

```bash
Content-Type: application/json
Authorization: Bearer <token>
User-Agent: Kombai/1.0
Accept-Language: fr-SN
```

### httpClient (Wrapper Axios)

**Fichier**: `src/services/httpClient.ts`

```typescript
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor pour ajouter le token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor pour gérer les erreurs
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré - rediriger au login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default client
```

---

## 🔐 Authentication

### Login

**POST** `/users` (Query pour chercher)

```bash
# Requête
curl -X GET http://localhost:3001/users?email=director@sonatel.sn

# Réponse 200 OK
[
  {
    "id": "1",
    "name": "Director",
    "email": "director@sonatel.sn",
    "password": "password123",
    "role": "director",
    "avatar": "avatar-director.jpg",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Token Format

```typescript
// Actuellement: Base64 token
const token = btoa(`${email}:${timestamp}`)
// "ZGlyZWN0b3JAc29uYXRlbC5zbjoxNjA3NzQ2MzAwMDA="

// À améliorer: JWT token
const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
)
```

### Token Storage

```typescript
// LocalStorage keys
localStorage.setItem('authToken', token)
localStorage.setItem('currentUser', JSON.stringify(user))

// Récupérer
const token = localStorage.getItem('authToken')
const user = JSON.parse(localStorage.getItem('currentUser') || '{}')

// Supprimer (Logout)
localStorage.removeItem('authToken')
localStorage.removeItem('currentUser')
```

---

## 👥 Endpoints Users

### Lister tous les utilisateurs

**GET** `/users`

```bash
# Simple
curl http://localhost:3001/users

# Avec paramètres
curl "http://localhost:3001/users?role=director&isActive=true"
curl "http://localhost:3001/users?_sort=name&_order=asc"
curl "http://localhost:3001/users?_page=1&_limit=10"
```

**Réponse:**
```json
[
  {
    "id": "1",
    "name": "Director",
    "email": "director@sonatel.sn",
    "role": "director",
    "avatar": "avatar-director.jpg",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "2",
    "name": "Department Manager",
    "email": "department@sonatel.sn",
    "role": "department",
    "departmentId": "dept-001",
    "isActive": true,
    "createdAt": "2024-01-15T10:35:00Z"
  }
]
```

### Récupérer un utilisateur

**GET** `/users/:id`

```bash
curl http://localhost:3001/users/1
```

**Réponse:**
```json
{
  "id": "1",
  "name": "Director",
  "email": "director@sonatel.sn",
  "role": "director",
  "avatar": "avatar-director.jpg",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Créer un utilisateur

**POST** `/users`

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "newuser@sonatel.sn",
    "password": "secure123",
    "role": "department",
    "departmentId": "dept-001",
    "avatar": "avatar.jpg",
    "isActive": true
  }'
```

**Réponse 201 Created:**
```json
{
  "id": "5",
  "name": "New User",
  "email": "newuser@sonatel.sn",
  "role": "department",
  "departmentId": "dept-001",
  "isActive": true,
  "createdAt": "2024-02-15T14:20:00Z"
}
```

### Mettre à jour un utilisateur

**PUT** `/users/:id`

```bash
curl -X PUT http://localhost:3001/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "avatar": "new-avatar.jpg",
    "isActive": true
  }'
```

**Réponse 200 OK:**
```json
{
  "id": "1",
  "name": "Updated Name",
  "email": "director@sonatel.sn",
  "role": "director",
  "avatar": "new-avatar.jpg",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-02-15T14:25:00Z"
}
```

### Supprimer un utilisateur

**DELETE** `/users/:id`

```bash
curl -X DELETE http://localhost:3001/users/1
```

**Réponse 204 No Content** (ou 200 OK avec message)

---

## 📮 Endpoints Courriers

### Lister tous les courriers

**GET** `/courriers`

```bash
# Simple
curl http://localhost:3001/courriers

# Avec filtres
curl "http://localhost:3001/courriers?status=pending&priority=priority"
curl "http://localhost:3001/courriers?assignedDepartmentId=dept-001"
curl "http://localhost:3001/courriers?_sort=createdAt&_order=desc"
curl "http://localhost:3001/courriers?_page=1&_limit=20"

# Combiné
curl "http://localhost:3001/courriers?status=in_progress&_limit=10&_sort=deadline&_order=asc"
```

**Réponse:**
```json
[
  {
    "id": "cr-001",
    "reference": "CR-2024-001",
    "sender": "John Doe",
    "senderPhone": "+221771234567",
    "senderEmail": "john@example.com",
    "subject": "Demande d'information",
    "type": "officiel",
    "priority": "normal",
    "workflowStatus": "pending",
    "receptionDate": "2024-02-15T10:00:00Z",
    "registrationDate": "2024-02-15T11:00:00Z",
    "deadline": "2024-02-22T23:59:59Z",
    "escalationLevel": 0,
    "tags": ["urgent", "follow-up"],
    "duration": 7,
    "createdBy": "1",
    "documentUrl": "documents/cr-001.pdf",
    "responses": [],
    "createdAt": "2024-02-15T11:05:00Z",
    "updatedAt": "2024-02-15T11:05:00Z"
  },
  {
    "id": "cr-002",
    "reference": "CR-2024-002",
    "sender": "Jane Smith",
    "senderPhone": "+221777654321",
    "senderEmail": "jane@example.com",
    "subject": "Rapport mensuel",
    "type": "administratif",
    "priority": "priority",
    "workflowStatus": "assigned",
    "assignedDepartmentId": "dept-001",
    "receptionDate": "2024-02-14T09:30:00Z",
    "registrationDate": "2024-02-14T10:15:00Z",
    "deadline": "2024-02-21T23:59:59Z",
    "escalationLevel": 1,
    "tags": ["monthly", "report"],
    "duration": 7,
    "createdBy": "1",
    "documentUrl": "documents/cr-002.pdf",
    "responses": [],
    "createdAt": "2024-02-14T10:20:00Z",
    "updatedAt": "2024-02-14T10:20:00Z"
  }
]
```

### Récupérer un courrier

**GET** `/courriers/:id`

```bash
curl http://localhost:3001/courriers/cr-001
```

**Réponse:**
```json
{
  "id": "cr-001",
  "reference": "CR-2024-001",
  "sender": "John Doe",
  "senderPhone": "+221771234567",
  "senderEmail": "john@example.com",
  "subject": "Demande d'information",
  "type": "officiel",
  "priority": "normal",
  "workflowStatus": "pending",
  "receptionDate": "2024-02-15T10:00:00Z",
  "registrationDate": "2024-02-15T11:00:00Z",
  "deadline": "2024-02-22T23:59:59Z",
  "escalationLevel": 0,
  "tags": ["urgent", "follow-up"],
  "duration": 7,
  "createdBy": "1",
  "documentUrl": "documents/cr-001.pdf",
  "responses": [
    {
      "id": "resp-001",
      "type": "positive",
      "data": { "comment": "Accepté" },
      "attachments": ["documents/response-001.pdf"],
      "submittedBy": "2",
      "submittedAt": "2024-02-20T14:30:00Z",
      "status": "approved"
    }
  ],
  "createdAt": "2024-02-15T11:05:00Z",
  "updatedAt": "2024-02-20T14:30:00Z"
}
```

### Créer un courrier

**POST** `/courriers`

```bash
curl -X POST http://localhost:3001/courriers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "reference": "CR-2024-003",
    "sender": "New Sender",
    "senderPhone": "+221771111111",
    "senderEmail": "sender@example.com",
    "subject": "New request",
    "type": "officiel",
    "priority": "normal",
    "workflowStatus": "pending",
    "receptionDate": "2024-02-15T10:00:00Z",
    "registrationDate": "2024-02-15T11:00:00Z",
    "deadline": "2024-02-22T23:59:59Z",
    "tags": ["new"],
    "duration": 7,
    "createdBy": "1",
    "documentUrl": "documents/cr-003.pdf"
  }'
```

**Réponse 201 Created:**
```json
{
  "id": "cr-003",
  "reference": "CR-2024-003",
  "sender": "New Sender",
  "senderPhone": "+221771111111",
  "senderEmail": "sender@example.com",
  "subject": "New request",
  "type": "officiel",
  "priority": "normal",
  "workflowStatus": "pending",
  "receptionDate": "2024-02-15T10:00:00Z",
  "registrationDate": "2024-02-15T11:00:00Z",
  "deadline": "2024-02-22T23:59:59Z",
  "escalationLevel": 0,
  "tags": ["new"],
  "duration": 7,
  "createdBy": "1",
  "documentUrl": "documents/cr-003.pdf",
  "responses": [],
  "createdAt": "2024-02-15T12:00:00Z",
  "updatedAt": "2024-02-15T12:00:00Z"
}
```

### Mettre à jour un courrier

**PUT** `/courriers/:id`

```bash
curl -X PUT http://localhost:3001/courriers/cr-001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "workflowStatus": "in_progress",
    "assignedDepartmentId": "dept-001",
    "escalationLevel": 1,
    "tags": ["urgent", "follow-up", "escalated"]
  }'
```

**Réponse 200 OK:**
```json
{
  "id": "cr-001",
  "reference": "CR-2024-001",
  "sender": "John Doe",
  "senderPhone": "+221771234567",
  "senderEmail": "john@example.com",
  "subject": "Demande d'information",
  "type": "officiel",
  "priority": "normal",
  "workflowStatus": "in_progress",
  "receptionDate": "2024-02-15T10:00:00Z",
  "registrationDate": "2024-02-15T11:00:00Z",
  "assignedDepartmentId": "dept-001",
  "deadline": "2024-02-22T23:59:59Z",
  "escalationLevel": 1,
  "tags": ["urgent", "follow-up", "escalated"],
  "duration": 7,
  "createdBy": "1",
  "documentUrl": "documents/cr-001.pdf",
  "responses": [],
  "createdAt": "2024-02-15T11:05:00Z",
  "updatedAt": "2024-02-16T09:15:00Z"
}
```

### Ajouter une réponse à un courrier

**PUT** `/courriers/:id` (Ajouter un response)

```bash
curl -X PUT http://localhost:3001/courriers/cr-001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "workflowStatus": "settled",
    "settledAt": "2024-02-20T14:30:00Z",
    "responses": [
      {
        "id": "resp-001",
        "type": "positive",
        "data": {
          "comment": "Demande approuvée"
        },
        "attachments": ["documents/response-001.pdf"],
        "submittedBy": "2",
        "submittedAt": "2024-02-20T14:30:00Z",
        "status": "approved"
      }
    ]
  }'
```

### Supprimer un courrier

**DELETE** `/courriers/:id`

```bash
curl -X DELETE http://localhost:3001/courriers/cr-001 \
  -H "Authorization: Bearer $TOKEN"
```

**Réponse 204 No Content**

---

## 🏢 Endpoints Departments

### Lister tous les départements

**GET** `/departments`

```bash
curl http://localhost:3001/departments
```

**Réponse:**
```json
[
  {
    "id": "dept-001",
    "name": "Direction Générale",
    "code": "DG",
    "manager": "Director Name",
    "managerId": "1",
    "description": "Département principal",
    "isActive": true,
    "createdAt": "2024-01-01T08:00:00Z"
  },
  {
    "id": "dept-002",
    "name": "Ressources Humaines",
    "code": "RH",
    "manager": "Manager Name",
    "managerId": "2",
    "description": "Département RH",
    "isActive": true,
    "createdAt": "2024-01-01T08:00:00Z"
  }
]
```

### Récupérer un département

**GET** `/departments/:id`

```bash
curl http://localhost:3001/departments/dept-001
```

### Créer un département

**POST** `/departments`

```bash
curl -X POST http://localhost:3001/departments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Nouveau Département",
    "code": "ND",
    "manager": "Manager Name",
    "managerId": "5",
    "description": "Description",
    "isActive": true
  }'
```

### Mettre à jour un département

**PUT** `/departments/:id`

```bash
curl -X PUT http://localhost:3001/departments/dept-001 \
  -H "Content-Type: application/json" \
  -d '{"manager": "New Manager", "managerId": "3"}'
```

### Supprimer un département

**DELETE** `/departments/:id`

```bash
curl -X DELETE http://localhost:3001/departments/dept-001
```

---

## 🔔 Endpoints Notifications

### Lister les notifications

**GET** `/notifications`

```bash
curl "http://localhost:3001/notifications?userId=1"
curl "http://localhost:3001/notifications?isRead=false"
```

**Réponse:**
```json
[
  {
    "id": "notif-001",
    "userId": "1",
    "type": "new_courrier",
    "title": "Nouveau courrier",
    "message": "Un nouveau courrier a été reçu",
    "courrierId": "cr-001",
    "isRead": false,
    "priority": "high",
    "createdAt": "2024-02-15T11:00:00Z"
  },
  {
    "id": "notif-002",
    "userId": "1",
    "type": "assignment",
    "title": "Nouvelle assignation",
    "message": "Vous avez été assigné à CR-2024-001",
    "courrierId": "cr-001",
    "isRead": true,
    "priority": "medium",
    "createdAt": "2024-02-15T11:05:00Z"
  }
]
```

### Marquer une notification comme lue

**PUT** `/notifications/:id`

```bash
curl -X PUT http://localhost:3001/notifications/notif-001 \
  -H "Content-Type: application/json" \
  -d '{"isRead": true}'
```

### Supprimer une notification

**DELETE** `/notifications/:id`

```bash
curl -X DELETE http://localhost:3001/notifications/notif-001
```

---

## 📊 Endpoints Stats

### Récupérer les statistiques

**GET** `/stats`

```bash
curl "http://localhost:3001/stats?userId=1"
curl "http://localhost:3001/stats?period=monthly"
```

**Réponse:**
```json
[
  {
    "id": "stat-001",
    "userId": "1",
    "role": "director",
    "period": "monthly",
    "date": "2024-02",
    "metrics": {
      "totalReceived": 45,
      "totalAssigned": 40,
      "totalInProgress": 25,
      "totalSettled": 20,
      "totalPending": 5,
      "totalOverdue": 2,
      "averageProcessingTime": 3.5
    },
    "lastUpdated": "2024-02-15T12:00:00Z"
  }
]
```

### Créer une statistique

**POST** `/stats`

```bash
curl -X POST http://localhost:3001/stats \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1",
    "role": "director",
    "period": "monthly",
    "date": "2024-02",
    "metrics": {
      "totalReceived": 45,
      "totalAssigned": 40,
      "totalSettled": 20,
      "averageProcessingTime": 3.5
    }
  }'
```

---

## ❌ Error Handling

### Format d'erreur standard

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": [
      {
        "field": "email",
        "message": "Email is invalid"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ],
    "timestamp": "2024-02-15T12:00:00Z",
    "requestId": "req-123456"
  }
}
```

### Codes d'erreur

| Code | HTTP | Description |
|------|------|-------------|
| `SUCCESS` | 200 | Succès |
| `CREATED` | 201 | Ressource créée |
| `VALIDATION_ERROR` | 400 | Erreur de validation |
| `UNAUTHORIZED` | 401 | Non authentifié |
| `FORBIDDEN` | 403 | Non autorisé |
| `NOT_FOUND` | 404 | Ressource non trouvée |
| `CONFLICT` | 409 | Conflit (e.g., dupliquer) |
| `RATE_LIMIT` | 429 | Limite de taux dépassée |
| `SERVER_ERROR` | 500 | Erreur serveur |

### Gestion des erreurs en React

```typescript
async function fetchCourriers() {
  try {
    const response = await httpClient.get('/courriers')
    setCourriers(response.data)
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expiré
      logout()
      navigate('/login')
    } else if (error.response?.status === 403) {
      // Non autorisé
      showError('Vous n\'avez pas la permission d\'accéder à cette ressource')
    } else if (error.response?.status === 404) {
      // Non trouvé
      showError('Ressource non trouvée')
    } else {
      // Erreur générique
      showError('Une erreur s\'est produite')
    }
  }
}
```

---

## 🚦 Rate Limiting

### Limites par rôle

| Rôle | Limite | Fenêtre |
|------|--------|---------|
| Anonyme | 100 | 1 heure |
| Utilisateur | 1000 | 1 heure |
| Admin | Illimité | N/A |

### Headers de rate limit

```bash
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1645027200
```

### Gérer le rate limiting

```typescript
async function withRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (error.response?.status === 429) {
        const resetTime = parseInt(error.response.headers['x-ratelimit-reset'])
        const delay = resetTime - Date.now()
        await new Promise(r => setTimeout(r, delay))
        continue
      }
      throw error
    }
  }
}
```

---

## 📚 Examples

### Exemple 1: Créer et lister des courriers

```typescript
import { courrierService } from '../../services'

function CourrierManager() {
  const [courriers, setCourriers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCourriers()
  }, [])

  const loadCourriers = async () => {
    setLoading(true)
    try {
      const data = await courrierService.getAll()
      setCourriers(data)
    } catch (error) {
      console.error('Failed to load courriers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCourrier = async (formData) => {
    try {
      const newCourrier = await courrierService.create(formData)
      setCourriers([...courriers, newCourrier])
      showSuccess('Courrier créé avec succès')
    } catch (error) {
      showError('Erreur lors de la création')
    }
  }

  return (
    <div>
      <CreateCourrierForm onSubmit={handleCreateCourrier} />
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <CourrierList courriers={courriers} />
      )}
    </div>
  )
}
```

### Exemple 2: Filtrer et paginer

```typescript
const [filters, setFilters] = useState({
  status: 'pending',
  priority: 'high',
  page: 1,
  limit: 10
})

const fetchFiltered = async () => {
  const params = {
    ...(filters.status && { status: filters.status }),
    ...(filters.priority && { priority: filters.priority }),
    _page: filters.page,
    _limit: filters.limit,
    _sort: 'createdAt',
    _order: 'desc'
  }
  
  const response = await httpClient.get('/courriers', { params })
  setCourriers(response.data)
}
```

### Exemple 3: Mettre à jour avec validation

```typescript
const handleUpdateCourrier = async (id, updates) => {
  // Validation
  if (!updates.subject?.trim()) {
    showError('Le sujet est requis')
    return
  }

  try {
    const updated = await courrierService.update(id, updates)
    // Mettre à jour le state local
    setCourriers(c => c.map(curr => 
      curr.id === id ? updated : curr
    ))
    showSuccess('Courrier mis à jour')
  } catch (error) {
    showError('Erreur lors de la mise à jour')
  }
}
```

---

**Document version**: 1.0
**Last updated**: Février 2026
**Status**: Approuvé
