import type { ReactNode } from 'react';
import DepartmentHeader from './DepartmentHeader';
import DepartmentSidebar from './DepartmentSidebar';
import type { User } from '../../types';

interface DepartmentLayoutProps {
  children: ReactNode;
}

const currentUser: User = {
  name: 'Fallou NDIAYE',
  role: 'Directeur',
  avatar: '/avatar-user.jpg',
};

export default function DepartmentLayout({ children }: DepartmentLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-(--color-bg-light) flex flex-col">
      <DepartmentHeader user={currentUser} />
      <div className="flex flex-1 overflow-hidden">
        <DepartmentSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}