import { useState, useEffect } from 'react';
import { tryUseEdgeFunction } from '@/utils/api-clients/common/edge-function-utils';
import { supabase } from '@/integrations/supabase/client';
export function useStorageBucket(bucketName = 'documents') {
    const [bucketExists, setBucketExists] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function checkBucket() {
            setIsLoading(true);
            try {
                // First try using Supabase client directly
                const { data: buckets, error: listError } = await supabase.storage.listBuckets();
                if (listError) {
                    console.warn("Error listing buckets:", listError);
                    // If direct check fails, try the edge function
                    const result = await tryUseEdgeFunction('storage', {
                        action: 'create-bucket',
                        bucketName
                    });
                    setBucketExists(!!result?.success);
                }
                else {
                    // Direct check succeeded
                    const exists = buckets?.some(bucket => bucket.name === bucketName) || false;
                    setBucketExists(exists);
                    // If bucket doesn't exist, try to create it
                    if (!exists) {
                        const result = await tryUseEdgeFunction('storage', {
                            action: 'create-bucket',
                            bucketName
                        });
                        setBucketExists(!!result?.success);
                    }
                }
            }
            catch (err) {
                console.error("Error checking bucket:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            }
            finally {
                setIsLoading(false);
            }
        }
        checkBucket();
    }, [bucketName]);
    return { bucketExists, isLoading, error };
}
