import DepartmentLayout from '../../components/layout/DepartmentLayout';
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
    reference: 'CR-2024-002',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'priorité',
  },
  {
    id: '3',
    reference: 'CR-2024-003',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Non priorité',
  },
  {
    id: '4',
    reference: 'CR-2024-004',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Non priorité',
  },
];

export default function AllCouriers() {
  return (
    <DepartmentLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="mb-4">
          <h1 
            className="text-lg md:text-xl font-bold mb-1"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Tous les courriers
          </h1>
          <p 
            className="text-sm md:text-base font-normal"
            style={{ color: 'var(--color-gray-500)' }}
          >
            Liste complète des courriers reçus
          </p>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DirectorDataTable 
            title="Tous les courriers"
            subtitle="Consultez tous les courriers reçus par le département"
            mails={mockMails}
            statusType="priority"
          />
        </div>
      </div>
    </DepartmentLayout>
  );
}