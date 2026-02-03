# 📖 Guide de développement

Ce guide détaille la structure interne du projet et comment contribuer.

## 📁 Structure des dossiers

### `src/components/`
Composants React réutilisables organisés par domaine.

#### `src/components/layout/`
- `MainLayout.tsx` - Layout principal pour assistante
- `DirectorLayout.tsx` - Layout pour directeur
- `DepartmentLayout.tsx` - Layout pour département
- `PorteurLayout.tsx` - Layout pour porteur
- `Header.tsx` - En-tête commun
- `Sidebar.tsx` - Barre latérale assistante
- `DirectorSidebar.tsx` - Barre latérale directeur
- Etc.

#### `src/components/ui/`
Composants UI basiques réutilisables.
- `Button.tsx` - Bouton
- `Modal.tsx` - Fenêtre modale
- `Pagination.tsx` - Pagination
- `StatsCard.tsx` - Carte statistiques
- Etc.

#### `src/components/dashboard/`
Composants spécifiques au dashboard.
- `DataTable.tsx` - Tableau de données

### `src/pages/`
Pages/Vues de l'application (une page = une route).

Structure :
```
pages/
├── Dashboard.tsx                    # Page assistante
├── NewCourrierForm.tsx             # Créer un courrier (formulaire)
├── NewCourrierUpload.tsx           # Créer un courrier (upload)
├── director/
│   ├── DirectorDashboard.tsx       # Dashboard directeur
│   ├── AllCouriers.tsx
│   ├── ImputedCouriers.tsx
│   ├── SettledCouriers.tsx
│   └── CourrierDetail.tsx
├── department/
│   ├── DepartmentDashboard.tsx
│   ├── AllCouriers.tsx
│   ├── ImputedCouriers.tsx
│   ├── SettledCouriers.tsx
│   └── CourrierDetail.tsx
└── porteur/
    ├── PorteurDashboard.tsx
    ├── CourriersASolder.tsx
    ├── CourriersSoldes.tsx
    ├── CourriersArchives.tsx
    ├── CourrierDetail.tsx
    └── CourrierDetailConsultatif.tsx
```

### `src/services/`
Logique métier et communication avec l'API.

#### `src/services/auth/`
- `AuthService.ts` - Service d'authentification

#### Services principaux
- `api.ts` - Configuration de base
- `httpClient.ts` - Client HTTP wrapper
- `users.ts` - Service utilisateurs
- `courriers.ts` - Service courriers
- `departments.ts` - Service départements
- `stats.ts` - Service statistiques
- `notifications.ts` - Service notifications
- `ServiceRegistry.ts` - Registry des services

### `src/repositories/`
Couche d'accès aux données (Data Access Layer).

```
repositories/
├── base/
│   └── BaseRepository.ts       # Classe de base
├── users/
│   └── UserRepository.ts
├── courriers/
│   └── CourrierRepository.ts
├── departments/
│   └── DepartmentRepository.ts
└── interfaces/
    └── IRepository.ts          # Interface
```

### `src/context/`
React Context pour l'état global.

- `AuthContext.tsx` - Contexte d'authentification

### `src/types/`
Définitions de types TypeScript.

- `api.ts` - Types API (User, Courrier, etc.)
- `index.ts` - Export centralisé

## 🎯 Flux de développement

### 1. Créer une nouvelle page

```tsx
// src/pages/MaPage.tsx
import { useState, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'

export default function MaPage() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Charger les données
    const loadData = async () => {
      try {
        // ...
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) return <div>Chargement...</div>

  return (
    <MainLayout>
      {/* Contenu */}
    </MainLayout>
  )
}
```

### 2. Ajouter la route

```tsx
// src/App.tsx
<Route 
  path="/ma-page" 
  element={
    <ProtectedRoute requiredRoles={['assistant']}>
      <MaPage />
    </ProtectedRoute>
  } 
/>
```

### 3. Créer un service (optionnel)

```typescript
// src/services/maService.ts
import { httpClient } from './httpClient'
import type { MaData } from '../types/api'

export class MaService {
  async getAll() {
    return httpClient.get<MaData[]>('/ma-endpoint')
  }

  async create(data: MaData) {
    return httpClient.post('/ma-endpoint', data)
  }
}

export const maService = new MaService()
```

### 4. Utiliser le service dans la page

```tsx
import { maService } from '../services/maService'

useEffect(() => {
  const load = async () => {
    const data = await maService.getAll()
    setData(data)
  }
  load()
}, [])
```

## 🔗 Communication API

### Ajouter un nouvel endpoint

**db.json :**
```json
{
  "mesData": [
    { "id": "1", "nom": "Item 1" }
  ]
}
```

**Service :**
```typescript
async getMesData() {
  return httpClient.get('/mesData')
}
```

**Composant :**
```tsx
const data = await mesService.getMesData()
```

## 🎨 Styles et Tailwind

### Classes Tailwind courantes

```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">

// Grille
<div className="grid grid-cols-3 gap-4">

// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Couleurs (variantes)
<div className="text-red-500 bg-blue-100">

// Padding/Margin
<div className="p-4 m-2 px-6 py-3">

// Border/Shadow
<div className="border border-gray-200 shadow-lg rounded-lg">
```

### Variables CSS personnalisées

```css
/* styles globaux */
--color-primary: #ea580c
--color-gray-50: #f9fafb
--color-gray-100: #f3f4f6
--color-gray-200: #e5e7eb
--color-gray-500: #6b7280
--color-gray-600: #4b5563
--color-gray-700: #374151
--color-gray-900: #111827
--color-success: #10b981
--color-warning: #f59e0b
--color-danger: #ef4444
```

Usage :
```tsx
<div style={{ color: 'var(--color-primary)' }}>
```

## 🧪 Tests

Actuellement, pas de suite de tests configurée. À ajouter :
- Jest
- React Testing Library
- E2E tests (Cypress)

## 🔒 Sécurité

### Bonnes pratiques

1. **Ne pas stocker les données sensibles en plaintext**
   ```tsx
   // ❌ MAUVAIS
   const password = localStorage.getItem('password')
   
   // ✅ BON
   const token = localStorage.getItem('authToken')
   ```

2. **Valider les données côté client et serveur**
   ```tsx
   if (!email.includes('@')) {
     setError('Email invalide')
     return
   }
   ```

3. **Utiliser HTTPS en production**
   - Vérifier `VITE_API_URL` en production

4. **Nettoyer les données sensibles au logout**
   ```tsx
   logout() {
     localStorage.removeItem('authToken')
     localStorage.removeItem('currentUser')
   }
   ```

## 🚀 Performance

### Optimisations

1. **Lazy loading des routes**
   ```tsx
   const MaPage = lazy(() => import('./MaPage'))
   
   <Suspense fallback={<div>Chargement...</div>}>
     <MaPage />
   </Suspense>
   ```

2. **Memoization**
   ```tsx
   const MyComponent = memo(function MyComponent({ data }) {
     return <div>{data}</div>
   })
   ```

3. **useCallback pour les fonctions**
   ```tsx
   const handleClick = useCallback(() => {
     // ...
   }, [dependencies])
   ```

4. **Listes virtualisées pour grandes données**
   - À implémenter avec react-virtual ou react-window

## 📋 Checklist avant commit

- [ ] Code formé (ESLint ok)
- [ ] Types vérifiés (TypeScript ok)
- [ ] Tests passants (le cas échéant)
- [ ] Pas de console.log en production
- [ ] Pas de credentials en hardcoder
- [ ] Messages de commit clairs
- [ ] Branche à jour avec main

## 🔄 Workflow Git

```bash
# Créer une branche
git checkout -b feature/ma-feature

# Ajouter et committer
git add .
git commit -m "feat: description de la feature"

# Pusher
git push origin feature/ma-feature

# Pull Request sur main
```

### Convention de commits

```
feat:   Nouvelle feature
fix:    Correction de bug
docs:   Documentation
style:  Formatage de code
refactor: Refactorisation
test:   Tests
chore:  Tâches de maintenance
```

Exemple :
```bash
git commit -m "feat: ajouter la page de profil utilisateur"
git commit -m "fix: corriger le bug de déconnexion"
git commit -m "docs: mettre à jour le README"
```

## 📝 Commentaires et documentation du code

```typescript
/**
 * Récupère tous les courriers d'un utilisateur
 * @param userId - L'ID de l'utilisateur
 * @param filters - Filtres optionnels (status, type, etc.)
 * @returns Liste des courriers ou erreur
 */
async getUserCourriers(
  userId: string,
  filters?: CourriersFilters
): Promise<ApiResponse<Courrier[]>> {
  // ...
}
```

## 🐛 Debugging

### DevTools du navigateur

1. **React DevTools** - Inspecter les props et states
2. **Network tab** - Voir les appels API
3. **Console** - Erreurs et logs
4. **Redux DevTools** - Si implémenté

### Logging

```typescript
// Développement
console.log('DEBUG:', data)

// À retirer avant production
if (process.env.NODE_ENV === 'development') {
  console.log('Data:', data)
}
```

## 📦 Dépendances principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "tailwindcss": "^3.x",
  "typescript": "^5.x"
}
```

## 🚢 Déploiement local

```bash
# Build
npm run build

# Servir localement
npm run preview

# Accès
http://localhost:4173
```

## 📞 Support et questions

Pour les questions sur l'architecture ou l'implémentation :
1. Consulter ce guide
2. Vérifier les fichiers existants (DRY principle)
3. Chercher un pattern similaire dans le codebase

---

**Dernière mise à jour** : Février 2026
