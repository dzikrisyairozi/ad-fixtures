import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const languages = [
    { code: "en", flag: "/images/flags/en.png" },
    { code: "zh", flag: "/images/flags/zh.png" },
    { code: "ja", flag: "/images/flags/jp.png" },
];

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const router = useRouter();
  const { locale, asPath } = router;

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <Link key={lang.code} href={asPath} locale={lang.code}>
          <Image
            src={lang.flag}
            alt={t('switchLocale', { locale: lang.code })}
            width={24}
            height={16}
            className={locale === lang.code ? 'opacity-100' : 'opacity-50'}
          />
        </Link>
      ))}
    </div>
  );
}