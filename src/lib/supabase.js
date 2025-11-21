import { createClient } from '@supabase/supabase-js';

// Ces variables seront à configurer avec vos vraies clés Supabase
// IMPORTANT: Créez un fichier .env.local avec vos clés
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Créer le client Supabase seulement si les variables sont configurées
let supabase = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'faithchronicles@1.0.0',
      },
    },
    db: {
      schema: 'public',
    },
    // Timeout de 10 secondes pour éviter les requêtes qui traînent
    realtime: {
      timeout: 10000,
    }
  });
} else {
  // console.warn('⚠️ Supabase non configuré - Mode hors ligne uniquement');
  // console.warn('📖 Pour configurer Supabase, consultez .env.local.example');
}

export { supabase };

// Vérifier si Supabase est configuré
export const isSupabaseConfigured = () => {
  return Boolean(supabase && supabaseUrl && supabaseAnonKey);
};

// Fonction utilitaire pour vérifier la session
export const checkSession = async () => {
  if (!supabase) {
    return { session: null, isAuthenticated: false };
  }
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, isAuthenticated: !!session };
  } catch (error) {
    // console.error('Erreur vérification session:', error);
    return { session: null, isAuthenticated: false };
  }
};

// Fonction utilitaire pour rafraîchir la session
export const refreshSession = async () => {
  if (!supabase) {
    return { session: null, error: new Error('Supabase non configuré') };
  }
  
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error) {
    // console.error('Erreur rafraîchissement session:', error);
    return { session: null, error };
  }
};
