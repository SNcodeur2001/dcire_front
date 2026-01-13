import DepartmentLayout from '../../components/layout/DepartmentLayout';
import DirectorDataTable from '../../components/director/DirectorDataTable';
import type { DirectorMail } from '../../types';

const mockMails: DirectorMail[] = [
  {
    id: '9',
    reference: 'CR-2024-009',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Soldé',
  },
  {
    id: '10',
    reference: 'CR-2024-010',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Soldé',
  },
  {
    id: '11',
    reference: 'CR-2024-011',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Soldé',
  },
  {
    id: '12',
    reference: 'CR-2024-012',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Soldé',
  },
];

export default function SettledCouriers() {
  return (
    <DepartmentLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="mb-4">
          <h1 
            className="text-lg md:text-xl font-bold mb-1"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Courriers Soldés
          </h1>
          <p 
            className="text-sm md:text-base font-normal"
            style={{ color: 'var(--color-gray-500)' }}
          >
            Historique des courriers traités et soldés
          </p>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DirectorDataTable 
            title="Courriers Soldés"
            subtitle="Consultez l'historique des courriers traités"
            mails={mockMails}
            statusType="soldé"
          />
        </div>
      </div>
    </DepartmentLayout>
  );
}