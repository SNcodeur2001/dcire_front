# 🗂️ Structure des dossiers - Guide complet

Guide détaillé de la structure du projet et l'organisation du code.

## 📁 Arborescence complète

```
kombai/
├── public/                              # Ressources statiques
│   ├── documents/                       # Documents générés/uploadés
│   ├── icons/                          # Icônes SVG/PNG
│   └── favicon.ico
├── src/
│   ├── components/                      # Composants réutilisables
│   │   ├── ForgotPassword.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Login.tsx                   # Formulaire de connexion
│   │   ├── ProtectedRoute.tsx          # Garde des routes protégées
│   │   ├── PublicRoute.tsx             # Permet seulement aux non-auth
│   │   ├── dashboard/
│   │   │   └── DataTable.tsx
│   │   ├── director/
│   │   │   └── DirectorDataTable.tsx
│   │   ├── layout/                      # Composants de mise en page
│   │   │   ├── DepartmentHeader.tsx
│   │   │   ├── DepartmentLayout.tsx
│   │   │   ├── DepartmentSidebar.tsx   # Navigation Département
│   │   │   ├── DirectorHeader.tsx
│   │   │   ├── DirectorLayout.tsx
│   │   │   ├── DirectorSidebar.tsx     # Navigation Directeur
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx          # Layout principal
│   │   │   ├── PorteurHeader.tsx
│   │   │   ├── PorteurLayout.tsx
│   │   │   ├── PorteurSidebar.tsx      # Navigation Porteur
│   │   │   └── Sidebar.tsx             # Navigation Assistante
│   │   ├── porteur/                     # Formulaires spécifiques au Porteur
│   │   │   ├── FormBEVersAutreBU.tsx
│   │   │   ├── FormReponseInformation.tsx
│   │   │   ├── FormReponseNegative.tsx
│   │   │   └── FormReponsePositive.tsx
│   │   ├── ui/                          # Composants UI génériques
│   │   │   ├── Button.tsx
│   │   │   ├── DirectorStatsCard.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── StatsCard.tsx
│   │   └── upload/
│   │       └── FileUploadZone.tsx
│   ├── context/                         # Context API
│   │   └── AuthContext.tsx              # Gestion de l'authentification globale
│   ├── pages/                           # Pages/Routes (conteneurs)
│   │   ├── Dashboard.tsx
│   │   ├── NewCourrierForm.tsx
│   │   ├── NewCourrierUpload.tsx
│   │   ├── department/
│   │   │   ├── AllCouriers.tsx
│   │   │   ├── CourrierDetail.tsx
│   │   │   ├── DepartmentDashboard.tsx
│   │   │   ├── ImputedCouriers.tsx      # Courriers imputés
│   │   │   └── SettledCouriers.tsx      # Courriers traités
│   │   ├── director/
│   │   │   ├── AllCouriers.tsx
│   │   │   ├── CourrierDetail.tsx
│   │   │   ├── DirectorDashboard.tsx
│   │   │   ├── ImputedCouriers.tsx
│   │   │   └── SettledCouriers.tsx
│   │   └── porteur/
│   │       ├── CourrierDetail.tsx
│   │       ├── CourrierDetailConsultatif.tsx
│   │       ├── CourriersArchives.tsx
│   │       ├── CourriersASolder.tsx
│   │       ├── CourriersSoldes.tsx
│   │       └── PorteurDashboard.tsx
│   ├── repositories/                    # Couche d'accès aux données
│   │   ├── base/
│   │   │   └── BaseRepository.ts       # Classe parent pour tous les repos
│   │   ├── courriers/
│   │   │   └── CourrierRepository.ts
│   │   ├── departments/
│   │   │   └── DepartmentRepository.ts
│   │   ├── interfaces/
│   │   │   └── IRepository.ts          # Interface générique
│   │   ├── notifications/
│   │   │   └── NotificationRepository.ts
│   │   ├── stats/
│   │   │   └── StatsRepository.ts
│   │   └── users/
│   │       └── UserRepository.ts
│   ├── services/                        # Couche métier
│   │   ├── api.ts                      # Service API global
│   │   ├── courriers.ts
│   │   ├── httpClient.ts               # Wrapper Axios
│   │   ├── index.ts                    # Exporte tous les services
│   │   ├── notifications.ts
│   │   ├── ServiceRegistry.ts          # Enregistrement des services
│   │   ├── stats.ts
│   │   ├── users.ts
│   │   ├── auth/
│   │   │   └── AuthService.ts          # Service d'authentification
│   │   ├── base/
│   │   │   └── BaseService.ts          # Classe parent pour services
│   │   ├── courriers/
│   │   │   └── CourrierService.ts
│   │   ├── departments/
│   │   │   └── DepartmentService.ts
│   │   ├── infrastructure/              # Services infrastructure
│   │   ├── notifications/
│   │   │   └── NotificationService.ts
│   │   ├── stats/
│   │   │   └── StatsService.ts
│   │   └── users/
│   │       └── UserService.ts
│   ├── types/                           # Définitions TypeScript
│   │   ├── api.ts                      # Types pour les entités
│   │   └── index.ts                    # Exporte tous les types
│   ├── App.tsx                          # Composant racine
│   ├── index.css                        # Styles globals
│   ├── main.tsx                         # Point d'entrée React
│   └── vite-env.d.ts                   # Types Vite
├── db.json                              # Base de données JSON Server
├── index.html                           # HTML template
├── package.json                         # Dépendances et scripts
├── tsconfig.json                        # Configuration TypeScript
├── tsconfig.app.json                    # Config TS pour l'app
├── tsconfig.node.json                   # Config TS pour les outils
├── vite.config.ts                       # Configuration Vite
├── .gitignore                           # Git ignore patterns
├── README.md                            # Guide principal (ce fichier)
├── QUICK_START.md                       # Démarrage rapide
├── CONTRIBUTING.md                      # Guide de contribution
├── SPECIFICATIONS.md                    # Spécifications techniques
└── FOLDER_STRUCTURE.md                  # Ce fichier

```

## 🎯 Principes organisationnels

### 1. Components vs Pages

**Components** (`src/components/`)
- Éléments réutilisables
- Pas d'accès direct aux routes
- Reçoivent les données via props ou context
- Exemples: `Button`, `Modal`, `Sidebar`

**Pages** (`src/pages/`)
- Conteneurs des routes
- Gèrent l'état et les appels API
- Composent les composants
- Exemples: `Dashboard`, `DepartmentDashboard`

```tsx
// ❌ Mauvais
function Dashboard() {
  return <UserList users={hardcodedUsers} />
}

// ✅ Correct
function Dashboard() {
  const { data } = useQuery(...)
  return <UserList users={data} />
}
```

### 2. Layout par rôle

Chaque rôle a sa propre structure de navigation :

```
Directeur    →  DirectorLayout  →  DirectorSidebar + Header
Département  →  DepartmentLayout →  DepartmentSidebar + Header
Porteur      →  PorteurLayout    →  PorteurSidebar + Header
Assistante   →  MainLayout       →  Sidebar + Header
```

### 3. Layered Architecture

```
Composant         ← Affichage et interactions utilisateur
   ↓
Service           ← Logique métier
   ↓
Repository        ← Accès aux données
   ↓
HTTP Client       ← Communication réseau
   ↓
API Backend       ← Base de données
```

**Flux d'une demande:**
```
Button click
  → useCallback(handleClick)
    → service.createCourrier(data)
      → repository.create(data)
        → httpClient.post('/courriers')
          → JSON Server
            → Sauvegarder dans db.json
```

## 📝 Patterns de fichiers

### Services

**Location**: `src/services/[domain]/[Entity]Service.ts`

```typescript
// Example: src/services/courriers/CourrierService.ts
import { BaseService } from '../base/BaseService'
import { Courrier } from '../../types'

class CourrierService extends BaseService<Courrier> {
  constructor() {
    super('courriers')
  }

  async getByDepartment(deptId: string): Promise<Courrier[]> {
    // Logique métier
  }
}

export const courrierService = new CourrierService()
```

### Repositories

**Location**: `src/repositories/[domain]/[Entity]Repository.ts`

```typescript
// Example: src/repositories/courriers/CourrierRepository.ts
import { BaseRepository } from '../base/BaseRepository'
import { Courrier } from '../../types'

class CourrierRepository extends BaseRepository<Courrier> {
  constructor() {
    super('courriers')
  }
}

export const courrierRepository = new CourrierRepository()
```

### Components réutilisables

**Location**: `src/components/ui/[Component].tsx`

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ label, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  )
}
```

### Pages (Conteneurs)

**Location**: `src/pages/[domain]/[Page].tsx`

```typescript
import { useEffect, useState } from 'react'
import { courrierService } from '../../services'
import { Courrier } from '../../types'

export function DepartmentDashboard() {
  const [courriers, setCourriers] = useState<Courrier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await courrierService.getByDepartment()
        setCourriers(data)
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingSpinner />
  return <DashboardView courriers={courriers} />
}
```

## 🔐 Organisation de la sécurité

### Routes publiques
```typescript
// Accessibles uniquement si NON authentifié
<PublicRoute>
  <Login />
  <ForgotPassword />
</PublicRoute>
```

### Routes protégées
```typescript
// Accessibles si authentifié ET bon rôle
<ProtectedRoute requiredRoles={['director', 'department']}>
  <Dashboard />
</ProtectedRoute>
```

## 📦 Gestion des dépendances

### Imports (Ordre recommandé)

```typescript
// 1. External libraries
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Types
import { User, Courrier } from '../../types'

// 3. Services
import { userService, courrierService } from '../../services'

// 4. Components
import { Button } from '../../components/ui'
import { UserCard } from '../../components'

// 5. Styles
import './MyComponent.css'
```

### Éviter les imports circulaires

```typescript
// ❌ Circulaire: A.ts → B.ts → A.ts
// A.ts
import { funcFromB } from './B'

// B.ts
import { funcFromA } from './A' // ERREUR!

// ✅ Solution: Créer un fichier C.ts pour les fonctions partagées
// C.ts
export function sharedFunc() { }

// A.ts & B.ts
import { sharedFunc } from './C'
```

## 🏷️ Naming Conventions

### Fichiers et dossiers

```
src/
├── components/          # dossier: lowercase
│   ├── MyComponent.tsx  # composant: PascalCase
│   └── myStyle.css      # style: camelCase
├── services/
│   └── myService.ts     # service: camelCase
├── types/
│   └── api.ts          # types: lowercase
└── pages/
    └── MyPage.tsx      # page: PascalCase
```

### Variables et fonctions

```typescript
// Variables: camelCase
const userData = { }
let isLoading = false

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3
const API_BASE_URL = 'http://localhost:3001'

// Fonctions: camelCase
function fetchUser() { }
const handleClick = () => { }

// Classes: PascalCase
class UserService { }
```

### Interfaces et Types

```typescript
// Interfaces: PascalCase, préfixe I
interface IUser { }
interface ICourrier { }

// Types: PascalCase
type UserRole = 'admin' | 'user'
type StatusCode = 200 | 201 | 404
```

## 🔄 Data Flow Patterns

### Pattern: Fetch in useEffect

```typescript
function MyComponent() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    myService.getAll()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  return <Content data={data} />
}
```

### Pattern: Update with callback

```typescript
function MyForm() {
  const [data, setData] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await myService.create(data)
      setData({ })  // Clear form
      showSuccess('Created successfully')
    } catch (error) {
      showError(error.message)
    }
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>
}
```

## 🎨 CSS Organization

```
src/
├── index.css              # Global styles
├── components/
│   ├── Button.tsx
│   └── Button.css         # Component-specific (optional)
└── pages/
    ├── Dashboard.tsx
    └── Dashboard.css      # Page-specific (optional)
```

### Tailwind Classes

Préférer Tailwind utility classes plutôt que du CSS personnalisé:

```tsx
// ✅ Préféré
<div className="flex items-center justify-between p-4 bg-gray-100">
  <span className="text-lg font-bold">Title</span>
</div>

// ❌ Éviter
<div style={{ display: 'flex', padding: '16px' }}>
  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Title</span>
</div>
```

## 📋 Checklist pour un nouveau composant

- [ ] Créer le fichier dans le bon dossier (`components/`, `pages/`, etc.)
- [ ] Écrire les interfaces TypeScript
- [ ] Implémenter la logique React (hooks)
- [ ] Ajouter PropTypes ou types TypeScript
- [ ] Ajouter des JSDoc comments
- [ ] Importer les dépendances manquantes
- [ ] Tester le composant
- [ ] Exporter dans `index.ts` si réutilisable

## 📚 Exemples complets

### Exemple 1: Nouveau service

**Fichier**: `src/services/notifications/NotificationService.ts`

```typescript
import { BaseService } from '../base/BaseService'
import { Notification } from '../../types'

class NotificationService extends BaseService<Notification> {
  constructor() {
    super('notifications')
  }

  async getUnreadCount(userId: string): Promise<number> {
    const notifications = await this.getAll()
    return notifications.filter(n => 
      n.userId === userId && !n.isRead
    ).length
  }

  async markAllAsRead(userId: string): Promise<void> {
    const notifications = await this.getAll()
    const userNotifications = notifications.filter(n => n.userId === userId)
    
    await Promise.all(
      userNotifications.map(n => 
        this.update(n.id, { ...n, isRead: true })
      )
    )
  }
}

export const notificationService = new NotificationService()
```

### Exemple 2: Nouveau composant

**Fichier**: `src/components/ui/NotificationBell.tsx`

```typescript
import { useEffect, useState } from 'react'
import { notificationService } from '../../services'

interface NotificationBellProps {
  userId: string
  onNotificationClick?: () => void
}

export function NotificationBell({ 
  userId, 
  onNotificationClick 
}: NotificationBellProps) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchCount = async () => {
      const count = await notificationService.getUnreadCount(userId)
      setUnreadCount(count)
    }
    fetchCount()
  }, [userId])

  const handleClick = () => {
    setIsOpen(!isOpen)
    onNotificationClick?.()
  }

  return (
    <div className="relative">
      <button onClick={handleClick} className="relative p-2">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && <NotificationPanel userId={userId} />}
    </div>
  )
}
```

---

**Document version**: 1.0
**Last updated**: Février 2026
**Status**: Approuvé
