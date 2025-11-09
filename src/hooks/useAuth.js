import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Vérifier si on revient d'un magic link (hash contient access_token)
    const handleMagicLinkRedirect = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      if (accessToken && type === 'magiclink') {
        console.log('🔗 Magic link détecté - fermeture automatique après authentification');
        
        // Marquer qu'on est dans un onglet de redirection
        sessionStorage.setItem('faithchronicles_magic_link_tab', 'true');
        
        // Attendre que la session soit établie
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Nettoyer le hash de l'URL
        window.history.replaceState(null, '', window.location.pathname);
        
        // Fermer cet onglet (celui qui vient du magic link)
        window.close();
        
        // Si window.close() ne fonctionne pas (certains navigateurs bloquent),
        // afficher un message
        setTimeout(() => {
          if (!window.closed) {
            alert('✅ Connexion réussie ! Vous pouvez fermer cet onglet et retourner à l\'onglet précédent.');
          }
        }, 500);
      }
    };

    handleMagicLinkRedirect();

    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Connexion anonyme (pour jouer sans compte)
  const signInAnonymously = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Erreur connexion anonyme:', error);
      return { data: null, error };
    }
  };

  // Connexion avec email (magic link - pas de mot de passe!)
  const signInWithEmail = async (email) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}${process.env.PUBLIC_URL || ''}`,
        }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Erreur connexion email:', error);
      return { data: null, error };
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signInAnonymously,
    signInWithEmail,
    signOut,
    isConfigured: isSupabaseConfigured(),
  };
};
