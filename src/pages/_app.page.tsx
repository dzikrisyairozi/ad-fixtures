import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale || 'en'; 

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Asia/Taipei"
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
