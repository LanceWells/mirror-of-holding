import './globals.css';
import { Inter } from 'next/font/google';
import AppWrapper from '@/components/wrapper';

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
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
