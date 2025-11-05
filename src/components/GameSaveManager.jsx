import React, { useState } from 'react';
import { Save, Upload, RefreshCw, Archive, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation.js';

const GameSaveManager = ({ 
  user, 
  isAnonymousMode, 
  isSupabaseConnected, 
  onManualSave,
  onLoadSave,
  lastSaveTime,
  className = "" 
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const { t } = useTranslation();

  if (!user) return null;

  const handleManualSave = async () => {
    setIsSaving(true);
    setLastAction('save');
    try {
      await onManualSave();
      setTimeout(() => {
        setIsSaving(false);
        setLastAction(null);
      }, 2000);
    } catch (error) {
      setIsSaving(false);
      setLastAction('error');
    }
  };

  const handleLoadSave = async () => {
    setIsLoading(true);
    setLastAction('load');
    try {
      await onLoadSave();
      setTimeout(() => {
        setIsLoading(false);
        setLastAction(null);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setLastAction('error');
    }
  };

  const getSaveLocation = () => {
    if (isAnonymousMode) return t('gameManager.saveLocal');
    if (isSupabaseConnected) return t('gameManager.saveCloud');
    return t('gameManager.saveWaiting');
  };

  const getSaveStatusColor = () => {
    if (isAnonymousMode) return "text-orange-600";
    if (isSupabaseConnected) return "text-green-600";
    return "text-blue-600";
  };

  const formatLastSave = () => {
    if (!lastSaveTime) return t('gameManager.never');
    return new Date(lastSaveTime).toLocaleTimeString();
  };

  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Archive className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-800">{t('gameManager.title')}</h3>
        </div>
        
        {/* Status indicator */}
        <div className={`text-xs ${getSaveStatusColor()} flex items-center space-x-1`}>
          {isSupabaseConnected ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          <span>{getSaveLocation()}</span>
        </div>
      </div>

      {/* Save info */}
      <div className="mb-3 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{t('gameManager.lastSave')}</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatLastSave()}</span>
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        {/* Save button */}
        <button
          onClick={handleManualSave}
          disabled={isSaving}
          className="flex items-center justify-center space-x-2 py-2 px-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? t('gameManager.saving') : t('gameManager.save')}</span>
        </button>

        {/* Load button */}
        <button
          onClick={handleLoadSave}
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 py-2 px-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{isLoading ? t('gameManager.loading') : t('gameManager.loadProgress')}</span>
        </button>
      </div>

      {/* Status messages */}
      {lastAction && (
        <div className="mt-2 text-xs text-center">
          {lastAction === 'save' && !isSaving && (
            <span className="text-green-600">{t('gameManager.gameSaved')}</span>
          )}
          {lastAction === 'load' && !isLoading && (
            <span className="text-blue-600">{t('gameManager.gameLoaded')}</span>
          )}
          {lastAction === 'error' && (
            <span className="text-red-600">{t('gameManager.saveError')}</span>
          )}
        </div>
      )}

      {/* Auto-save indicator */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        {t('gameManager.autoSaveEnabled')}
      </div>
    </div>
  );
};

export default GameSaveManager;