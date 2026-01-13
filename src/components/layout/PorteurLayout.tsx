import type { ReactNode } from 'react';
import PorteurHeader from './PorteurHeader';
import PorteurSidebar from './PorteurSidebar';
import type { User } from '../../types';

interface PorteurLayoutProps {
  children: ReactNode;
}

const currentUser: User = {
  name: 'Pathe NDIAYE',
  role: 'ODC',
  avatar: '/avatar-user.jpg',
};

export default function PorteurLayout({ children }: PorteurLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-(--color-bg-light) flex flex-col">
      <PorteurHeader user={currentUser} />
      <div className="flex flex-1 overflow-hidden">
        <PorteurSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}