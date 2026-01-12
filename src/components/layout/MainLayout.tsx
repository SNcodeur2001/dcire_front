import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import type { User } from '../../types';

interface MainLayoutProps {
  children: ReactNode;
}

const currentUser: User = {
  name: 'Fatou Diop',
  role: 'assistante',
  avatar: '/avatar-user.jpg',
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-(--color-bg-light) flex flex-col">
      <Header user={currentUser} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}