import './globals.css';
import { Inter } from 'next/font/google';
import AppWrapper from '@/components/wrapper';
import PageToolbar from '@/components/page-toolbar/page-toolbar';
import clsx from 'clsx';

export const metadata = {
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AppWrapper>
          <div className={clsx(
            'h-[100dvh]',
            'grid grid-rows-[min-content_1fr]'
          )}>
            <PageToolbar />
            {children}
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
