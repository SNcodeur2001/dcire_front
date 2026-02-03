# 👋 Bienvenue dans Kombai

## 🎉 Vous êtes nouveau ? Commencez ici !

Bienvenue dans le projet **Kombai** - une application complète de gestion des courriers administratifs.

Ce fichier vous guide rapidement vers les ressources dont vous avez besoin.

---

## ⚡ Démarrage ultra-rapide (5 minutes)

```bash
# 1. Cloner le projet
git clone <repo-url>
cd kombai

# 2. Installer les dépendances
npm install

# 3. Lancer l'application (Terminal 1)
npm run dev

# 4. Lancer l'API (Terminal 2)
npm run server:dev

# 5. Ouvrir dans le navigateur
# http://localhost:5173
```

**Identifiants de test:**
```
Email:    director@sonatel.sn
Password: password123
```

✅ C'est tout ! L'application fonctionne sur http://localhost:5173

---

## 📚 Trouvez la documentation parfaite

### 🆕 Je suis nouveau développeur

**👉 Lire:** [README.md](README.md) → [QUICK_START.md](QUICK_START.md)

Cela couvre :
- Installation complète
- Compréhension du projet
- Premier lancement réussi
- Erreurs courantes

**Durée:** 30 minutes

---

### 👨‍💻 Je veux contribuer du code

**👉 Lire:** [CONTRIBUTING.md](CONTRIBUTING.md) → [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)

Cela couvre :
- Où ajouter le code
- Patterns et best practices
- Comment faire un PR
- Code review checklist

**Durée:** 45 minutes

---

### 🏗️ Je veux comprendre l'architecture

**👉 Lire:** [SPECIFICATIONS.md](SPECIFICATIONS.md)

Cela couvre :
- Architecture système
- Modèle de données
- Workflows métier
- Sécurité

**Durée:** 40 minutes

---

### 📡 Je veux utiliser l'API

**👉 Lire:** [API.md](API.md)

Cela couvre :
- Tous les endpoints
- Exemples cURL
- Gestion des erreurs
- Rate limiting

**Durée:** 30 minutes

---

### 🚀 Je veux déployer

**👉 Lire:** [DEPLOYMENT.md](DEPLOYMENT.md)

Cela couvre :
- Déploiement local
- Déploiement en production
- CI/CD setup
- Monitoring et logs

**Durée:** 1-2 heures

---

### 🗂️ Je veux explorer l'organisation

**👉 Lire:** [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)

Cela couvre :
- Arborescence complète
- Naming conventions
- Organisation du code
- Patterns de fichiers

**Durée:** 25 minutes

---

### 🗺️ Je veux un guide d'ensemble

**👉 Lire:** [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

Index complet de toute la documentation avec :
- Guide par objectif
- Recherche rapide
- Références croisées
- Parcours d'apprentissage

---

## 🎯 Parcours selon votre rôle

### 👤 Frontend Developer

```
1. QUICK_START.md       (15 min)
2. FOLDER_STRUCTURE.md  (20 min)
3. CONTRIBUTING.md      (25 min)
4. Créer votre premier composant
```

### 🔧 Backend Developer

```
1. QUICK_START.md       (15 min)
2. SPECIFICATIONS.md    (30 min)
3. API.md               (25 min)
4. Implémenter une API
```

### 🚀 DevOps/SRE

```
1. QUICK_START.md       (15 min)
2. DEPLOYMENT.md        (60 min)
3. SPECIFICATIONS.md    (30 min)
4. Déployer en prod
```

### 📊 Product/Manager

```
1. README.md            (15 min)
2. SPECIFICATIONS.md    (40 min)
3. DOCUMENTATION_INDEX  (20 min)
```

---

## 🚀 Test Accounts (Development)

Quatre comptes de test sont disponibles dans l'environnement de développement :

| Rôle | Email | Password |
|------|-------|----------|
| **Directeur** | director@sonatel.sn | password123 |
| **Département** | department@sonatel.sn | password123 |
| **Porteur** | porteur@sonatel.sn | password123 |
| **Assistante** | assistant@sonatel.sn | password123 |

Chaque compte a des permissions et un dashboard différents.

---

## 🎮 Features principales

✅ **Authentification multi-rôles**
- Connexion sécurisée avec JSON Server
- Gestion de session avec localStorage
- Tokens base64 (JWT en production)

✅ **Gestion des courriers**
- Créer, lire, mettre à jour, supprimer
- Workflow d'état (pending → settled)
- Assignation par département

✅ **Notifications**
- Notifications en temps réel
- Alertes pour courriers urgents
- Marquage comme lues

✅ **Statistiques & Rapports**
- Tableaux de bord personnalisés
- Métriques par rôle
- Graphiques et visualisations

✅ **Responsive Design**
- Interface mobile-friendly
- Tailwind CSS pour le styling
- Navigation adaptative

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State:** Context API
- **API:** JSON Server (dev), Express.js (prod)
- **Database:** JSON file (dev), PostgreSQL (prod)
- **Build:** Vite
- **Package Manager:** npm

---

## 📂 Structure rapide

```
kombai/
├── src/
│   ├── components/       # Composants réutilisables
│   ├── pages/           # Pages/routes
│   ├── services/        # Logique métier
│   ├── context/         # State global (Auth)
│   ├── types/           # Définitions TypeScript
│   └── App.tsx          # Composant racine
├── public/              # Assets statiques
├── db.json              # Base de données (dev)
├── package.json         # Dépendances
└── vite.config.ts       # Configuration Vite
```

Voir [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) pour l'arborescence complète.

---

## ❓ FAQ Rapide

### Comment démarrer ?
→ [QUICK_START.md](QUICK_START.md)

### Comment ajouter une feature ?
→ [CONTRIBUTING.md](CONTRIBUTING.md)

### Quels sont les endpoints API ?
→ [API.md](API.md)

### Comment déployer ?
→ [DEPLOYMENT.md](DEPLOYMENT.md)

### Comment fonctionne l'authentification ?
→ [SPECIFICATIONS.md#-sécurité](SPECIFICATIONS.md#-sécurité)

### J'ai une erreur, quoi faire ?
→ [QUICK_START.md#4-erreurs-courantes](QUICK_START.md#4-erreurs-courantes)

---

## 💬 Besoin d'aide ?

### 1. Vérifier la documentation
- [README.md](README.md) - Vue d'ensemble
- [QUICK_START.md](QUICK_START.md) - Installation
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Index complet

### 2. Chercher sur le web
- Vérifier Stack Overflow
- Consulter la doc de React, Vite, Tailwind
- Googler l'erreur

### 3. Contacter le team
- Créer une issue GitHub
- Demander sur le Slack/Discord
- Faire un PR avec question

---

## ✨ Prochaines étapes

Selon votre rôle, voici ce qu'il faut faire :

```
Développeur Frontend:
  1. npm install && npm run dev
  2. Lire FOLDER_STRUCTURE.md
  3. Ajouter un composant
  4. Faire un PR

Développeur Backend:
  1. npm install && npm run server:dev
  2. Lire API.md et SPECIFICATIONS.md
  3. Ajouter un endpoint
  4. Faire un PR

DevOps:
  1. Lire DEPLOYMENT.md
  2. Choisir une plateforme
  3. Configurer CI/CD
  4. Déployer

Manager:
  1. Lire README.md
  2. Lire SPECIFICATIONS.md
  3. Planifier les features
```

---

## 📈 Roadmap futur

- [ ] Migration JSON Server → PostgreSQL
- [ ] Authentification JWT + OAuth
- [ ] Tests automatisés (Jest, Playwright)
- [ ] API documentation auto (Swagger)
- [ ] Mobile app (React Native)
- [ ] Signature électronique
- [ ] Intégration email
- [ ] Analytics avancé

---

## 🎓 Ressources externes

### React & JavaScript
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router v6](https://reactrouter.com)

### Styling & Design
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Headless UI](https://headlessui.com)

### Backend & API
- [Express.js](https://expressjs.com)
- [REST API Best Practices](https://restfulapi.net)

### DevOps & Deployment
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com)
- [Kubernetes Docs](https://kubernetes.io/docs)

---

## 📞 Support

| Question | Ressource |
|----------|-----------|
| Qu'est-ce que Kombai ? | [README.md](README.md) |
| Comment installer ? | [QUICK_START.md](QUICK_START.md) |
| Où ajouter du code ? | [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) |
| Comment faire un PR ? | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Quels sont les endpoints ? | [API.md](API.md) |
| Comment déployer ? | [DEPLOYMENT.md](DEPLOYMENT.md) |
| Vue d'ensemble doc | [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) |

---

## 🎉 Bon codage !

Bienvenue dans l'équipe Kombai ! Si vous avez des questions, n'hésitez pas à consulter la documentation ou contacter le team.

**Happy coding! 🚀**

---

*Last updated: Février 2026*
*Questions? Check the docs or create an issue on GitHub*
