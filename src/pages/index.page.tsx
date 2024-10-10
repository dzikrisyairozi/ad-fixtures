import Image from "next/image";
import localFont from "next/font/local";
import Seo from "@/components/Seo";
import Layout from "@/components/layout/Layout";
import { GetStaticProps } from "next";
import { useTranslations } from 'next-intl';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home({ messages, locale }: { messages: any, locale: string }) {
  const t = useTranslations('Index');

  return (
    <Layout messages={messages} locale={locale}>
      <Seo />
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/images/logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              {t('whyWorkWithUs')}
            </li>
            <li className="text-justify">{t('slogan')}</li>
          </ol>
      </main>
    </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const defaultLocale = 'en';
  const actualLocale = locale || defaultLocale;
  return {
    props: {
      messages: (await import(`../../messages/${actualLocale}.json`)).default,
      locale: actualLocale,
    }
  };
};