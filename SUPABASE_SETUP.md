# Configuration Supabase pour Faith Chronicles

## Étape 1: Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre **URL du projet** et **clé API publique (anon key)**

## Étape 2: Configurer la base de données

1. Allez dans **SQL Editor** dans votre dashboard Supabase
2. Copiez tout le contenu du fichier `supabase-schema.sql`
3. Collez-le dans l'éditeur SQL
4. Cliquez sur **Run** pour créer toutes les tables et sécurités

### Ce que le schéma crée:

- **Table `profiles`**: Profils utilisateurs
- **Table `game_progress`**: Progression (scores, points de sagesse/révélation, niveaux débloqués)
- **Table `level_stars`**: Étoiles obtenues par niveau
- **Row Level Security (RLS)**: Chaque utilisateur ne peut accéder qu'à ses propres données
- **Triggers automatiques**: Création auto du profil lors de l'inscription

## Étape 3: Configurer l'authentification

1. Allez dans **Authentication** > **Providers**
2. Activez **Email** (pour magic link sans mot de passe)
3. Activez **Anonymous** (pour jouer sans compte)
4. Dans **Email Templates**, personnalisez le message du magic link si vous voulez

## Étape 4: Configurer les variables d'environnement

1. Copiez le fichier `.env.example` en `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Remplissez avec vos vraies clés (trouvées dans Settings > API):
   ```
   REACT_APP_SUPABASE_URL=https://votre-projet.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=votre_cle_publique_ici
   ```

3. **IMPORTANT**: Ne commitez JAMAIS le fichier `.env.local` (il est dans .gitignore)

## Étape 5: Tester

Redémarrez votre serveur de développement:
```bash
npm start
```

## Sécurité maximale ✅

- **Row Level Security (RLS)** activé sur toutes les tables
- Chaque utilisateur ne voit QUE ses propres données
- Impossible d'accéder aux données des autres joueurs
- Authentification sécurisée (magic link ou anonyme)
- Pas de mots de passe stockés (utilise magic link)

## Mode hors ligne

Le jeu fonctionne aussi SANS Supabase:
- Utilise localStorage en fallback
- Pas d'erreur si Supabase n'est pas configuré
- Transition automatique quand vous configurez Supabase

## Structure des données

### game_progress
```json
{
  "user_id": "uuid",
  "score": 1500,
  "wisdom_points": 45,
  "revelation_points": 12,
  "unlocked_levels": [1, 2, 3, 4]
}
```

### level_stars
```json
{
  "user_id": "uuid",
  "level_number": 1,
  "stars": 3
}
```

## Commandes utiles

Voir tous les utilisateurs (dans SQL Editor):
```sql
SELECT * FROM auth.users;
```

Voir toutes les progressions:
```sql
SELECT * FROM game_progress;
```

Voir toutes les étoiles:
```sql
SELECT * FROM level_stars ORDER BY level_number;
```

Réinitialiser la progression d'un utilisateur (remplacez l'UUID):
```sql
DELETE FROM game_progress WHERE user_id = 'uuid-de-utilisateur';
DELETE FROM level_stars WHERE user_id = 'uuid-de-utilisateur';
```
