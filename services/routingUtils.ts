
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
    const parts = hostname.split('.');
    
    // Check for subdomain (e.g., arsalan.apex-sports.com)
    if (parts.length > 2) {
      const subdomain = parts[0].toLowerCase();
      const ignored = ['www', 'preview', 'dev', 'api', 'app', 'github', 'vercel'];
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
    const mode = getEnvironmentMode();
    const cleanName = showName.toLowerCase().trim().replace(/\s+/g, '-');
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';

    if (mode === 'production' && !hostname.includes('localhost')) {
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        const baseDomain = parts.slice(-2).join('.');
        return `${protocol}//${cleanName}.${baseDomain}${port}/#/`;
      }
    }

    return `${protocol}//${hostname}${port}/#/s/${cleanName}`;
  } catch (e) {
    return `/#/s/${showName}`;
  }
};
