
import { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface ApiKeyConfig {
  providerName: string;
  initialModel?: string;
  preferredModelOptions: { value: string; label: string }[];
  additionalConfig?: Record<string, any>;
  onVerify: (apiKey: string) => Promise<boolean>;
}

export const useApiKey = ({
  providerName,
  initialModel,
  preferredModelOptions,
  additionalConfig = {},
  onVerify
}: ApiKeyConfig) => {
  const { isAuthenticated, user } = useAuth();
  const [apiKey, setApiKey] = useState<string>('');
  const [savedKey, setSavedKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [model, setModel] = useState<string>(initialModel || preferredModelOptions[0]?.value || '');
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [advancedConfig, setAdvancedConfig] = useState(additionalConfig);

  // Load API key from database or localStorage on component mount
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        // Check localStorage first for any saved keys
        const localKey = localStorage.getItem(`${providerName.toLowerCase()}-api-key`);
        const localModel = localStorage.getItem(`${providerName.toLowerCase()}-preferred-model`);
        const localConfig = localStorage.getItem(`${providerName.toLowerCase()}-additional-config`);
        
        // Initialize with localStorage values if available
        if (localKey) {
          setApiKey(localKey);
          setSavedKey(localKey);
          if (localModel) setModel(localModel);
          if (localConfig) {
            try {
              const parsedConfig = JSON.parse(localConfig);
              setAdvancedConfig({...additionalConfig, ...parsedConfig});
            } catch (e) {
              console.error("Error parsing stored config:", e);
            }
          }
          setKeyStatus('valid');
        }
        
        // If authenticated, also check Supabase
        if (isAuthenticated && user) {
          const { data, error } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model, config')
            .eq('provider_name', providerName.toLowerCase())
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (error) {
            // Handle the specific error for missing column
            if (error.message?.includes("column 'config' does not exist")) {
              console.log("Config column doesn't exist yet, using simpler query");
              // If 'config' column doesn't exist, try again with just api_key and preferred_model
              const { data: simpleData, error: simpleError } = await supabase
                .from('api_provider_settings')
                .select('api_key, preferred_model')
                .eq('provider_name', providerName.toLowerCase())
                .eq('user_id', user.id)
                .maybeSingle();
                
              if (!simpleError && simpleData) {
                if (simpleData && typeof simpleData === 'object') {
                  // Check if api_key property exists and is a string
                  if ('api_key' in simpleData && typeof simpleData.api_key === 'string') {
                    setApiKey(simpleData.api_key);
                    setSavedKey(simpleData.api_key);
                    
                    // Check if preferred_model property exists and is a string
                    if ('preferred_model' in simpleData && typeof simpleData.preferred_model === 'string') {
                      setModel(simpleData.preferred_model);
                    }
                    
                    setKeyStatus('valid');
                  }
                }
              } else if (simpleError) {
                console.error(`Error in simple fetch for ${providerName} API key:`, simpleError);
              }
            } else {
              console.error(`Error fetching ${providerName} API key:`, error);
              toast.error(`Failed to fetch saved API key for ${providerName}`);
            }
          } else if (data) {
            // Make sure data is not null before accessing properties
            if (data && typeof data === 'object') {
              // Check if api_key property exists and is a string
              if ('api_key' in data && typeof data.api_key === 'string') {
                setApiKey(data.api_key);
                setSavedKey(data.api_key);
                
                // Check if preferred_model property exists and is a string
                if ('preferred_model' in data && typeof data.preferred_model === 'string') {
                  setModel(data.preferred_model);
                }
                
                // Check if config property exists
                if ('config' in data && data.config !== null) {
                  try {
                    const parsedConfig = typeof data.config === 'string' 
                      ? JSON.parse(data.config) 
                      : data.config;
                    setAdvancedConfig({...additionalConfig, ...parsedConfig});
                  } catch (e) {
                    console.error("Error parsing stored config:", e);
                  }
                }
                
                setKeyStatus('valid');
              }
            }
          }
        }
      } catch (err) {
        console.error(`Exception while fetching ${providerName} API key:`, err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiKey();
  }, [providerName, isAuthenticated, user, additionalConfig]);
  
  // Save API key to database or localStorage
  const saveApiKey = async (key: string, verifiedModel: string) => {
    try {
      // Prepare the config data
      const configData = JSON.stringify(advancedConfig);
      
      // Always save to localStorage as a backup
      localStorage.setItem(`${providerName.toLowerCase()}-api-key`, key);
      localStorage.setItem(`${providerName.toLowerCase()}-preferred-model`, verifiedModel);
      localStorage.setItem(`${providerName.toLowerCase()}-additional-config`, configData);
      
      // If authenticated, try to save to Supabase as well
      if (isAuthenticated && user) {
        try {
          // First check if the config column exists
          const { data: columnExists, error: columnCheckError } = await supabase.rpc('column_exists', { 
            table_name: 'api_provider_settings',
            column_name: 'config'
          });

          if (columnCheckError) {
            console.error("Error checking if config column exists:", columnCheckError);
          }

          // Define the base upsert data
          const upsertData: {
            provider_name: string;
            api_key: string;
            preferred_model: string;
            user_id: string;
            updated_at: string;
            config?: Record<string, any>;
          } = {
            provider_name: providerName.toLowerCase(),
            api_key: key,
            preferred_model: verifiedModel,
            user_id: user.id,
            updated_at: new Date().toISOString()
          };
          
          // Add config only if the column exists
          if (!columnCheckError && columnExists === true) {
            upsertData.config = advancedConfig;
          }
          
          const { error } = await supabase
            .from('api_provider_settings')
            .upsert(upsertData, { onConflict: 'provider_name,user_id' });
          
          if (error) {
            console.error(`Error saving ${providerName} API key to database:`, error);
            toast.warning(`Saved API key locally, but failed to save to database: ${error.message}`);
            console.log("Debug info - user:", user);
            console.log("Debug info - auth state:", isAuthenticated);
          }
        } catch (error) {
          console.error(`Error during database operations for ${providerName}:`, error);
          toast.warning(`Saved API key locally, but failed during database operations`);
        }
      } else if (!isAuthenticated) {
        // If not authenticated, just notify that we saved locally only
        console.log("Not authenticated, saving API key to localStorage only");
      }
      
      setSavedKey(key);
      return true;
    } catch (error) {
      console.error(`Error saving ${providerName} API key:`, error);
      toast.error(`Failed to save API key`);
      return false;
    }
  };
  
  // Verify API key by making a call through the provider-specific verify function
  const verifyApiKey = useCallback(async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const isValid = await onVerify(apiKey);
      
      // If no error was thrown, the key is valid
      if (isValid) {
        const saved = await saveApiKey(apiKey, model);
        
        if (saved) {
          setKeyStatus('valid');
          toast.success(`${providerName} API key verified and saved successfully!`);
        }
      } else {
        setKeyStatus('invalid');
        toast.error(`Invalid ${providerName} API key or network error`);
      }
    } catch (error: any) {
      console.error(`${providerName} API key verification failed:`, error);
      
      // Handle quota exceeded error
      if (error instanceof Error && 
          (error.message?.includes('quota') || 
          error.message?.includes('billing') || 
          error.message?.includes('rate limit'))) {
        setKeyStatus('quota_exceeded');
        toast.error(`Your API key is valid, but you've exceeded your quota limits. Check your ${providerName} account billing.`);
      } else {
        setKeyStatus('invalid');
        toast.error(`Invalid ${providerName} API key or network error`);
      }
    } finally {
      setIsVerifying(false);
    }
  }, [apiKey, model, onVerify, providerName, saveApiKey]);
  
  const clearApiKey = async () => {
    try {
      // Always clear from localStorage
      localStorage.removeItem(`${providerName.toLowerCase()}-api-key`);
      localStorage.removeItem(`${providerName.toLowerCase()}-preferred-model`);
      localStorage.removeItem(`${providerName.toLowerCase()}-additional-config`);
      
      // If authenticated, try to clear from Supabase as well
      if (isAuthenticated && user) {
        const { error } = await supabase
          .from('api_provider_settings')
          .delete()
          .eq('provider_name', providerName.toLowerCase())
          .eq('user_id', user.id);
        
        if (error) {
          console.error(`Error removing ${providerName} API key from database:`, error);
          toast.warning(`Removed API key locally, but failed to remove from database`);
        }
      }
      
      setApiKey('');
      setSavedKey('');
      setKeyStatus('unknown');
      setAdvancedConfig(additionalConfig); // Reset to defaults
      toast.info(`${providerName} API key removed`);
    } catch (error) {
      console.error(`Error removing ${providerName} API key:`, error);
      toast.error(`Failed to completely remove API key`);
    }
  };
  
  const handleModelChange = async (value: string) => {
    setModel(value);
    
    // If we have a saved key, update the preferred model
    if (savedKey) {
      await saveApiKey(savedKey, value);
    }
  };
  
  const updateAdvancedConfig = (key: string, value: any) => {
    setAdvancedConfig(prev => {
      const updated = { ...prev, [key]: value };
      
      // If we have a saved key, save the updated config
      if (savedKey) {
        saveApiKey(savedKey, model);
      }
      
      return updated;
    });
  };
  
  return {
    apiKey,
    setApiKey,
    savedKey,
    isVerifying,
    isLoading,
    keyStatus,
    model,
    setModel,
    activeTab,
    setActiveTab,
    advancedConfig,
    verifyApiKey,
    clearApiKey,
    handleModelChange,
    updateAdvancedConfig,
  };
};
