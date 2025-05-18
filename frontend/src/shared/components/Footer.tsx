import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
           <Link href="/catalogo" className="hover:underline">
             Catálogo
           </Link>
           <Link href="/marcas" className="hover:underline">
             Marcas
           </Link>
           <Link href="/modelos" className="hover:underline">
             Modelos
           </Link>
           {/* Añadir enlaces a secciones legales o de contacto si existen */}
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/terminos" className="hover:underline">
             Términos
          </Link>
           <Link href="/privacidad" className="hover:underline">
             Privacidad
          </Link>
           <Link href="/contacto" className="hover:underline">
             Contacto
          </Link>
        </div>
        <p className="text-gray-400">
          © 2024 MyCars. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
} 