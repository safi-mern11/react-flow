'use client';

import dynamic from 'next/dynamic';

// Dynamically import the professional flow component to avoid SSR issues
const ProfessionalFlow = dynamic(
  () => import('./components/flow/ProfessionalFlow'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="w-full h-screen">
      <ProfessionalFlow />
    </main>
  );
}
