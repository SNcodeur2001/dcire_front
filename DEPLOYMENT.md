# 🚀 Guide de déploiement

Guide complet pour déployer l'application en développement, test et production.

## 📋 Table des matières

1. [Déploiement local](#déploiement-local)
2. [Déploiement test](#déploiement-test)
3. [Déploiement production](#déploiement-production)
4. [CI/CD](#cicd)
5. [Monitoring & Logs](#monitoring--logs)
6. [Troubleshooting](#troubleshooting)

---

## 🏠 Déploiement local

### Prérequis

- **Node.js** >= 16.x (vérifier: `node --version`)
- **npm** >= 8.x (vérifier: `npm --version`)
- **Git** (pour versionner le code)
- **VS Code** (optionnel, mais recommandé)

### Installation

```bash
# 1. Cloner le repository
git clone https://github.com/votre-org/kombai.git
cd kombai

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env (optionnel pour le dev)
echo "VITE_API_URL=http://localhost:3001" > .env.local
```

### Démarrer l'application

```bash
# Terminal 1: Démarrer Vite dev server
npm run dev

# Terminal 2: Démarrer JSON Server
npm run server:dev

# L'app est accessible sur http://localhost:5173
# L'API est sur http://localhost:3001
```

### Accès

| Service | URL | Credentials |
|---------|-----|-------------|
| **App** | http://localhost:5173 | Voir test accounts |
| **API** | http://localhost:3001 | N/A (mock) |
| **API Admin** | http://localhost:3001/admin | Accès DB browser |

### Test Accounts (Development)

```
Email: director@sonatel.sn
Password: password123
Role: Directeur

---

Email: department@sonatel.sn
Password: password123
Role: Département

---

Email: porteur@sonatel.sn
Password: password123
Role: Porteur

---

Email: assistant@sonatel.sn
Password: password123
Role: Assistante
```

---

## 🧪 Déploiement test

### Environnement préparation

```bash
# 1. Créer une branche test
git checkout -b test/release-1.0

# 2. Installer les dépendances avec versions exactes
npm ci

# 3. Lancer les tests (si existants)
npm run test

# 4. Lancer les checks de linting
npm run lint

# 5. Build pour la production
npm run build

# 6. Vérifier le build
npm run preview
```

### Configuration ENV test

**Fichier**: `.env.test`

```bash
VITE_API_URL=https://api-test.example.com
VITE_LOG_LEVEL=debug
VITE_ENVIRONMENT=test
NODE_ENV=production
```

### Exécution

```bash
# Avec env variables
VITE_API_URL=https://api-test.example.com npm run build
npm run preview
```

### Validation test

**Checklist à vérifier:**

- [ ] Tous les tests passent: `npm run test`
- [ ] Aucun avertissement TypeScript: `npm run type-check`
- [ ] Linting OK: `npm run lint`
- [ ] Build sans erreur: `npm run build`
- ] Application démarre: `npm run preview`
- [ ] Authentification fonctionne
- [ ] Toutes les pages se chargent
- [ ] Les formulaires soumettent les données
- [ ] Les notifications s'affichent
- [ ] Performance acceptable

---

## 🌐 Déploiement production

### Architecture recommandée

```
┌─────────────────┐
│   CDN (Vercel)  │  <- Frontend static (dist/)
│    + HTTPS      │
└────────┬────────┘
         │
┌────────▼────────┐
│  Load Balancer  │  <- NGINX/Cloudflare
│   (Optional)    │
└────────┬────────┘
         │
┌────────▼────────────────────────┐
│  Backend API (Express/Python)    │  <- REST API
│  avec PostgreSQL/MySQL           │
└─────────────────────────────────┘
```

### Étape 1: Préparation de la build

```bash
# Créer une branche release
git checkout -b release/1.0

# Mettre à jour la version
npm version minor

# Commit et tag
git commit -am "Release v1.0"
git tag v1.0

# Push au repository
git push origin release/1.0 --tags
```

### Étape 2: Build optimisée

```bash
# Build production
npm run build

# Vérifier la taille du bundle
npm run build:analyze

# Le dossier dist/ contient les fichiers statiques
ls -lh dist/
```

### Étape 3: Options de déploiement

#### Option A: Vercel (Recommandé)

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Connecter au projet
vercel link

# 3. Configurer les environment variables
vercel env add VITE_API_URL https://api.example.com

# 4. Déployer
vercel --prod
```

**Avantages:**
- Deployment automatique avec Git
- CDN global inclus
- HTTPS automatique
- Preview URLs
- Serverless functions disponibles

#### Option B: Netlify

```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Connecter au projet
netlify link

# 3. Configurer les variables
netlify env:set VITE_API_URL "https://api.example.com"

# 4. Déployer
netlify deploy --prod
```

**Avantages:**
- GitOps simple
- Environment variables faciles
- Rewrite rules pour SPA routing
- Lambda functions
- Built-in analytics

#### Option C: Docker + VM (Plus de contrôle)

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8080", "-g"]
```

**Build et push:**

```bash
# Build image
docker build -t kombai:latest .

# Tag pour registry
docker tag kombai:latest myregistry.azurecr.io/kombai:latest

# Push au registry
docker push myregistry.azurecr.io/kombai:latest

# Déployer sur Kubernetes ou Docker Swarm
kubectl apply -f deployment.yaml
```

### Étape 4: Configuration backend

**Remplacer JSON Server par une vraie API:**

```javascript
// Express.js example
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./db')

const app = express()

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())

// Routes
app.get('/api/users', (req, res) => {
  res.json(db.users)
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = db.users.find(u => u.email === email)
  
  if (!user || !user.password === password) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Générer JWT
  const token = generateJWT(user)
  res.json({ token, user })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running')
})
```

### Étape 5: Sécurité en production

#### Configuration HTTPS

```nginx
# nginx.conf
server {
  listen 443 ssl;
  server_name api.example.com;
  
  ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;
  
  location / {
    proxy_pass http://backend:3000;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

#### Variables d'environnement sensibles

**Production (.env.production):**

```bash
# ⚠️ Ne JAMAIS commiter !
VITE_API_URL=https://api.example.com
VITE_LOG_LEVEL=error
VITE_ENVIRONMENT=production
DATABASE_URL=postgresql://user:pass@db-host:5432/kombai
JWT_SECRET=super-secret-key-change-this
SMTP_PASSWORD=your-email-password
```

**Gestion des secrets Vercel:**

```bash
vercel env add DATABASE_URL "postgresql://..."
vercel env add JWT_SECRET "your-secret-key"
vercel env add SMTP_PASSWORD "your-password"
```

#### Rate limiting & DDoS

```javascript
// Express rate limiter
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

#### CORS Configuration

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

---

## 🔄 CI/CD

### GitHub Actions

**Fichier**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: dist
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
```

### GitLab CI

**Fichier**: `.gitlab-ci.yml`

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run test
    - npm run lint

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy_prod:
  stage: deploy
  image: node:18
  script:
    - npm install -g vercel
    - vercel --prod
  only:
    - main
```

---

## 📊 Monitoring & Logs

### Sentry (Error Tracking)

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENVIRONMENT,
  tracesSampleRate: 1.0,
})
```

### Google Analytics

```typescript
// src/main.tsx
import { GoogleAnalytics } from 'web-vitals'

GoogleAnalytics.initialize(import.meta.env.VITE_GA_ID)
```

### Logs application

```typescript
// services/logger.ts
const logger = {
  info: (msg: string, data?: any) => {
    console.log(`[INFO] ${msg}`, data)
  },
  error: (msg: string, error?: Error) => {
    console.error(`[ERROR] ${msg}`, error)
    Sentry.captureException(error)
  },
  warn: (msg: string, data?: any) => {
    console.warn(`[WARN] ${msg}`, data)
  },
}

export default logger
```

---

## 🔧 Troubleshooting

### Build fails

```bash
# Nettoyer le cache
rm -rf node_modules dist .next
npm cache clean --force

# Réinstaller les dépendances
npm install

# Relancer la build
npm run build
```

### API not responding

```bash
# Vérifier que l'API est accessible
curl -X GET http://localhost:3001/users

# Vérifier les logs
docker logs kombai-api

# Vérifier la connectivité réseau
ping api.example.com
```

### Performance issues

```bash
# Analyser la taille du bundle
npm run build:analyze

# Vérifier les performances
npm run lighthouse

# Optimiser les images
npm install -D sharp
npx sharp optimize public/**/*.{jpg,png}
```

### CORS errors

```bash
# Ajouter les headers CORS au backend
Access-Control-Allow-Origin: https://frontend.example.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
```

---

## 📈 Rollback & Rollforward

### Rollback (Vercel)

```bash
# Lister les deployments
vercel ls

# Promouvoir une version précédente
vercel rollback <deployment-url>
```

### Rollback (Kubernetes)

```bash
# Afficher l'historique
kubectl rollout history deployment/kombai

# Rollback à la version précédente
kubectl rollout undo deployment/kombai

# Rollback à une version spécifique
kubectl rollout undo deployment/kombai --to-revision=2
```

---

## 📝 Checklist pre-deployment

- [ ] Tous les tests passent
- [ ] Aucune erreur TypeScript
- [ ] Code reviewed
- [ ] Secrets configurés correctement
- [ ] HTTPS activé
- [ ] Monitoring en place
- [ ] Backups en place
- [ ] Documentation à jour
- [ ] Runbook préparé
- [ ] Team notifiée

---

## 📞 Support & Contact

Pour les problèmes de déploiement:

1. **Vercel Docs**: https://vercel.com/docs
2. **Netlify Docs**: https://docs.netlify.com/
3. **Docker Docs**: https://docs.docker.com/
4. **Kubernetes Docs**: https://kubernetes.io/docs/

**Document version**: 1.0
**Last updated**: Février 2026
**Status**: Approuvé
