
/**
 * Utility to handle link generation and show detection.
 * Supports both path-based (/s/name) and subdomain-based (name.domain.com) identification.
 */

export const getEnvironmentMode = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) return 'development';
  if (hostname.includes('preview') || window.location.search.includes('mode=preview')) return 'preview';
  return 'production';
};

export const detectShowName = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // If we have a subdomain (e.g., arsalan.apex-sports.com)
  // Skip common prefixes like 'www' or 'preview'
  if (parts.length > 2) {
    const subdomain = parts[0].toLowerCase();
    if (!['www', 'preview', 'dev', 'api', 'app'].includes(subdomain)) {
      return subdomain;
    }
  }
  return null;
};

export const generateProfessionalLink = (showName: string) => {
  const mode = getEnvironmentMode();
  const cleanName = showName.toLowerCase().trim().replace(/\s+/g, '-');
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';

  // In production, we aim for the subdomain format as requested by the user
  if (mode === 'production' && !hostname.includes('localhost')) {
    // If the hostname is already a subdomain, we replace it or append
    const baseDomain = hostname.split('.').slice(-2).join('.');
    return `${protocol}//${cleanName}.${baseDomain}${port}/#/`;
  }

  // Fallback to path-based link for preview/local environments
  return `${protocol}//${hostname}${port}/#/s/${cleanName}`;
};
