import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router'
import SonnerToaster from "@/components/SonnerToaster";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale || 'en'; 

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Asia/Taipei"
      messages={pageProps.messages}
    >
      <SonnerToaster />
      <Component {...pageProps} locale={locale}/>
    </NextIntlClientProvider>
  );
}
