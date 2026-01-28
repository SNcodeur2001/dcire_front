import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DirectorLayout from '../../components/layout/DirectorLayout';
import DirectorDataTable from '../../components/director/DirectorDataTable';
import Pagination from '../../components/ui/Pagination';
import { api } from '../../services';
// import type { DirectorMail } from '../../types';
import type { Courrier } from '../../types/api';

export default function SettledCouriers() {
  const navigate = useNavigate();
  const [courriers, setCourriers] = useState<Courrier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCourriers = async () => {
      try {
        // Fetch settled courriers
        const result = await api.courriers.getSettled();
        if (result.error) {
          setError(result.error);
        } else {
          setCourriers(result.data || []);
        }
      } catch (err) {
        setError('Erreur lors du chargement des courriers');
      } finally {
        setLoading(false);
      }
    };

    fetchCourriers();
  }, []);

  if (loading) {
    return (
      <DirectorLayout>
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des courriers soldés...</p>
        </div>
      </DirectorLayout>
    );
  }

  if (error) {
    return (
      <DirectorLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600">Erreur: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </DirectorLayout>
    );
  }

  if (courriers.length === 0) {
    return (
      <DirectorLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun courrier soldé
            </h3>
            <p className="text-gray-500">
              Aucun courrier n'a encore été traité et soldé par les porteurs.
            </p>
          </div>
        </div>
      </DirectorLayout>
    );
  }

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
              title="Liste des Courriers soldés"
              subtitle={`Votre mission principale : vérifier et valider les données extraites (${courriers.length} courriers)`}
              mails={courriers.map(c => ({
                id: c.id,
                reference: c.reference,
                sender: c.sender,
                subject: c.subject,
                receptionDate: c.receptionDate,
                status: 'soldé'
              }))}
              statusType="soldé"
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