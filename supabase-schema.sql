-- ============================================
-- FAITH CHRONICLES - Schéma de base de données Supabase
-- ============================================
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================

-- 1. Créer la table des profils utilisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Créer la table des progressions de jeu
CREATE TABLE IF NOT EXISTS public.game_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  score INTEGER DEFAULT 0,
  wisdom_points INTEGER DEFAULT 0,
  revelation_points INTEGER DEFAULT 0,
  unlocked_levels INTEGER[] DEFAULT ARRAY[1],

  -- Système de progression (8 niveaux x 16 grades)
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1 CHECK (current_level >= 1 AND current_level <= 8),
  current_grade INTEGER DEFAULT 1 CHECK (current_grade >= 1 AND current_grade <= 16),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id)
);

-- 3. Créer la table des étoiles par niveau
CREATE TABLE IF NOT EXISTS public.level_stars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  level_number INTEGER NOT NULL,
  stars INTEGER DEFAULT 0 CHECK (stars >= 0 AND stars <= 3),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, level_number)
);

-- ============================================
-- SÉCURITÉ: Row Level Security (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.level_stars ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES pour profiles
-- ============================================

-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Les utilisateurs peuvent créer leur propre profil
CREATE POLICY "Users can create own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================
-- POLICIES pour game_progress
-- ============================================

-- Les utilisateurs peuvent voir leur propre progression
CREATE POLICY "Users can view own progress"
  ON public.game_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leur propre progression
CREATE POLICY "Users can create own progress"
  ON public.game_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leur propre progression
CREATE POLICY "Users can update own progress"
  ON public.game_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- POLICIES pour level_stars
-- ============================================

-- Les utilisateurs peuvent voir leurs propres étoiles
CREATE POLICY "Users can view own stars"
  ON public.level_stars
  FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres étoiles
CREATE POLICY "Users can create own stars"
  ON public.level_stars
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres étoiles
CREATE POLICY "Users can update own stars"
  ON public.level_stars
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FONCTIONS pour auto-update des timestamps
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER game_progress_updated_at
  BEFORE UPDATE ON public.game_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- FONCTION pour créer un profil automatiquement
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);

  INSERT INTO public.game_progress (user_id, score, wisdom_points, revelation_points, unlocked_levels)
  VALUES (NEW.id, 0, 0, 0, ARRAY[1]);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement le profil et la progression
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- INDEX pour optimiser les performances
-- ============================================

CREATE INDEX IF NOT EXISTS idx_game_progress_user_id ON public.game_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_level_stars_user_id ON public.level_stars(user_id);
CREATE INDEX IF NOT EXISTS idx_level_stars_level_number ON public.level_stars(level_number);
