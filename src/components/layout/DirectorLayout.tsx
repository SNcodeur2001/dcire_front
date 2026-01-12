import type { ReactNode } from 'react';
import DirectorHeader from './DirectorHeader';
import DirectorSidebar from './DirectorSidebar';
import type { User } from '../../types';

interface DirectorLayoutProps {
  children: ReactNode;
}

const currentUser: User = {
  name: 'Ouseynou Sane',
  role: 'Directeur',
  avatar: '/avatar-user.jpg',
};

export default function DirectorLayout({ children }: DirectorLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-(--color-bg-light) flex flex-col">
      <DirectorHeader user={currentUser} />
      <div className="flex flex-1 overflow-hidden">
        <DirectorSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}