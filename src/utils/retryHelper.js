/**
 * Utilitaire pour retry automatique des requêtes Supabase
 * Gère les erreurs réseau temporaires et les timeouts
 */

/**
 * Exécute une fonction avec retry automatique
 * @param {Function} fn - Fonction async à exécuter
 * @param {Object} options - Options de configuration
 * @param {number} options.maxRetries - Nombre maximum de tentatives (défaut: 3)
 * @param {number} options.delay - Délai entre les tentatives en ms (défaut: 1000)
 * @param {number} options.backoffMultiplier - Multiplicateur pour le backoff exponentiel (défaut: 2)
 * @param {Array<string>} options.retryOnCodes - Codes d'erreur pour lesquels retenter (défaut: ['20', 'PGRST301'])
 * @returns {Promise} Résultat de la fonction ou erreur
 */
export const retryWithBackoff = async (fn, options = {}) => {
  const {
    maxRetries = 3,
    delay = 1000,
    backoffMultiplier = 2,
    retryOnCodes = ['20', 'PGRST301'], // 20 = AbortError, PGRST301 = Timeout
  } = options;

  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await fn();
      
      // Si la fonction retourne {error}, vérifier le code d'erreur
      if (result && result.error) {
        const errorCode = result.error.code;
        const isRetryable = 
          retryOnCodes.includes(errorCode) ||
          result.error.message?.includes('NetworkError') ||
          result.error.message?.includes('AbortError');

        if (!isRetryable || attempt === maxRetries - 1) {
          return result; // Retourner l'erreur non-retryable ou dernière tentative
        }

        lastError = result.error;
        console.warn(`Tentative ${attempt + 1}/${maxRetries} échouée, retry dans ${delay * Math.pow(backoffMultiplier, attempt)}ms...`);
      } else {
        return result; // Succès
      }
    } catch (error) {
      // Erreurs throw (non-Supabase)
      const isRetryable = 
        error.message?.includes('NetworkError') ||
        error.message?.includes('AbortError') ||
        error.message?.includes('timeout') ||
        error.name === 'AbortError';

      if (!isRetryable || attempt === maxRetries - 1) {
        throw error;
      }

      lastError = error;
      console.warn(`Tentative ${attempt + 1}/${maxRetries} échouée:`, error.message);
    }

    // Attendre avec backoff exponentiel
    if (attempt < maxRetries - 1) {
      await new Promise(resolve => 
        setTimeout(resolve, delay * Math.pow(backoffMultiplier, attempt))
      );
    }
  }

  // Si on arrive ici, toutes les tentatives ont échoué
  throw lastError || new Error('Toutes les tentatives ont échoué');
};

/**
 * Wrapper spécialisé pour les sauvegardes Supabase
 * @param {Function} saveFn - Fonction de sauvegarde à exécuter
 * @param {string} operationName - Nom de l'opération pour les logs
 * @returns {Promise} Résultat de la sauvegarde
 */
export const retrySave = async (saveFn, operationName = 'sauvegarde') => {
  return retryWithBackoff(saveFn, {
    maxRetries: 2, // Réduit de 3 à 2 pour éviter trop de spam
    delay: 1000,
    backoffMultiplier: 1.5, // Plus doux pour les sauvegardes
  }).catch(error => {
    console.error(`Échec de la ${operationName} après plusieurs tentatives:`, error);
    return { data: null, error };
  });
};

/**
 * Wrapper spécialisé pour les chargements Supabase
 * @param {Function} loadFn - Fonction de chargement à exécuter
 * @param {string} operationName - Nom de l'opération pour les logs
 * @returns {Promise} Résultat du chargement
 */
export const retryLoad = async (loadFn, operationName = 'chargement') => {
  return retryWithBackoff(loadFn, {
    maxRetries: 1, // Encore moins de retries pour les chargements
    delay: 500,
    backoffMultiplier: 2,
  }).catch(error => {
    console.warn(`Échec du ${operationName} après plusieurs tentatives:`, error);
    return { data: null, error };
  });
};

/**
 * Débounce pour éviter trop de sauvegardes rapides
 * @param {Function} fn - Fonction à débouncer
 * @param {number} wait - Temps d'attente en ms
 * @returns {Function} Fonction debouncée
 */
export const debounce = (fn, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle pour limiter la fréquence d'exécution
 * @param {Function} fn - Fonction à throttler
 * @param {number} limit - Temps minimum entre les exécutions en ms
 * @returns {Function} Fonction throttlée
 */
export const throttle = (fn, limit = 1000) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Cache intelligent avec expiration automatique
 * Optimise les appels API en évitant les rechargements fréquents
 */
export class SmartCache {
  constructor(ttl = 60000) { // TTL par défaut: 60 secondes
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  isValid(key) {
    const item = this.cache.get(key);
    if (!item) return false;
    return Date.now() - item.timestamp <= this.ttl;
  }

  getAge(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    return Date.now() - item.timestamp;
  }
}

// Instance globale du cache pour les scores avec TTL de 60 secondes
export const scoreCache = new SmartCache(60000);

// Instance pour le cache des étoiles avec TTL de 60 secondes aussi
export const starsCache = new SmartCache(60000);
