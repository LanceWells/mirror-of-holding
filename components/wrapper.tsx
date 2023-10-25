'use client';

import store from '@/lib/store/store';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';
import PageToolbar from './page-toolbar/page-toolbar';
import PixiOverlay from './pixi-overlay-native/pixi-overlay-native';

export default function AppWrapper(props: React.PropsWithChildren<{}>) {
  const { children } = props;

  return (
    <SessionProvider>
      <Provider store={store}>
        <PixiOverlay />
        <PageToolbar />
        {children}
      </Provider>
    </SessionProvider>
  );
}
