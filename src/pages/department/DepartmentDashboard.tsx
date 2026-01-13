import DepartmentLayout from '../../components/layout/DepartmentLayout';
import DirectorStatsCard from '../../components/ui/DirectorStatsCard';
import DirectorDataTable from '../../components/director/DirectorDataTable';
import type { DirectorMail } from '../../types';

const mockMails: DirectorMail[] = [
  {
    id: '1',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'priorité',
  },
  {
    id: '2',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'priorité',
  },
  {
    id: '3',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Non priorité',
  },
  {
    id: '4',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Non priorité',
  },
];

export default function DepartmentDashboard() {
  return (
    <DepartmentLayout>
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
              Bienvenue, Fallou NDIAYE
            </p>
          </div>
          
          <button
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white font-medium rounded-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Toutes les Courriers
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-4 shrink-0">
          <DirectorStatsCard
            title="Total du Moi"
            value="104"
            icon="/icons/mail-blue.svg"
            iconBgColor="#3B82F6"
            trend={{ value: '+12%', direction: 'up', label: 'vs hier' }}
          />
          <DirectorStatsCard
            title="Total du jour"
            value="04"
            icon="/icons/mail-blue.svg"
            iconBgColor="#3B82F6"
            trend={{ value: '+12%', direction: 'up', label: 'vs hier' }}
          />
          <DirectorStatsCard
            title="Courriers imputés"
            value="01"
            icon="/icons/check-circle-green.svg"
            iconBgColor="#16A34A"
            trend={{ value: '+8%', direction: 'up', label: 'vs hier' }}
          />
          <DirectorStatsCard
            title="En attente"
            value="03"
            icon="/icons/clock-orange.svg"
            iconBgColor="#F97316"
            trend={{ value: '-3%', direction: 'down', label: 'vs hier' }}
          />
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DirectorDataTable 
            title="Liste des Courriers à imputés"
            subtitle="Votre mission principale : vérifier et valider les données extraites"
            mails={mockMails}
            statusType="priority"
          />
        </div>
      </div>
    </DepartmentLayout>
  );
}