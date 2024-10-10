import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const defaultLocale = 'en';
  const actualLocale = locale || defaultLocale;
  return {
    messages: (await import(`../messages/${actualLocale}.json`)).default
  };
});