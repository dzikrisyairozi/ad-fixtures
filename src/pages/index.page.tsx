// import Image from "next/image";
// import localFont from "next/font/local";
import Seo from "@/components/Seo";
import Layout from "@/components/layout/Layout";
import { GetStaticProps } from "next";
import Hero from "./landing/sections/Hero";
import About from "./landing/sections/About";
// import { useTranslations } from 'next-intl';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home({ messages, locale }: { messages: any, locale: string }) {
  // const t = useTranslations('Index');

  return (
    <Layout messages={messages} locale={locale}>
      <Seo />
      <main>
        <Hero />
        <About />
      </main>
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