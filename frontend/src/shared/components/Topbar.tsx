import Link from 'next/link';

export function Topbar() {
  return (
    <nav className="bg-white border-b border-neutral-200 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 7L17 10M17 10L14 13M17 10H3M6 17L3 20M3 20L6 23M3 20H17M10 1L13 4M13 4L10 7M13 4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold">MyCars</span>
          </Link>

          {/* Navegación */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              Inicio
            </Link>
            <Link 
              href="/cars" 
              className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              Catálogo
            </Link>
            <Link 
              href="/brands" 
              className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium"
            >
              Marcas
            </Link>
            <button 
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Añadir Vehículo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 