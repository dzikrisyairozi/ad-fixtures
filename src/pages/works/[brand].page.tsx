import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { brands } from '../landing/sections/WorksPortofolio';
import GridBackground from '../landing/components/GridBackground';

interface BrandPageProps {
    brand: typeof brands[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: Record<string, any>;
    locale: string;
  }

  export default function BrandPage({ brand, messages, locale }: BrandPageProps) {
    const t = useTranslations('WorksPortfolio');
  
    return (
      <Layout messages={messages} locale={locale}>
        <Seo 
          title={`${brand.name} - AD Fixtures`}
          description={t(brand.descriptionKey)}
        />
        
        <main className="relative min-h-screen">
          <GridBackground  />
          
          {/* Header Section */}
          <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">{brand.name}</h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  {t(brand.descriptionKey)}
                </p>
              </motion.div>
            </div>
          </div>
  
          {/* Gallery Section */}
          <div className="w-full px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {brand.images.map((image, index) => ( 
                <motion.div
                  key={image}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
                >
                  <Image
                    src={image}
                    alt={`${brand.name} project ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105"
                    priority={index < 4} // Prioritize loading first four images
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                              opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
  
          {/* Bottom Spacing */}
          <div className="h-20" />
        </main>
      </Layout>
    );
  }

export const getStaticPaths: GetStaticPaths = async ({ locales = ['en'] }) => {
  // Generate paths for all brands in all supported locales
  const paths = brands.flatMap((brand) =>
    locales.map((locale) => ({
      params: { brand: brand.id },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const brand = brands.find((b) => b.id === params?.brand);
  const defaultLocale = 'en';
  const actualLocale = locale || defaultLocale;

  if (!brand) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brand,
      messages: (await import(`../../../messages/${actualLocale}.json`)).default,
      locale: actualLocale,
    },
  };
};