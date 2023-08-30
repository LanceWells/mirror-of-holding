import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Table from '@/components/table';
import TablePlaceholder from '@/components/table-placeholder';
import AppWrapper from './wrapper';
import PartGrid from '@/components/part-grid';

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <AppWrapper>
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <Suspense fallback={<TablePlaceholder />}>
          <Table />
          <PartGrid />
        </Suspense>
        <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
          <Link
            href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
            className="flex items-center space-x-2"
          >
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              priority
            />
            <p className="font-light">Source</p>
          </Link>
        </div>
      </main>
    </AppWrapper>
  );
}
