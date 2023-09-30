import './globals.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Inter } from 'next/font/google';
import AppWrapper from '@/components/wrapper';

export const metadata = {
  title: 'Vercel Postgres Demo with Prisma',
  description:
    'A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM',
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
