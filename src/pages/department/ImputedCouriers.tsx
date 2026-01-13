import DepartmentLayout from '../../components/layout/DepartmentLayout';
import DirectorDataTable from '../../components/director/DirectorDataTable';
import type { DirectorMail } from '../../types';

const mockMails: DirectorMail[] = [
  {
    id: '5',
    reference: 'CR-2024-005',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'imputé',
    duration: '10 jours',
  },
  {
    id: '6',
    reference: 'CR-2024-006',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'imputé',
    duration: '7 jours',
  },
  {
    id: '7',
    reference: 'CR-2024-007',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'imputé',
    duration: '5 jours',
  },
  {
    id: '8',
    reference: 'CR-2024-008',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'imputé',
    duration: '3 jours',
  },
];

export default function ImputedCouriers() {
  return (
    <DepartmentLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="mb-4">
          <h1 
            className="text-lg md:text-xl font-bold mb-1"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Courriers Imputés
          </h1>
          <p 
            className="text-sm md:text-base font-normal"
            style={{ color: 'var(--color-gray-500)' }}
          >
            Courriers assignés en cours de traitement
          </p>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DirectorDataTable 
            title="Courriers Imputés"
            subtitle="Suivez l'état d'avancement des courriers assignés"
            mails={mockMails}
            statusType="imputed"
          />
        </div>
      </div>
    </DepartmentLayout>
  );
}