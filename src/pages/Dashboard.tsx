import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import StatsCard from '../components/ui/StatsCard';
import DataTable from '../components/dashboard/DataTable';
import Button from '../components/ui/Button';
import type { Mail } from '../types';

const stats = {
  totalMonth: 104,
  totalDay: 4,
  processed: 1,
};

const mockMails: Mail[] = [
  {
    id: '1',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
  },
  {
    id: '2',
    reference: 'CR-2024-002',
    sender: 'ARTP',
    subject: 'Rapport trimestriel Q4 2023',
    receptionDate: '15/01/2024',
  },
  {
    id: '3',
    reference: 'CR-2024-002',
    sender: 'ARTP',
    subject: 'Rapport trimestriel Q4 2023',
    receptionDate: '15/01/2024',
  },
  {
    id: '4',
    reference: 'CR-2024-002',
    sender: 'ARTP',
    subject: 'Rapport trimestriel Q4 2023',
    receptionDate: '15/01/2024',
  },
  {
    id: '5',
    reference: 'CR-2024-002',
    sender: 'ARTP',
    subject: 'Rapport trimestriel Q4 2023',
    receptionDate: '15/01/2024',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 shrink-0">
          <div>
            <h1 
              className="text-lg md:text-xl font-bold mb-1"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Tableau de bord
          </h1>
          <p 
            className="text-sm md:text-base font-normal"
            style={{ color: 'var(--color-gray-500)' }}
          >
            Bienvenue, Fatou Diop
          </p>
        </div>
        
          <Button 
            variant="primary"
            icon="/icons/plus.svg"
            onClick={() => navigate('/nouveau-courrier')}
            className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
          >
            <span className="hidden sm:inline">Nouveau Courrier</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 mb-4 shrink-0">
        <StatsCard
          title="Total du Moi"
          value={stats.totalMonth}
          icon="/icons/mail-blue.svg"
          iconBgColor="#3B82F6"
        />
        <StatsCard
          title="Total du jour"
          value={String(stats.totalDay).padStart(2, '0')}
          icon="/icons/mail-blue.svg"
          iconBgColor="#3B82F6"
        />
        <StatsCard
          title="Courriers Traiter"
          value={String(stats.processed).padStart(2, '0')}
          icon="/icons/check-green.svg"
          iconBgColor="#10B981"
        />
      </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DataTable mails={mockMails} />
        </div>
      </div>
    </MainLayout>
  );
}