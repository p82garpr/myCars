export const validateSpanishLicensePlate = (licensePlate: string): boolean => {
  // Formato: 0000XXX o XXXX000 (formato antiguo)
  const newFormat = /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/;
  const oldFormat = /^[A-Z]{1,4}\d{4}$/;
  
  return newFormat.test(licensePlate) || oldFormat.test(licensePlate);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const translateStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'AVAILABLE': 'Disponible',
    'SOLD': 'Vendido',
    'RESERVED': 'Reservado',
    'MAINTENANCE': 'En Mantenimiento'
  };
  return statusMap[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colorMap: { [key: string]: string } = {
    'AVAILABLE': 'bg-green-100 text-green-800',
    'SOLD': 'bg-red-100 text-red-800',
    'RESERVED': 'bg-yellow-100 text-yellow-800',
    'MAINTENANCE': 'bg-orange-100 text-orange-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
}; 