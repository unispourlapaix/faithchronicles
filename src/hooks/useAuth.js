import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // console.log('⚠️ Supabase non configuré');
      setLoading(false);
      return;
    }

    // console.log('🔐 Initialisation de l\'authentification...');

    // Fonction pour vérifier et restaurer une session existante
    const checkExistingSession = async () => {
      try {
        // Vérifier d'abord si une session existe déjà
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (currentSession) {
          // console.log('✅ Session active trouvée:', currentSession.user.email);
          return currentSession;
        }
        
        // Si pas de session locale, vérifier si on peut en récupérer une depuis l'API
        // console.log('🔍 Pas de session locale, vérification en ligne...');
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (user) {
          // console.log('✅ Session en ligne trouvée et synchronisée:', user.email);
          // Forcer un refresh de session pour synchroniser
          const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
          return refreshedSession;
        }
        
        // console.log('ℹ️ Aucune session trouvée (en ligne ou locale)');
        return null;
      } catch (error) {
        // console.error('❌ Erreur vérification session:', error);
        return null;
      }
    };

    // Vérifier si on revient d'un magic link (hash contient access_token)
    const handleMagicLinkRedirect = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');
      
      // console.log('🔍 Vérification hash URL:', { 
        hasAccessToken: !!accessToken, 
        hasRefreshToken: !!refreshToken,
        type 
      });
      
      // Magic link détecté - Supabase gère automatiquement avec detectSessionInUrl
      // On nettoie juste le hash de l'URL pour améliorer l'UX
      if (accessToken && refreshToken) {
        // console.log('🔗 Magic link détecté - Supabase traite automatiquement l\'authentification');
        
        // Attendre que Supabase établisse la session (detectSessionInUrl fait le travail)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Vérifier la session
        const { data: { session } } = await supabase.auth.getSession();
        // console.log('✅ Session après magic link:', session ? `User: ${session.user.email}` : 'Non établie');
        
        // Nettoyer le hash de l'URL pour améliorer l'UX
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        
        return session;
      }
      
      return null;
    };

    // Initialiser l'authentification
    const initAuth = async () => {
      // 1. D'abord vérifier s'il y a un magic link
      const magicLinkSession = await handleMagicLinkRedirect();
      
      if (magicLinkSession) {
        setSession(magicLinkSession);
        setUser(magicLinkSession.user);
        setLoading(false);
        return;
      }
      
      // 2. Sinon, vérifier s'il y a une session existante (locale ou en ligne)
      const existingSession = await checkExistingSession();
      
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      setLoading(false);
    };

    initAuth();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log('🔄 Changement auth:', event, session ? `User: ${session.user.email || 'anonymous'}` : 'Aucune session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Connexion anonyme (pour jouer sans compte - MODE LOCAL UNIQUEMENT)
  const signInAnonymously = async () => {
    try {
      // Mode anonyme = pas de connexion Supabase, juste localStorage
      // console.log('🎮 Connexion anonyme locale (pas de Supabase)');
      
      // Pas d'appel à Supabase, on retourne juste un succès
      // L'utilisateur sera géré uniquement en local
      return { 
        data: { 
          user: null, // Pas d'utilisateur Supabase
          session: null 
        }, 
        error: null 
      };
    } catch (error) {
      // console.error('Erreur connexion anonyme:', error);
      return { data: null, error };
    }
  };

  // Connexion avec email (magic link - pas de mot de passe!)
  const signInWithEmail = async (email) => {
    try {
      // Utiliser l'origine actuelle pour la redirection
      // Cela permet de se connecter aussi bien sur localhost qu'en production
      const redirectUrl = `${window.location.origin}${process.env.PUBLIC_URL || ''}`;
      
      // console.log('📧 emailRedirectTo:', redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      // console.error('Erreur connexion email:', error);
      
      // Détection de l'erreur de rate limiting (15 secondes entre chaque envoi)
      const isRateLimited = error.message && (
        error.message.includes('only request this after') ||
        error.message.includes('For security purposes')
      );
      
      return { 
        data: null, 
        error,
        isRateLimited 
      };
    }
  };

  // Connexion avec email + mot de passe (méthode simple et fiable)
  const signInWithPassword = async (email, password) => {
    try {
      // console.log('🔐 Tentative de connexion avec mot de passe:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // console.log('✅ Connexion réussie:', data.user.email);
      return { data, error: null };
    } catch (error) {
      // console.error('❌ Erreur connexion mot de passe:', error);
      return { data: null, error };
    }
  };

  // Inscription avec email + mot de passe
  const signUpWithPassword = async (email, password) => {
    try {
      // console.log('📝 Tentative d\'inscription:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Pas besoin de confirmation email pour simplifier
          emailRedirectTo: `${window.location.origin}${process.env.PUBLIC_URL || ''}`,
        }
      });
      
      if (error) throw error;
      
      // console.log('✅ Inscription réussie:', data.user?.email || 'En attente confirmation');
      return { data, error: null };
    } catch (error) {
      // console.error('❌ Erreur inscription:', error);
      return { data: null, error };
    }
  };

  // Réinitialisation de mot de passe (envoie un email avec un lien)
  const resetPassword = async (email) => {
    try {
      // console.log('🔑 Envoi email de réinitialisation:', email);
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${process.env.PUBLIC_URL || ''}/reset-password`,
      });
      
      if (error) throw error;
      
      // console.log('✅ Email de réinitialisation envoyé');
      return { data, error: null };
    } catch (error) {
      // console.error('❌ Erreur réinitialisation:', error);
      return { data: null, error };
    }
  };

  // Mettre à jour le mot de passe (après avoir cliqué sur le lien dans l'email)
  const updatePassword = async (newPassword) => {
    try {
      // console.log('🔐 Mise à jour du mot de passe');
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      // console.log('✅ Mot de passe mis à jour');
      return { data, error: null };
    } catch (error) {
      // console.error('❌ Erreur mise à jour mot de passe:', error);
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
      // console.error('Erreur déconnexion:', error);
      return { error };
    }
  };

  // Importer la session depuis le site de production via postMessage
  // Ouvre une petite popup sur la production qui renvoie la session stockée
  const importSessionFromProduction = () => {
    return new Promise((resolve) => {
      if (!isSupabaseConfigured()) {
        return resolve({ session: null, error: new Error('Supabase non configuré') });
      }

      const prodOrigin = 'https://unispourlapaix.github.io';
      const popupUrl = `${prodOrigin}/unityquest-chronicles-of-love/session-exporter.html`;
      const popup = window.open(popupUrl, 'fc_session_export', 'width=600,height=700');
      if (!popup) {
        return resolve({ session: null, error: new Error('Popup bloquée, autorisez les popups.') });
      }

      const onMessage = async (e) => {
        try {
          // Sécurité: n'accepter que depuis la production
          if (e.origin !== prodOrigin) return;
          const data = e.data;
          if (!data || data.type !== 'faithchronicles:session') return;

          window.removeEventListener('message', onMessage);
          try { popup.close(); } catch (err) {}

          let payload = data.payload;
          if (typeof payload === 'string') {
            try { payload = JSON.parse(payload); } catch (e) {}
          }

          // Chercher un objet contenant un token/ session
          let tokenObj = null;
          const findToken = (obj) => {
            if (!obj) return null;
            if (obj.access_token && obj.refresh_token) return obj;
            if (obj.currentSession && obj.currentSession.access_token) return obj.currentSession;
            return null;
          };

          if (findToken(payload)) tokenObj = findToken(payload);
          else if (typeof payload === 'object') {
            for (const k of Object.keys(payload)) {
              const maybe = findToken(payload[k]);
              if (maybe) { tokenObj = maybe; break; }
            }
          }

          if (!tokenObj) {
            return resolve({ session: null, error: new Error('Aucun token trouvé dans la production') });
          }

          // Essayer de restaurer la session localement
          const { access_token, refresh_token } = tokenObj;
          if (!access_token) return resolve({ session: null, error: new Error('Token invalide') });

          // Utiliser setSession pour écrire les tokens dans localStorage local
          const { data: setData, error: setError } = await supabase.auth.setSession({ access_token, refresh_token });
          if (setError) return resolve({ session: null, error: setError });

          // Récupérer la session et mettre à jour le state
          const { data: { session: newSession } } = await supabase.auth.getSession();
          setSession(newSession);
          setUser(newSession?.user ?? null);
          setLoading(false);

          return resolve({ session: newSession, error: null });
        } catch (err) {
          return resolve({ session: null, error: err });
        }
      };

      window.addEventListener('message', onMessage);
    });
  };

  return {
    user,
    session,
    loading,
    signInAnonymously,
    signInWithEmail,
    signInWithPassword,
    signUpWithPassword,
    resetPassword,
    updatePassword,
    signOut,
    importSessionFromProduction,
    isConfigured: isSupabaseConfigured(),
  };
};
