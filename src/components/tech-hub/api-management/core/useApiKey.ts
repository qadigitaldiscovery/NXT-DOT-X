
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface ApiKeyFormProps {
  providerName: string;
  apiKeyPlaceholder?: string;
  docsLink?: {
    text: string;
    url: string;
  };
  onVerify?: (apiKey: string) => Promise<boolean>;
  preferredModelOptions?: Array<{
    value: string;
    label: string;
  }>;
  initialModel?: string;
  footerText?: string;
  additionalConfig?: Record<string, any>;
}

export interface ApiKeyState {
  apiKey: string;
  preferredModel: string;
  isSaving: boolean;
  isVerifying: boolean;
  isLoaded: boolean;
  isConfigVisible: boolean;
  savedSuccessfully: boolean;
  additionalConfig: Record<string, any>;
}

export const useApiKey = ({ 
  providerName,
  onVerify,
  initialModel = '',
  additionalConfig = {}
}: ApiKeyFormProps) => {
  const [state, setState] = useState<ApiKeyState>({
    apiKey: '',
    preferredModel: initialModel,
    isSaving: false,
    isVerifying: false,
    isLoaded: false,
    isConfigVisible: false,
    savedSuccessfully: false,
    additionalConfig: additionalConfig
  });
  
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [savedKey, setSavedKey] = useState<boolean>(false);

  const localStorageKeyName = `${providerName.toLowerCase()}-api-key`;
  const localStorageModelName = `${providerName.toLowerCase()}-preferred-model`;
  const localStorageConfigName = `${providerName.toLowerCase()}-additional-config`;

  // Load saved API key and settings
  const loadApiKey = useCallback(async () => {
    // First try localStorage
    const savedKey = localStorage.getItem(localStorageKeyName);
    const savedModel = localStorage.getItem(localStorageModelName) || initialModel;
    let savedConfig = { ...additionalConfig };
    
    try {
      const localConfig = localStorage.getItem(localStorageConfigName);
      if (localConfig) {
        savedConfig = { ...savedConfig, ...JSON.parse(localConfig) };
      }
    } catch (e) {
      console.error("Error parsing saved config:", e);
    }
    
    if (savedKey) {
      setState(prev => ({
        ...prev,
        apiKey: savedKey,
        preferredModel: savedModel,
        additionalConfig: savedConfig,
        isLoaded: true
      }));
      setSavedKey(true);
      return;
    }
    
    // Try to load from database if logged in
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model, config')
            .eq('provider_name', providerName.toLowerCase())
            .eq('user_id', session.user.id)
            .maybeSingle();
            
          if (error) {
            if (error.message?.includes("column 'config' does not exist")) {
              // If config column doesn't exist, try a simpler query
              const { data: simpleData, error: simpleError } = await supabase
                .from('api_provider_settings')
                .select('api_key, preferred_model')
                .eq('provider_name', providerName.toLowerCase())
                .eq('user_id', session.user.id)
                .maybeSingle();
                
              if (!simpleError && simpleData) {
                setState(prev => ({
                  ...prev,
                  apiKey: simpleData?.api_key || '',
                  preferredModel: simpleData?.preferred_model || initialModel,
                  isLoaded: true
                }));
                setSavedKey(simpleData?.api_key ? true : false);
              }
            }
            console.error(`Error loading ${providerName} API key:`, error);
          } else if (data) {
            // Handle config if it exists in the database
            let configFromDb = { ...additionalConfig };
            
            if (data.config && typeof data.config === 'object') {
              configFromDb = { ...configFromDb, ...data.config };
            }
            
            setState(prev => ({
              ...prev,
              apiKey: data?.api_key || '',
              preferredModel: data?.preferred_model || initialModel,
              additionalConfig: configFromDb,
              isLoaded: true
            }));
            setSavedKey(data?.api_key ? true : false);
          }
        } catch (err) {
          console.error(`Error fetching ${providerName} API key:`, err);
        }
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
    }
    
    setState(prev => ({ ...prev, isLoaded: true }));
  }, [providerName, localStorageKeyName, localStorageModelName, localStorageConfigName, initialModel, additionalConfig]);

  useEffect(() => {
    loadApiKey();
  }, [loadApiKey]);

  const saveToLocalStorage = useCallback((key: string, model: string, config?: Record<string, any>) => {
    localStorage.setItem(localStorageKeyName, key);
    localStorage.setItem(localStorageModelName, model);
    
    if (config) {
      localStorage.setItem(localStorageConfigName, JSON.stringify(config));
    }
  }, [localStorageKeyName, localStorageModelName, localStorageConfigName]);

  const saveToDatabase = useCallback(async (key: string, model: string, config?: Record<string, any>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if the record exists
        const { data, error } = await supabase
          .from('api_provider_settings')
          .select('id')
          .eq('provider_name', providerName.toLowerCase())
          .eq('user_id', session.user.id)
          .maybeSingle();
          
        const settingsData: {
          api_key: string;
          preferred_model: string;
          provider_name: string;
          user_id: string;
          updated_at: string;
          config?: Record<string, any>;
        } = {
          api_key: key,
          preferred_model: model,
          provider_name: providerName.toLowerCase(),
          user_id: session.user.id,
          updated_at: new Date().toISOString()
        };
        
        // Add config if the column exists and we have a value
        if (config) {
          try {
            // Check if the config column exists
            const { error: checkError } = await supabase.rpc(
              'column_exists',
              { 
                p_table: 'api_provider_settings',
                p_column: 'config' 
              }
            );
            
            if (!checkError) {
              settingsData.config = config;
            }
          } catch (e) {
            console.error("Error checking if config column exists:", e);
          }
        }

        if (!error && data) {
          // Update existing record
          const { error: updateError } = await supabase
            .from('api_provider_settings')
            .update(settingsData)
            .eq('id', data.id);
            
          if (updateError) {
            throw updateError;
          }
        } else {
          // Insert new record
          const { error: insertError } = await supabase
            .from('api_provider_settings')
            .insert(settingsData);
            
          if (insertError) {
            throw insertError;
          }
        }
        
        return true;
      }
    } catch (err) {
      console.error(`Error saving ${providerName} API key to database:`, err);
      throw err;
    }
    
    return false;
  }, [providerName]);

  const setApiKey = useCallback((value: string) => {
    setState(prev => ({ ...prev, apiKey: value }));
  }, []);

  const handleConfigChange = useCallback((key: string, value: any) => {
    setState(prev => ({
      ...prev,
      additionalConfig: {
        ...prev.additionalConfig,
        [key]: value
      }
    }));
  }, []);

  const updateAdvancedConfig = handleConfigChange;

  const handleModelChange = useCallback((value: string) => {
    setState(prev => ({ ...prev, preferredModel: value }));
  }, []);

  const clearApiKey = useCallback(() => {
    localStorage.removeItem(localStorageKeyName);
    localStorage.removeItem(localStorageModelName);
    localStorage.removeItem(localStorageConfigName);
    
    setState(prev => ({
      ...prev,
      apiKey: '',
      preferredModel: initialModel,
      additionalConfig: { ...additionalConfig }
    }));
    
    setSavedKey(false);
    setKeyStatus('unknown');
    
    toast.success(`${providerName} API key removed`);
  }, [localStorageKeyName, localStorageModelName, localStorageConfigName, initialModel, additionalConfig, providerName]);

  const verifyApiKey = useCallback(async () => {
    setState(prev => ({ ...prev, isVerifying: true }));
    setKeyStatus('unknown');
    
    try {
      // Verify the key if a verification function is provided
      if (onVerify) {
        const isValid = await onVerify(state.apiKey);
        
        if (!isValid) {
          toast.error(`Invalid ${providerName} API key. Please check and try again.`);
          setState(prev => ({ ...prev, isVerifying: false }));
          setKeyStatus('invalid');
          return;
        }
      }
      
      // Set saving state
      setState(prev => ({ ...prev, isVerifying: false, isSaving: true }));
      
      // Save to localStorage first (always works)
      saveToLocalStorage(state.apiKey, state.preferredModel, state.additionalConfig);
      
      // Try to save to database if user is logged in
      try {
        await saveToDatabase(state.apiKey, state.preferredModel, state.additionalConfig);
      } catch (e) {
        console.warn("Could not save to database, but saved to localStorage");
      }
      
      toast.success(`${providerName} API key saved successfully!`);
      setState(prev => ({ ...prev, isSaving: false, savedSuccessfully: true }));
      setSavedKey(true);
      setKeyStatus('valid');
      
      // Reset saved success notification after 3 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, savedSuccessfully: false }));
      }, 3000);
      
    } catch (error: any) {
      // Special handling for quota exceeded errors
      if (error.message === 'quota_exceeded' || 
          error.message?.includes('quota') || 
          error.message?.includes('rate_limit')) {
        toast.warning(`Your ${providerName} API key appears valid but has insufficient quota. It has been saved anyway.`);
        saveToLocalStorage(state.apiKey, state.preferredModel, state.additionalConfig);
        setState(prev => ({ ...prev, isVerifying: false, isSaving: false }));
        setSavedKey(true);
        setKeyStatus('quota_exceeded');
        return;
      }
      
      console.error(`Error verifying ${providerName} API key:`, error);
      toast.error(`Failed to verify ${providerName} API key. Please check and try again.`);
      setState(prev => ({ ...prev, isVerifying: false, isSaving: false }));
      setKeyStatus('invalid');
    }
  }, [state.apiKey, state.preferredModel, state.additionalConfig, providerName, onVerify, saveToLocalStorage, saveToDatabase]);

  return {
    apiKey: state.apiKey,
    setApiKey,
    savedKey,
    isVerifying: state.isVerifying,
    isLoading: !state.isLoaded,
    keyStatus,
    model: state.preferredModel,
    activeTab,
    setActiveTab,
    advancedConfig: state.additionalConfig,
    verifyApiKey,
    clearApiKey,
    handleModelChange,
    updateAdvancedConfig,
    state,
    handleInputChange: (field: keyof ApiKeyState, value: string | boolean | Record<string, any>) => {
      setState(prev => ({ ...prev, [field]: value }));
    },
    handleConfigChange,
    handleToggleConfig: () => {
      setState(prev => ({
        ...prev,
        isConfigVisible: !prev.isConfigVisible
      }));
    },
    verifyAndSave: verifyApiKey,
    loadApiKey
  };
};

export default useApiKey;
