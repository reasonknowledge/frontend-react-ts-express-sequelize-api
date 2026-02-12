# React + TypeScript + Vite + shadcn/ui - Gestion Étudiante

Application frontend moderne pour la gestion d'étudiants et d'administrateurs. Interface utilisateur élégante construite avec React 19, TypeScript, Tailwind CSS et shadcn/ui.

---

## Fonctionnalités

- **Authentification sécurisée** : Connexion via JWT avec cookies HttpOnly
- **Gestion des administrateurs** : Création, modification, suppression d'admins
- **Gestion des étudiants** : CRUD complet des étudiants
- **Interface moderne** : Composants shadcn/ui avec Tailwind CSS v4
- **Routing** : Navigation fluide avec React Router v7
- **Notifications** : Toasts interactifs avec Sonner
- **Gestion d'état** : Zustand pour la state management
- **Validation** : Zod pour la validation des formulaires

---

## Prérequis

- **Node.js** (v18+) : [https://nodejs.org](https://nodejs.org)
- **npm** ou **yarn**
- **Git** : [https://git-scm.com](https://git-scm.com)
- **API Backend** : L'API Express doit être démarrée sur `http://localhost:3000`

---

## Installation

### 1. Cloner le projet

```bash
cd react-ts-shadcn
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3000
```

**Note** : Cette URL doit correspondre à l'URL de l'API Express backend.

---

## Démarrage

### Mode développement

```bash
npm run dev
```

L'application démarre sur `http://localhost:5173` (port par défaut Vite)

### Build production

```bash
npm run build
```

### Preview production

```bash
npm run preview
```

---

## Structure du projet

```
src/
├── App.tsx                 # Point d'entrée avec routing
├── main.tsx               # Rendu React
├── components/
│   ├── customs/           # Composants personnalisés
│   │   └── Navigation.tsx # Barre de navigation
│   └── ui/                # Composants shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── navigation-menu.tsx
│       ├── sonner.tsx
│       └── table.tsx
├── pages/                 # Pages de l'application
│   ├── Admins.tsx        # Gestion des admins
│   ├── Home.tsx          # Page d'accueil
│   ├── Signin.tsx        # Connexion
│   ├── Signup.tsx        # Inscription admin
│   ├── SignupStudent.tsx # Inscription étudiant
│   └── Students.tsx      # Gestion des étudiants
├── data/                  # Données statiques
├── lib/                   # Utilitaires
│   └── utils.ts          # Fonctions utilitaires (cn)
├── store/                 # Zustand stores
└── schemas/               # Schémas Zod (futur)
```

---

## Routes de l'application

| Route        | Description                | Accès                     |
| ------------ | -------------------------- | ------------------------- |
| `/`          | Redirection vers `/signin` | Public                    |
| `/signin`    | Page de connexion          | Public                    |
| `/signup`    | Créer un admin             | Public (si premier admin) |
| `/student`   | Inscription étudiant       | Public                    |
| `/home`      | Page d'accueil             | Authentifié               |
| `/admins`    | Liste des admins           | Authentifié               |
| `/etudiants` | Liste des étudiants        | Authentifié               |

---

## Connexion avec l'API Backend

Cette application frontend communique avec l'API Express via des requêtes HTTP avec authentification JWT par cookies.

### Configuration CORS

L'API Express doit autoriser l'origine `http://localhost:5173` :

```env
# .env du backend
FRONTEND_URL=http://localhost:5173
```

### Exemple de requête API

```typescript
// Connexion
const res = await fetch('http://localhost:3000/api/admins/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important pour les cookies
  body: JSON.stringify({ email, pass }),
})
```

---

## Technologies utilisées

| Technologie  | Version  | Usage                  |
| ------------ | -------- | ---------------------- |
| React        | ^19.2.0  | Framework UI           |
| TypeScript   | ~5.9.3   | Typage statique        |
| Vite         | ^7.2.4   | Build tool             |
| React Router | ^7.9.6   | Routing                |
| Tailwind CSS | ^4.1.17  | Styling                |
| shadcn/ui    | latest   | Composants UI          |
| Radix UI     | ^1.x     | Primitives accessibles |
| Zustand      | ^5.0.8   | State management       |
| Zod          | ^4.1.12  | Validation             |
| Sonner       | ^2.0.7   | Notifications          |
| Lucide React | ^0.554.0 | Icônes                 |

---

## Composants shadcn/ui inclus

- **Button** : Boutons interactifs avec variants
- **Card** : Conteneurs de contenu
- **Dialog** : Modales et popups
- **Dropdown Menu** : Menus déroulants
- **Input** : Champs de saisie
- **Navigation Menu** : Navigation responsive
- **Sonner** : Système de notifications
- **Table** : Tableaux de données

---

## Instructions de test

### Test 1 : Lancer l'application

```bash
npm run dev
```

**Résultat attendu** : L'application démarre sur `http://localhost:5173`

### Test 2 : Connexion à l'API

1. Assurez-vous que l'API Express est démarrée sur `http://localhost:3000`
2. Accédez à `http://localhost:5173/signin`
3. Entrez les identifiants d'un admin existant
4. Cliquez sur "Connexion"

**Résultat attendu** : Redirection vers `/home` avec notification de succès

### Test 3 : Navigation

1. Connectez-vous
2. Utilisez la barre de navigation pour accéder à :
   - **Accueil** (`/home`)
   - **Admins** (`/admins`)
   - **Étudiants** (`/etudiants`)

### Test 4 : Créer un étudiant

1. Allez sur `/etudiants`
2. Cliquez sur "Ajouter un étudiant"
3. Remplissez le formulaire
4. Validez

**Résultat attendu** : L'étudiant apparaît dans la liste avec notification

### Test 5 : Gestion des admins

1. Allez sur `/admins`
2. Testez la création, modification et suppression d'admins

---

## Dépendances importantes

### Production

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.9.6",
  "tailwindcss": "^4.1.17",
  "zustand": "^5.0.8",
  "zod": "^4.1.12",
  "sonner": "^2.0.7",
  "lucide-react": "^0.554.0"
}
```

### Développement

```json
{
  "vite": "^7.2.4",
  "typescript": "~5.9.3",
  "eslint": "^9.39.1",
  "@vitejs/plugin-react-swc": "^4.2.2"
}
```

---

## Personnalisation

### Thème

Le thème est configuré dans `index.css` avec Tailwind CSS v4 :

```css
@theme inline {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  /* ... */
}
```

### Ajouter un composant shadcn/ui

```bash
npx shadcn add [nom-du-composant]
```

Exemple :

```bash
npx shadcn add select
npx shadcn add textarea
```

---

## Dépannage

### Problème : "Cannot connect to backend"

**Solution** :

- Vérifiez que l'API Express est démarrée
- Vérifiez l'URL dans `.env` : `VITE_API_URL=http://localhost:3000`
- Vérifiez la configuration CORS côté backend

### Problème : "Module not found"

**Solution** :

```bash
rm -rf node_modules
npm install
```

### Problème : "Port 5173 is already in use"

**Solution** :

```bash
# Lancer sur un autre port
npm run dev -- --port 3002
```

### Problème : "Credentials not included"

**Solution** : Vérifiez que `credentials: 'include'` est présent dans les fetch :

```typescript
fetch(url, {
  credentials: 'include', // ← Important pour les cookies
  // ...
})
```

---

## Architecture

### Flux de données

```
Utilisateur → Composant React → Fetch API → Express Backend
                    ↓
              Zustand Store (état global)
                    ↓
              Sonner (notifications)
```

### Authentification

1. **Login** : L'utilisateur soumet email/pass
2. **Cookie** : Le backend définit un cookie JWT HttpOnly
3. **Requêtes** : Le navigateur envoie automatiquement le cookie
4. **Logout** : Le cookie est supprimé côté client

---

## Build et Déploiement

### Build statique

```bash
npm run build
```

Les fichiers sont générés dans `dist/`.

### Déploiement

1. **Vercel** (recommandé pour React) :

   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify** :
   - Connectez votre repo GitHub
   - Build command : `npm run build`
   - Publish directory : `dist`

3. **Serveur statique** :
   ```bash
   npm run build
   npx serve dist
   ```

---

## Ressources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)

---

## Licence

MIT

---

## Auteur
Reason knowledge(Franck Hervé)
Application développée avec React 19, TypeScript et shadcn/ui.
