
/**
 * Utility to handle link generation and show detection.
 * Supports both path-based (/s/name) and subdomain-based identification.
 */

export const getEnvironmentMode = () => {
  try {
    const hostname = window.location.hostname;
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) return 'development';
    if (hostname.includes('preview') || window.location.search.includes('mode=preview')) return 'preview';
    return 'production';
  } catch (e) {
    return 'production';
  }
};

export const detectShowName = () => {
  try {
    const hostname = window.location.hostname;
    const hash = window.location.hash;

    // 1. Priority: Check the URL Hash (works everywhere, including WordPress/Vercel)
    // Format: #/s/arslan
    const hashMatch = hash.match(/\/s\/([^/]+)/);
    if (hashMatch && hashMatch[1]) {
      return hashMatch[1].toLowerCase();
    }

    // 2. Secondary: Check Subdomain (e.g., arsalan.world-market-shop.vercel.app)
    const parts = hostname.split('.');
    if (parts.length > 2) {
      const subdomain = parts[0].toLowerCase();
      const ignored = ['www', 'preview', 'dev', 'api', 'app', 'github', 'vercel', 'world-market-shop'];
      if (!ignored.includes(subdomain)) {
        return subdomain;
      }
    }
  } catch (e) {
    console.error("Show detection failed", e);
  }
  return null;
};

export const generateProfessionalLink = (showName: string) => {
  try {
    const cleanName = showName.toLowerCase().trim().replace(/\s+/g, '-');
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';
    
    // For Vercel deployments, use the hash-path which is 100% mobile compatible
    // Example: https://world-market-shop.vercel.app/#/s/arslan
    if (hostname.includes('vercel.app')) {
      return `${protocol}//${hostname}${port}/#/s/${cleanName}`;
    }

    // Fallback for custom domains
    return `${protocol}//${hostname}${port}/#/s/${cleanName}`;
  } catch (e) {
    return `/#/s/${showName}`;
  }
};
