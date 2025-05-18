import Link from 'next/link';
import { HeroVideo } from '@/shared/components/HeroVideo';
import { BrandShowcase } from '@/shared/components/BrandShowcase';
import { TestimonialSection } from '@/shared/components/TestimonialSection';
import { ScrollAnimation } from '@/shared/components/ScrollAnimation';
import '@/styles/animations.css';

const FEATURED_BRANDS = [
  {
    name: 'Mercedes-Benz',
    logo: '/brands/mercedesbenz.png',
    description: 'Lujo y rendimiento alemán en su máxima expresión'
  },
  {
    name: 'BMW',
    logo: '/brands/bmw.png',
    description: 'El placer de conducir llevado al siguiente nivel'
  },
  {
    name: 'Audi',
    logo: '/brands/audi.png',
    description: 'A la vanguardia de la tecnología automotriz'
  },
  {
    name: 'Porsche',
    logo: '/brands/porsche.png',
    description: 'Deportividad y exclusividad sin compromisos'
  }
];

const TESTIMONIALS = [
  {
    name: 'Carlos Rodríguez',
    role: 'Empresario',
    image: '/testimonials/person1.jpg',
    comment: 'El servicio de MyCars superó todas mis expectativas. Encontré el coche de mis sueños a un precio inmejorable.',
    rating: 5
  },
  {
    name: 'Ana Martínez',
    role: 'Ejecutiva',
    image: '/testimonials/person2.jpg',
    comment: 'La atención personalizada y el conocimiento del equipo de ventas fue excepcional.',
    rating: 5
  },
  {
    name: 'Miguel Sánchez',
    role: 'Deportista',
    image: '/testimonials/person3.jpg',
    comment: 'Proceso de compra rápido y transparente. Muy satisfecho con mi nuevo vehículo.',
    rating: 4
  }
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Pantalla completa */}
      <section className="w-full h-screen relative">
        <HeroVideo
          videoUrl="/hero-video.mp4"
          title={<>Bienvenido a <span className="text-primary-400">MyCars</span></>}
          subtitle="Descubre nuestra exclusiva selección de vehículos de lujo"
        >
          <Link
            href="/cars"
            className="bg-white text-neutral-900 px-8 py-4 rounded-lg hover:bg-neutral-100 transition-all hover:scale-105"
          >
            Explorar Catálogo
          </Link>
          <Link
            href="/brands"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all hover:scale-105"
          >
            Ver Marcas
          </Link>
        </HeroVideo>
      </section>

      {/* Sección de Estadísticas */}
      <section className="w-full h-[500px] flex items-center justify-center relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("/stats-bg.jpg")' }}>
        <div className="absolute inset-0 bg-black/75" />
        <div className="w-full">
          <ScrollAnimation>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  <ScrollAnimation delay={200}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-[180px] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div className="text-5xl md:text-6xl font-bold text-white text-center mb-4">500+</div>
                      <div className="text-lg text-white/90 font-medium text-center">Vehículos en Stock</div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation delay={400}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-[180px] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div className="text-5xl md:text-6xl font-bold text-white text-center mb-4">50+</div>
                      <div className="text-lg text-white/90 font-medium text-center">Marcas Premium</div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation delay={600}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-[180px] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div className="text-5xl md:text-6xl font-bold text-white text-center mb-4">1000+</div>
                      <div className="text-lg text-white/90 font-medium text-center">Clientes Satisfechos</div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation delay={800}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-[180px] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div className="text-5xl md:text-6xl font-bold text-white text-center mb-4">24/7</div>
                      <div className="text-lg text-white/90 font-medium text-center">Soporte al Cliente</div>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Sección de Marcas */}
      <section className="w-full py-16 bg-white">
        <ScrollAnimation>
          <BrandShowcase brands={FEATURED_BRANDS} />
        </ScrollAnimation>
      </section>

      {/* Sección de Características */}
      <section className="w-full py-12 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Una Experiencia Premium
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollAnimation delay={200}>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Búsqueda Inteligente</h3>
                <p className="text-neutral-600">
                  Nuestro avanzado sistema de búsqueda te ayuda a encontrar el vehículo perfecto según tus preferencias y necesidades.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Garantía Premium</h3>
                <p className="text-neutral-600">
                  Todos nuestros vehículos pasan por exhaustivas inspecciones y cuentan con garantía extendida.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Financiación Flexible</h3>
                <p className="text-neutral-600">
                  Ofrecemos planes de financiación personalizados y las mejores tasas del mercado.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="w-full py-16 flex items-center">
        <ScrollAnimation>
          <TestimonialSection testimonials={TESTIMONIALS} />
        </ScrollAnimation>
      </section>

      {/* Sección de Vehículos Destacados */}
      <section className="w-full h-[400px] flex items-center relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("/featured-bg.jpg")' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Vehículos Destacados
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Descubre nuestra selección de vehículos premium cuidadosamente elegidos para ti
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Aquí irán los CarCard con ScrollAnimation */}
          </div>
          <ScrollAnimation delay={400}>
            <div className="text-center mt-16">
              <Link
                href="/cars"
                className="inline-flex items-center space-x-3 bg-white text-neutral-900 px-8 py-4 rounded-lg hover:bg-neutral-100 transition-all hover:scale-105 font-semibold"
              >
                <span>Ver todos los vehículos</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Sección de CTA Final */}
      <section className="w-full py-24 flex items-center justify-center bg-white">
        <ScrollAnimation>
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-900">
              ¿Listo para encontrar tu próximo vehículo de lujo?
            </h2>
            <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto">
              Nuestro equipo de expertos está disponible para ayudarte a encontrar el vehículo perfecto que se ajuste a tu estilo de vida.
            </p>
            <div className="flex justify-center items-center space-x-6">
              <Link
                href="/contact"
                className="bg-neutral-900 text-white px-8 py-4 rounded-lg hover:bg-neutral-800 transition-all hover:scale-105 font-semibold shadow-lg"
              >
                Contactar Ahora
              </Link>
              <Link
                href="/cars"
                className="bg-neutral-100 text-neutral-900 px-8 py-4 rounded-lg hover:bg-neutral-200 transition-all hover:scale-105 font-semibold border border-neutral-200"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}
