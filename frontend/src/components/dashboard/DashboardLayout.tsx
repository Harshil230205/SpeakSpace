
import { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16 pb-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
