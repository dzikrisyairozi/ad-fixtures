/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';

import useDialogStore from '@/store/useDialogStore';
import Header from './Header';
import Footer from './Footer';
import { NextIntlClientProvider } from 'next-intl';

export default function Layout({ children, messages, locale }: { children: React.ReactNode, messages: any, locale: string }) {
    const open = useDialogStore.useOpen();
    const state = useDialogStore.useState();
    const handleClose = useDialogStore.useHandleClose();
    const handleSubmit = useDialogStore.useHandleSubmit();
  
    return (
      <NextIntlClientProvider messages={messages} locale={locale} key={locale}>
        <div>
          <Header locale={locale} />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BaseDialog
            onClose={handleClose}
            onSubmit={handleSubmit}
            open={open}
            options={state}
          />
        </div>
      </NextIntlClientProvider>
    );
  }