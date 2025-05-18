// Obtener la URL base de la API
const getApiBaseUrl = () => {
  // Si estamos en desarrollo, usar la IP local o localhost
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  }
  // En producción, usar la URL de producción
  return process.env.NEXT_PUBLIC_API_URL || '';
};

export const API_BASE_URL = 'http://localhost:8080';

// Configuración por defecto para fetch
export const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}; 