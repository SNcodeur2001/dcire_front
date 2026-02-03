import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PorteurLayout from '../../components/layout/PorteurLayout';
import { api } from '../../services';
import type { Courrier, Department } from '../../types/api';

export default function CourrierDetailConsultatif() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [courrier, setCourrier] = useState<Courrier | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [assignedDepartmentName, setAssignedDepartmentName] = useState<string>('');
  const [porteurName, setPorteurName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        // Fetch courrier details
        const courrierResult = await api.courriers.getById(id);
        if (courrierResult.error) {
          setError(courrierResult.error);
        } else {
          setCourrier(courrierResult.data || null);
        }

        // Fetch departments
        const { departmentService } = await import('../../services/departments/DepartmentService');
        const departmentsResult = await departmentService.getActive();
        if (departmentsResult.error) {
          console.error('Error fetching departments:', departmentsResult.error);
        } else {
          const depts = departmentsResult.data || [];
          setDepartments(depts);
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Set assigned department name when courrier or departments change
  useEffect(() => {
    if (courrier && departments.length > 0 && courrier.assignedDepartmentId) {
      const assignedDept = departments.find(dept => dept.id === courrier.assignedDepartmentId);
      setAssignedDepartmentName(assignedDept ? assignedDept.name : 'Département inconnu');
    } else {
      setAssignedDepartmentName('');
    }
  }, [courrier, departments]);

  // Set porteur name
  useEffect(() => {
    if (courrier && courrier.assignedPorteurId) {
      setPorteurName(`Porteur ${courrier.assignedPorteurId}`);
    }
  }, [courrier]);

  if (loading) {
    return (
      <PorteurLayout>
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du courrier...</p>
        </div>
      </PorteurLayout>
    );
  }

  if (error || !courrier) {
    return (
      <PorteurLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600">{error || 'Courrier non trouvé'}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retour
            </button>
          </div>
        </div>
      </PorteurLayout>
    );
  }

  return (
    <PorteurLayout>
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity"
          >
            <img 
              src="/icons/arrow-back.svg" 
              alt="" 
              className="w-3 h-2.5"
              style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
            />
            <span 
              className="text-base font-normal"
              style={{ color: '#4b5563' }}
            >
              Retour
            </span>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <h1
              className="text-2xl font-bold"
              style={{ color: '#111827' }}
            >
              Détail du courrier
            </h1>
            <span
              className="text-2xl font-normal"
              style={{
                color: '#009390',
                lineHeight: '20px'
              }}
            >
              {courrier.priority === 'priority' ? 'courrier prioritaire' : 'courrier normal'}
            </span>
          </div>

          <p
            className="text-base font-normal"
            style={{ color: '#6b7280' }}
          >
            {courrier.reference}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations Section */}
            <div 
              className="bg-white rounded-xl border p-6"
              style={{ 
                borderColor: '#f3f4f6',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h2 
                className="text-base font-semibold mb-6"
                style={{ color: '#111827' }}
              >
                Informations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Référence */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Référence
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#111827' }}
                  >
                    {courrier.reference}
                  </p>
                </div>

                {/* Expéditeur */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Expéditeur
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#111827' }}
                  >
                    {courrier.sender}
                  </p>
                </div>

                {/* Département */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Département
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#111827' }}
                  >
                    {assignedDepartmentName || 'Non assigné'}
                  </p>
                </div>

                {/* Objet */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Objet
                  </p>
                  <p
                    className="text-base font-medium line-clamp-2"
                    style={{
                      color: '#111827',
                      lineHeight: '24px'
                    }}
                  >
                    {courrier.subject}
                  </p>
                </div>

                {/* Reçu le */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Reçu le
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#111827' }}
                  >
                    {courrier.receptionDate}
                  </p>
                </div>

                {/* Date enregistrement */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Date enregistrement
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#111827' }}
                  >
                    {new Date(courrier.registrationDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Section Statut et Assignation */}
            <div>
              <h2
                className="text-xl font-medium mb-6"
                style={{
                  color: '#374151',
                  lineHeight: '20px'
                }}
              >
                Statut et Assignation
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Statut du workflow */}
                <div>
                  <p
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Statut
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#111827' }}
                  >
                    {courrier.workflowStatus === 'pending' ? 'En attente' :
                     courrier.workflowStatus === 'assigned' ? 'Assigné' :
                     courrier.workflowStatus === 'in_progress' ? 'En cours' :
                     courrier.workflowStatus === 'settled' ? 'Soldé' : 'Inconnu'}
                  </p>
                </div>

                {/* Porteur assigné */}
                <div>
                  <p
                    className="text-sm font-normal mb-1"
                    style={{ color: '#4b5563' }}
                  >
                    Porteur assigné
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#111827' }}
                  >
                    {porteurName || 'Non assigné'}
                  </p>
                </div>

                {/* Date d'assignation */}
                {courrier.workflowStatus !== 'pending' && (
                  <div>
                    <p
                      className="text-sm font-normal mb-1"
                      style={{ color: '#4b5563' }}
                    >
                      Date d'assignation
                    </p>
                    <p
                      className="text-base font-medium"
                      style={{ color: '#111827' }}
                    >
                      {courrier.updatedAt ? new Date(courrier.updatedAt).toLocaleDateString('fr-FR') : 'N/A'}
                    </p>
                  </div>
                )}

                {/* Date de solde */}
                {courrier.workflowStatus === 'settled' && courrier.settledAt && (
                  <div>
                    <p
                      className="text-sm font-normal mb-1"
                      style={{ color: '#4b5563' }}
                    >
                      Date de solde
                    </p>
                    <p
                      className="text-base font-medium"
                      style={{ color: '#111827' }}
                    >
                      {new Date(courrier.settledAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Document PDF */}
          <div className="lg:col-span-1">
            <div>
              <div 
                className="flex items-center justify-between px-4 py-3 mb-4"
                style={{ backgroundColor: '#f9fafb' }}
              >
                <h3 
                  className="text-base font-semibold"
                  style={{ color: '#111827' }}
                >
                  Document PDF
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1 hover:opacity-70 transition-opacity"
                    aria-label="Télécharger"
                  >
                    <img 
                      src="/icons/download.svg" 
                      alt="Download"
                      className="w-3 h-3.5"
                      style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
                    />
                  </button>
                  <button 
                    className="p-1 hover:opacity-70 transition-opacity"
                    aria-label="Imprimer"
                  >
                    <img 
                      src="/icons/print.svg" 
                      alt="Print"
                      className="w-3.5 h-3.5"
                      style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
                    />
                  </button>
                </div>
              </div>

              <div 
                className="rounded-sm overflow-hidden"
                style={{ boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.10)' }}
              >
                <img 
                  src="/document-preview.jpg" 
                  alt="Document preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PorteurLayout>
  );
}
