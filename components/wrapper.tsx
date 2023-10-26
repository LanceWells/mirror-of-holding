'use client';

import store from '@/lib/store/store';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';
import PageToolbar from './page-toolbar/page-toolbar';

export default function AppWrapper(props: React.PropsWithChildren<{}>) {
  const { children } = props;

  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}
