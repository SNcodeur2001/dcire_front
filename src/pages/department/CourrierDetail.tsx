import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DepartmentLayout from '../../components/layout/DepartmentLayout';
import type { DirectorMail } from '../../types';

const mockMails: DirectorMail[] = [
  {
    id: '1',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique pour le développement numérique',
    receptionDate: '15/01/2024',
    status: 'priorité',
  },
];

const porteurOptions = [
  'Mamadou Bachirou Diamé',
  'Ousmane Marra',
  'Mapathé Ndiaye',
];

export default function CourrierDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mail = mockMails.find(m => m.id === id) || mockMails[0];

  const [selectedPorteur, setSelectedPorteur] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleImputer = () => {
    console.log('Imputer courrier avec porteur:', selectedPorteur);
  };

  return (
    <DepartmentLayout>
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-(--color-gray-50) rounded-sm transition-colors mb-4"
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

          <div className="flex items-center gap-4 mb-2">
            <h1 
              className="text-lg md:text-2xl font-bold"
              style={{ color: 'var(--color-gray-900)' }}
            >
              Détail du courrier
            </h1>
            <span 
              className="text-lg md:text-2xl font-normal"
              style={{ 
                color: '#009390',
                lineHeight: '20px'
              }}
            >
              courrier prioritaire
            </span>
          </div>
          
          <p
            className="text-sm md:text-base font-normal"
            style={{ color: 'var(--color-gray-500)' }}
          >
            {mail.reference}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Information & Porteur Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations Section */}
            <div 
              className="bg-white rounded-md border border-(--color-gray-100) p-4 md:p-6"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <h2 
                className="text-base font-semibold mb-6"
                style={{ color: 'var(--color-gray-900)' }}
              >
                Informations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Référence */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    Référence
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: 'var(--color-gray-900)' }}
                  >
                    {mail.reference}
                  </p>
                </div>

                {/* Expéditeur */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    Expéditeur
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: 'var(--color-gray-900)' }}
                  >
                    {mail.sender}
                  </p>
                </div>

                {/* Département */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    Département
                  </p>
                  <p 
                    className="text-base font-medium"
                    style={{ color: 'var(--color-gray-900)' }}
                  >
                    Relations Extérieures
                  </p>
                </div>

                {/* Objet */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    Objet
                  </p>
                  <p
                    className="text-base font-medium line-clamp-2"
                    style={{
                      color: 'var(--color-gray-900)',
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
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    Reçu le
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: 'var(--color-gray-900)' }}
                  >
                    {mail.receptionDate}
                  </p>
                </div>

                {/* Date enregistrement */}
                <div>
                  <p 
                    className="text-sm font-normal mb-1"
                    style={{ color: 'var(--color-gray-600)' }}
                  >
                    Date enregistrement
                  </p>
                  <p 
                    className="text-base font-medium"
                    style={{ color: 'var(--color-gray-900)' }}
                  >
                    20/01/2024
                  </p>
                </div>
              </div>
            </div>

            {/* Porteur Selection Dropdown */}
            <div>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-white border rounded-sm transition-colors"
                  style={{ 
                    borderColor: '#bbb7b7',
                    borderRadius: '5px'
                  }}
                >
                  <span 
                    className="text-lg md:text-2xl font-normal"
                    style={{ 
                      color: selectedPorteur ? 'var(--color-gray-700)' : '#868686',
                      lineHeight: '24px',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  >
                    {selectedPorteur || 'Selectionnez un porteur'}
                  </span>
                  <img 
                    src="/icons/dropdown-arrow.svg" 
                    alt=""
                    className="w-6 h-6"
                    style={{
                      filter: 'invert(85%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(85%)',
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-sm shadow-lg z-10"
                    style={{ borderColor: '#bbb7b7' }}
                  >
                    {porteurOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedPorteur(option);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-4 hover:bg-(--color-gray-50) transition-colors border-b last:border-b-0"
                        style={{ 
                          borderColor: '#f3f4f6'
                        }}
                      >
                        <span 
                          className="text-lg md:text-2xl font-normal"
                          style={{ 
                            color: '#757575',
                            lineHeight: '24px',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '24px'
                          }}
                        >
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Imputer Button */}
              <button
                onClick={handleImputer}
                disabled={!selectedPorteur}
                className="mt-6 px-8 py-3 text-white font-medium rounded-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  fontSize: '16px'
                }}
              >
                Imputer le courrier
              </button>
            </div>
          </div>

          {/* Right Column - Document PDF */}
          <div className="lg:col-span-1">
            <div>
              <div 
                className="flex items-center justify-between px-4 py-3 mb-4"
                style={{ backgroundColor: 'var(--color-gray-50)' }}
              >
                <h3 
                  className="text-base font-semibold"
                  style={{ color: 'var(--color-gray-900)' }}
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
                      className="w-3 h-3"
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
                      className="w-3 h-3"
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
    </DepartmentLayout>
  );
}