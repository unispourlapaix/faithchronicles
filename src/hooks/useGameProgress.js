import { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { retrySave, retryLoad } from '../utils/retryHelper.js';

export const useGameProgress = (userId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const lastLoadedUserId = useRef(null);
  const lastRefreshTime = useRef(0);
  const refreshIntervalRef = useRef(null);

  // Charger la progression depuis Supabase avec cache 60s
  const loadProgress = async (forceRefresh = false) => {
    if (!isSupabaseConfigured() || !userId) {
      setLoading(false);
      return;
    }

    // Vérifier si on doit rafraîchir (max 60s)
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTime.current;
    
    if (!forceRefresh && timeSinceLastRefresh < 60000 && progress !== null) {
      // console.log('🔄 Cache valide, pas de rechargement nécessaire');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // console.log('🔄 Rafraîchissement des scores...');

      // Vérifier la session active
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // console.warn('Aucune session active - progression non chargée');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('faithchronicles_game_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = pas de résultat
        throw error;
      }

      setProgress(data);
      setError(null);
      lastRefreshTime.current = now;
      // console.log('✅ Scores rafraîchis avec succès');
    } catch (err) {
      // console.error('Erreur chargement progression:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarder la progression dans Supabase
  const saveProgress = async (progressData) => {
    if (!isSupabaseConfigured() || !userId) {
      return { error: new Error('Supabase non configuré') };
    }

    // Utiliser retry automatique pour gérer les erreurs réseau
    return retrySave(async () => {
      // Vérifier la session active avant de sauvegarder
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // console.warn('Aucune session active - progression non sauvegardée');
        return { error: new Error('Non authentifié') };
      }

      const { data, error } = await supabase
        .from('faithchronicles_game_progress')
        .upsert({
          user_id: userId,
          email: session.user?.email, // ✅ Ajouter l'email pour JOIN facile
          score: progressData.score,
          wisdom_points: progressData.wisdomPoints,
          revelation_points: progressData.revelationPoints,
          unlocked_levels: progressData.unlockedLevels,
          total_xp: progressData.totalXP || 0,
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) throw error;

      setProgress(data);
      setLastSaveTime(new Date().toISOString()); // Mettre à jour l'horodatage
      return { data, error: null };
    }, 'sauvegarde progression');
  };

  // Sauvegarder les étoiles d'un niveau
  const saveLevelStars = async (levelNumber, stars) => {
    if (!isSupabaseConfigured() || !userId) {
      return { error: new Error('Supabase non configuré') };
    }

    // Utiliser retry automatique pour gérer les erreurs réseau
    return retrySave(async () => {
      // Vérifier la session active avant de sauvegarder
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // console.warn('Aucune session active - étoiles non sauvegardées');
        return { error: new Error('Non authentifié') };
      }

      const { data, error } = await supabase
        .from('faithchronicles_level_stars')
        .upsert({
          user_id: userId,
          level_number: levelNumber,
          stars: stars,
        }, {
          onConflict: 'user_id,level_number'
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    }, 'sauvegarde étoiles');
  };

  // Charger toutes les étoiles avec cache 60s
  const loadAllStars = async (forceRefresh = false) => {
    if (!isSupabaseConfigured() || !userId) {
      return { data: [], error: null };
    }

    // Vérifier le cache pour les étoiles aussi
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTime.current;
    
    if (!forceRefresh && timeSinceLastRefresh < 60000) {
      // console.log('⭐ Cache étoiles valide');
    }

    // Utiliser retry automatique pour gérer les erreurs réseau
    return retryLoad(async () => {
      // Vérifier la session active
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // console.warn('Aucune session active - étoiles non chargées');
        return { data: {}, error: new Error('Non authentifié') };
      }

      const { data, error } = await supabase
        .from('faithchronicles_level_stars')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      // Convertir en objet {levelNumber: stars}
      const starsObject = {};
      data?.forEach(item => {
        starsObject[item.level_number] = item.stars;
      });

      return { data: starsObject, error: null };
    }, 'chargement étoiles');
  };

  useEffect(() => {
    // Éviter de recharger si c'est le même utilisateur
    if (userId && userId !== lastLoadedUserId.current) {
      lastLoadedUserId.current = userId;
      // console.log('🔄 Nouveau utilisateur détecté, chargement progression:', userId);
      loadProgress(true); // Force refresh pour nouveau user
      
      // Configurer rafraîchissement automatique toutes les 60s
      refreshIntervalRef.current = setInterval(() => {
        loadProgress(false); // Refresh si nécessaire
      }, 60000);
    } else if (!userId) {
      setLoading(false);
      setProgress(null);
      // Nettoyer l'interval si pas d'utilisateur
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    } else if (userId === lastLoadedUserId.current && progress === null) {
      // Cas spécial: même utilisateur mais pas de progression chargée (après rafraîchissement)
      // console.log('🔄 Rechargement après rafraîchissement de page pour:', userId);
      loadProgress(true);
    }

    // Cleanup function
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    progress,
    loading,
    error,
    lastSaveTime,
    saveProgress,
    saveLevelStars,
    loadAllStars,
    reload: () => loadProgress(true), // Force refresh
    forceRefresh: () => loadProgress(true),
  };
};
