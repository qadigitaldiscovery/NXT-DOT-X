// Utility functions for handling caching issues

/**
 * Force a hard refresh of the application to clear cached resources
 * Use this when users report seeing old versions despite deployments
 */
export function forceHardRefresh() {
  console.log('Performing hard refresh to clear cached resources...');
  
  // Clear any application cache
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // Force reload from server, not cache
  window.location.reload();
}

/**
 * Add a version parameter to the URL to bust cache
 * @param url The URL to modify
 * @returns The URL with a version parameter
 */
export function addCacheBuster(url: string): string {
  const version = new Date().getTime(); // Use timestamp as version
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${version}`;
}

// Current deployment version - update this with each deployment
export const CURRENT_VERSION = '2025-05-17';