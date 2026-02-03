# Guide rapide d'utilisation du système d'authentification

## 🎯 Pour tester l'application

1. **Démarrer le JSON server** (s'il n'est pas déjà en cours)
   ```bash
   npm run dev  # ou votre commande habituelle
   ```

2. **Accédez à la page de login**
   - URL: `http://localhost:5173/login` (ou votre port configuré)

3. **Saisissez les credentials**
   - Email: `director@sonatel.sn` (ou l'un des autres comptes)
   - Mot de passe: `password123`

4. **Vous serez redirigé automatiquement** vers le tableau de bord approprié

## 🔄 Pour utiliser l'authentification dans votre code

### Accéder à l'utilisateur connecté
```tsx
import { useAuth } from '../context/AuthContext'

function MyComponent() {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <p>Vous n'êtes pas connecté</p>
  }
  
  return <p>Bienvenue {user?.name}</p>
}
```

### Vérifier si l'utilisateur a un rôle spécifique
```tsx
const { user } = useAuth()

if (user?.role === 'director') {
  // Afficher les options réservées aux directeurs
}
```

### Implémenter une déconnexion
```tsx
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return <button onClick={handleLogout}>Déconnexion</button>
}
```

### Ajouter une nouvelle route protégée
```tsx
<Route 
  path="/ma-page" 
  element={
    <ProtectedRoute requiredRoles={['director', 'department']}>
      <MaPage />
    </ProtectedRoute>
  } 
/>
```

## 🔑 Modifier les credentials

Éditer `db.json` :
```json
{
  "users": [
    {
      "id": "1",
      "email": "mon-email@sonatel.sn",
      "password": "mon-mot-de-passe",
      "name": "Mon Nom",
      "role": "director",
      ...
    }
  ]
}
```

## ⚠️ Notes importantes

- Les credentials sont stockés en **texte brut** dans db.json (OK pour dev/test)
- En production, utiliser JWT + hachage des mots de passe
- La session est persistante dans le localStorage
- Le logout supprime le token et l'utilisateur du localStorage
- Les routes publiques restent accessibles sans connexion (/login, /)

## 🐛 Dépannage

### Je suis redirigé vers /login
- Vous n'êtes pas authentifié ou votre rôle ne correspond pas à la route
- Vérifiez les credentials dans db.json

### Le login ne fonctionne pas
- Vérifiez que le JSON server est en cours d'exécution
- Vérifiez l'email et le mot de passe dans db.json
- Vérifiez la console du navigateur pour les erreurs

### Mon utilisateur s'est déconnecté après un refresh
- C'est normal, le localStorage ne sauvegarde pas en production
- L'authentification persiste dans la même session
