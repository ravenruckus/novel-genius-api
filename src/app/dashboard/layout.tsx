import type { Metadata } from 'next';
import '@/app/globals.css';
import Nav from '@/components/dashboard/nav';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Content creation',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>{children}</Nav>
    </>
  );
}
