import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DirectorLayout from '../../components/layout/DirectorLayout';
import DirectorDataTable from '../../components/director/DirectorDataTable';
import Pagination from '../../components/ui/Pagination';
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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <DirectorLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <button
            onClick={() => navigate('/directeur/tableau-de-bord')}
            className="flex items-center gap-2 px-3 py-2 hover:bg-(--color-gray-50) rounded-sm transition-colors"
          >
            <img 
              src="/icons/arrow-back.svg" 
              alt="" 
              className="w-2.5 h-2.5"
              style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
            />
            <span 
              className="text-sm md:text-base font-normal"
              style={{ color: 'var(--color-gray-600)' }}
            >
              Retour
            </span>
          </button>
          
          <button
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white font-medium rounded-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Tableau de Bord
          </button>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0">
            <DirectorDataTable 
              title="Liste des Couriers à imputer"
              subtitle="Votre mission principale : vérifier et valider les données extraites"
              mails={mockMails}
              statusType="priority"
            />
          </div>
          
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </DirectorLayout>
  );
}