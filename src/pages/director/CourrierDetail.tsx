import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DirectorLayout from '../../components/layout/DirectorLayout';
import type { DirectorMail } from '../../types';

interface DepartmentOption {
  id: string;
  label: string;
  porteur: boolean;
  contributeur: boolean;
}

const mockMails: DirectorMail[] = [
  {
    id: '1',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique pour le développement numérique',
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

const porteurOptions = [
  'Mamadou Bachirou Diamé',
  'Ousmane Marra',
  'Mapathé Ndiaye',
  'Fallou Ndiaye'
];

export default function CourrierDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mail = mockMails.find(m => m.id === id);
  
  // Check user role - "Departement" shows dropdown, "Directeur" shows checkboxes
  const userRole = 'Directeur'; // This should come from auth context in production
  const isDepartement = userRole.toLowerCase() === 'departement';

  const [departments, setDepartments] = useState<DepartmentOption[]>([
    { id: 'odc', label: 'Orange Digital center', porteur: false, contributeur: false },
    { id: 'fes', label: 'FES', porteur: false, contributeur: false },
    { id: 'peren', label: 'PEREN', porteur: false, contributeur: false },
    { id: 'scide', label: 'SCIDE', porteur: false, contributeur: false },
  ]);

  const [selectedPorteur, setSelectedPorteur] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!mail) {
    return (
      <DirectorLayout>
        <div className="h-full flex items-center justify-center">
          <p>Courrier non trouvé</p>
        </div>
      </DirectorLayout>
    );
  }

  const handlePorteurChange = (id: string) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...dept, porteur: !dept.porteur } : dept
    ));
  };

  const handleContributeurChange = (id: string) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...dept, contributeur: !dept.contributeur } : dept
    ));
  };

  const handlePorteurSelect = (porteur: string) => {
    setSelectedPorteur(porteur);
    setIsDropdownOpen(false);
  };

  const handleImputer = () => {
    if (isDepartement && !selectedPorteur) {
      alert('Veuillez sélectionner un porteur');
      return;
    }
    console.log('Imputer courrier', isDepartement ? { porteur: selectedPorteur } : departments);
  };

  return (
    <DirectorLayout>
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
              courrier prioritaire
            </span>
          </div>
          
          <p
            className="text-base font-normal"
            style={{ color: '#6b7280' }}
          >
            {mail.reference}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Information & Département */}
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
                    {mail.reference}
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
                    {mail.sender}
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
                    Relations Extérieures
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
                    {mail.subject}
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
                    {mail.receptionDate}
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
                    20/01/2024
                  </p>
                </div>
              </div>
            </div>

            {/* Porteur Selection - Different UI based on role */}
            {isDepartement ? (
              /* Dropdown for Departement role */
              <div className="space-y-6">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-8 py-5 text-left border rounded-md flex items-center justify-between transition-colors hover:border-gray-400"
                    style={{
                      borderColor: '#bbb7b7',
                      backgroundColor: isDropdownOpen ? '#f9fafb' : '#ffffff'
                    }}
                  >
                    <span 
                      className="text-2xl font-normal"
                      style={{ 
                        color: selectedPorteur ? '#111827' : '#868686',
                        lineHeight: '24px'
                      }}
                    >
                      {selectedPorteur || 'Selectionnez un porteur'}
                    </span>
                    <img 
                      src="/icons/dropdown-arrow.svg" 
                      alt="" 
                      className="w-6 h-6 transition-transform"
                      style={{
                        filter: 'invert(85%) sepia(0%) saturate(0%) hue-rotate(168deg) brightness(96%) contrast(87%)',
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    />
                  </button>

                  {/* Dropdown Options */}
                  {isDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md overflow-hidden z-10"
                      style={{
                        borderColor: '#bbb7b7',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {porteurOptions.map((porteur, index) => (
                        <button
                          key={porteur}
                          onClick={() => handlePorteurSelect(porteur)}
                          className="w-full px-8 py-5 text-left transition-colors hover:bg-gray-50"
                          style={{
                            borderBottom: index < porteurOptions.length - 1 ? '1px solid #e5e7eb' : 'none'
                          }}
                        >
                          <span 
                            className="text-2xl font-normal"
                            style={{ 
                              color: '#757575',
                              lineHeight: '24px'
                            }}
                          >
                            {porteur}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Imputer Button */}
                <button
                  onClick={handleImputer}
                  className="px-8 py-3 text-white font-medium rounded-sm hover:opacity-90 transition-opacity"
                  style={{ 
                    backgroundColor: '#f97316',
                    fontSize: '16px'
                  }}
                >
                  Imputer le courrier
                </button>
              </div>
            ) : (
              /* Checkboxes for Directeur role */
              <div>
                <h2 
                  className="text-xl font-medium mb-6"
                  style={{ 
                    color: '#374151',
                    lineHeight: '20px'
                  }}
                >
                  Département
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Porteur Column */}
                  <div>
                    <h3 
                      className="text-base font-semibold mb-4 underline"
                      style={{ color: '#374151' }}
                    >
                      Porteur
                    </h3>
                    <div className="space-y-3">
                      {departments.map((dept) => (
                        <label 
                          key={`porteur-${dept.id}`}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={dept.porteur}
                            onChange={() => handlePorteurChange(dept.id)}
                            className="w-5 h-5 rounded border-2 cursor-pointer"
                            style={{
                              borderColor: '#9ca3af',
                              accentColor: '#374151'
                            }}
                          />
                          <span 
                            className="text-sm font-normal"
                            style={{ color: '#000000' }}
                          >
                            {dept.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contributeur Column */}
                  <div>
                    <h3 
                      className="text-base font-semibold mb-4 underline"
                      style={{ color: '#374151' }}
                    >
                      Contributeur
                    </h3>
                    <div className="space-y-3">
                      {departments.map((dept) => (
                        <label 
                          key={`contributeur-${dept.id}`}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={dept.contributeur}
                            onChange={() => handleContributeurChange(dept.id)}
                            className="w-5 h-5 rounded border-2 cursor-pointer"
                            style={{
                              borderColor: '#9ca3af',
                              accentColor: '#374151'
                            }}
                          />
                          <span 
                            className="text-sm font-normal"
                            style={{ color: '#000000' }}
                          >
                            {dept.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Imputer Button */}
                <button
                  onClick={handleImputer}
                  className="mt-6 px-8 py-3 text-white font-medium rounded-sm hover:opacity-90 transition-opacity"
                  style={{ 
                    backgroundColor: '#f97316',
                    fontSize: '16px'
                  }}
                >
                  Imputer le courrier
                </button>
              </div>
            )}
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
    </DirectorLayout>
  );
}