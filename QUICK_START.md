# ⚡ Quick Start & References

Guide rapide pour bien démarrer avec le projet.

## 🎯 5 minutes pour démarrer

```bash
# 1. Cloner et installer
git clone <url>
cd kombai
npm install

# 2. Démarrer le serveur
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:5173

# 4. Se connecter
Email: director@sonatel.sn
Password: password123
```

## 🔑 Utilisateurs de test

```
Directeur:   director@sonatel.sn / password123
Département: department@sonatel.sn / password123
Porteur:     porteur@sonatel.sn / password123
Assistante:  assistant@sonatel.sn / password123
```

## 📦 Scripts npm

```bash
npm run dev              # Démarrer dev
npm run build            # Build production
npm run preview          # Prévisualiser build
npm run type-check       # Vérifier types TypeScript
npm run lint             # Linter le code
```

## 🗂️ Créer une nouvelle feature

### 1. Créer la page
```bash
src/pages/MaFeature.tsx
```

### 2. Ajouter la route
```tsx
// src/App.tsx
<Route path="/ma-feature" element={
  <ProtectedRoute requiredRoles={['director']}>
    <MaFeature />
  </ProtectedRoute>
} />
```

### 3. Ajouter au menu
```tsx
// src/components/layout/DirectorSidebar.tsx
const navItems = [
  { to: '/directeur/ma-feature', icon: '/icons/icon.svg', label: 'Ma Feature' }
]
```

## 🎨 Snippets utiles

### Page simple avec données
```tsx
import { useState, useEffect } from 'react'
import DirectorLayout from '../components/layout/DirectorLayout'
import { courrierService } from '../services'

export default function MaPage() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await courrierService.getAll()
        setData(response?.data || [])
      } catch (err) {
        setError('Erreur de chargement')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <DirectorLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Ma Page</h1>
        {/* Contenu */}
      </div>
    </DirectorLayout>
  )
}
```

### Utiliser l'authentification
```tsx
import { useAuth } from '../context/AuthContext'

export default function MyComponent() {
  const { user, logout } = useAuth()

  return (
    <div>
      <p>Connecté en tant que: {user?.name}</p>
      <button onClick={() => {
        logout()
        navigate('/login')
      }}>
        Déconnexion
      </button>
    </div>
  )
}
```

### Appel API simple
```tsx
const handleCreate = async () => {
  try {
    const result = await courrierService.create({
      subject: 'Mon courrier',
      // ... autres champs
    })
    if (result?.data) {
      console.log('Créé:', result.data)
      // Mettre à jour la liste, etc.
    }
  } catch (err) {
    console.error('Erreur:', err)
  }
}
```

## 🐛 Erreurs courantes

### Erreur: "useAuth must be used within an AuthProvider"
**Cause**: Composant utilisé en dehors du contexte AuthProvider
**Solution**: Vérifier que le composant est enveloppé par AuthProvider dans App.tsx

### Erreur: "Cannot read property 'map' of undefined"
**Cause**: Données non chargées ou structure incorrecte
**Solution**: Ajouter des vérifications nullish
```tsx
{data?.map(item => <div key={item.id}>{item.name}</div>)}
```

### Erreur: "Two children with the same key"
**Cause**: Clés non uniques dans les listes
**Solution**: Utiliser l'ID unique au lieu de l'index
```tsx
// ✅ Bon
<div key={item.id}>

// ❌ Mauvais
<div key={index}>
```

### Erreur TypeScript: "Type 'null' is not assignable..."
**Cause**: Type strictement défini mais valeur null possible
**Solution**: Utiliser optional chaining ou assert
```tsx
// ✅
assignedDepartmentId: departmentId || undefined

// ✅
const value = data as string | undefined
```

## 📡 API endpoints

```bash
# Utilisateurs
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id

# Courriers
GET    /courriers
GET    /courriers/:id
POST   /courriers
PUT    /courriers/:id
DELETE /courriers/:id

# Filtres
/courriers?status=pending
/courriers?assignedDepartmentId=2
```

## 🎓 Ressources d'apprentissage

### React
- [React Hooks](https://react.dev/reference/react/hooks)
- [Context API](https://react.dev/reference/react/useContext)
- [React Router](https://reactrouter.com)

### TypeScript
- [Types de base](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

### Tailwind
- [Utility classes](https://tailwindcss.com/docs/utility-first)
- [Responsive design](https://tailwindcss.com/docs/responsive-design)

## 📋 Checklist de déploiement

- [ ] Variables d'environnement configurées
- [ ] Pas de console.log en production
- [ ] Tests passants
- [ ] Pas de secrets hardcodés
- [ ] Build sans erreurs
- [ ] HTTPS activé
- [ ] CORS configuré
- [ ] API en production en place

## 🆘 Avant de demander de l'aide

1. **Vérifier les logs**: Console (F12) et terminal
2. **Vérifier la BD**: db.json contient les bonnes données
3. **Vérifier l'API**: Serveur tourne sur le bon port
4. **Vérifier les types**: TypeScript compile sans erreur
5. **Vérifier le cache**: Clear localStorage si nécessaire

## 🔗 Commandes utiles

```bash
# Effacer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install

# Effacer le cache du navigateur
# Ctrl+Shift+Delete (ou Cmd+Shift+Delete sur Mac)

# Redémarrer le serveur
npm run dev

# Vérifier les types
npm run type-check

# Voir les dépendances outdated
npm outdated

# Mettre à jour les dépendances
npm update
npm upgrade (avec npm-check-updates)
```

## 📞 Aide rapide

| Problème | Commande |
|----------|----------|
| Dépendances cassées | `rm -rf node_modules && npm install` |
| Port occupé | `lsof -i :5173` ou `netstat -ano \| findstr :5173` |
| Erreurs TypeScript | `npm run type-check` |
| Code mal formaté | Utiliser ESLint intégré VS Code |
| Voir les stats build | `npm run build -- --stats` |

## 🎯 Prochaines étapes après installation

1. ✅ Tester le login avec un compte
2. ✅ Parcourir les différents dashboards
3. ✅ Créer/modifier un courrier
4. ✅ Tester la déconnexion
5. ✅ Consulter le code de référence

---

**Besoin d'aide?** Consulter `README.md` ou `CONTRIBUTING.md`
