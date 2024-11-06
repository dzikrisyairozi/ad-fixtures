/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';

import useDialogStore from '@/store/useDialogStore';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, locale }: { children: React.ReactNode, messages: any, locale: string }) {
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();

  return (
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
  );
}