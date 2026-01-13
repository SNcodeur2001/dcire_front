import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PorteurLayout from '../../components/layout/PorteurLayout';
import Modal from '../../components/ui/Modal';
import FormReponsePositive from '../../components/porteur/FormReponsePositive';
import FormReponseNegative from '../../components/porteur/FormReponseNegative';
import FormReponseInformation from '../../components/porteur/FormReponseInformation';
import FormBEVersAutreBU from '../../components/porteur/FormBEVersAutreBU';

export default function CourrierDetail() {
  const navigate = useNavigate();
  const [selectedQualification, setSelectedQualification] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const qualificationOptions = [
    'Réponse positive',
    'Réponse négative',
    'Réponse à une information',
    'BE vers autre BU',
    'Classé',
  ];

  const handleQualificationChange = (option: string) => {
    setSelectedQualification(option);
    if (option !== 'Classé') {
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setIsModalOpen(false);
    // Here you would handle the actual submission
    alert('Courrier soldé avec succès!');
    navigate('/porteur/courriers-a-solder');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedQualification('');
  };

  const getModalTitle = () => {
    switch (selectedQualification) {
      case 'Réponse positive':
        return 'Réponse Positive';
      case 'Réponse négative':
        return 'Réponse Négative';
      case 'Réponse à une information':
        return 'Réponse à une Information';
      case 'BE vers autre BU':
        return 'BE vers AUTRE BU';
      default:
        return '';
    }
  };

  const renderForm = () => {
    switch (selectedQualification) {
      case 'Réponse positive':
        return <FormReponsePositive onSubmit={handleFormSubmit} onCancel={handleModalClose} />;
      case 'Réponse négative':
        return <FormReponseNegative onSubmit={handleFormSubmit} onCancel={handleModalClose} />;
      case 'Réponse à une information':
        return <FormReponseInformation onSubmit={handleFormSubmit} onCancel={handleModalClose} />;
      case 'BE vers autre BU':
        return <FormBEVersAutreBU onSubmit={handleFormSubmit} onCancel={handleModalClose} />;
      default:
        return null;
    }
  };

  return (
    <PorteurLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 shrink-0">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm md:text-base font-normal mb-3"
              style={{ color: 'var(--color-gray-600)' }}
            >
              <img 
                src="/icons/arrow-left.svg" 
                alt="" 
                className="w-2.5 h-2.5"
                style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
              />
              Retour
            </button>
            
            <div className="flex items-center gap-3 flex-wrap">
              <h1 
                className="text-lg md:text-xl lg:text-2xl font-bold"
                style={{ color: 'var(--color-gray-900)' }}
              >
                Détail du courrier
              </h1>
              <span 
                className="text-lg md:text-xl lg:text-2xl font-normal"
                style={{ color: '#009390' }}
              >
                courrier prioritaire
              </span>
            </div>
            <p 
              className="text-sm md:text-base font-normal mt-1"
              style={{ color: 'var(--color-gray-500)' }}
            >
              CR-2024-001
            </p>
          </div>
          
          <button
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white font-medium rounded-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Tableau de Bord
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 flex-1 min-h-0">
          {/* Left Column - PDF Viewer */}
          <div className="flex flex-col min-h-0">
            <div 
              className="bg-(--color-gray-50) rounded-sm p-3 md:p-4 mb-3 flex items-center justify-between"
            >
              <span 
                className="text-sm md:text-base font-semibold"
                style={{ color: 'var(--color-gray-900)' }}
              >
                Document PDF
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:opacity-70 transition-opacity">
                  <img 
                    src="/icons/download.svg" 
                    alt="Download" 
                    className="w-3 h-3"
                    style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
                  />
                </button>
                <button className="p-1.5 hover:opacity-70 transition-opacity">
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
              className="flex-1 bg-white rounded-sm overflow-hidden min-h-0"
              style={{ boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.10)' }}
            >
              {/* PDF Preview Placeholder */}
              <div className="w-full h-full bg-(--color-gray-100) flex items-center justify-center">
                <p className="text-sm" style={{ color: 'var(--color-gray-500)' }}>
                  PDF Viewer
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Info + Actions */}
          <div className="flex flex-col gap-4 min-h-0 overflow-y-auto">
            {/* Information Panel */}
            <div 
              className="bg-white rounded-md border border-(--color-gray-100) p-4 md:p-6"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 
                className="text-base md:text-lg font-semibold mb-4"
                style={{ color: 'var(--color-gray-900)' }}
              >
                Informations
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs md:text-sm font-normal mb-1" style={{ color: 'var(--color-gray-600)' }}>
                    Référence
                  </p>
                  <p className="text-sm md:text-base font-medium" style={{ color: 'var(--color-gray-900)' }}>
                    CR-2024-001
                  </p>
                </div>

                <div>
                  <p className="text-xs md:text-sm font-normal mb-1" style={{ color: 'var(--color-gray-600)' }}>
                    Expéditeur
                  </p>
                  <p className="text-sm md:text-base font-medium" style={{ color: 'var(--color-gray-900)' }}>
                    Ministère des Finances
                  </p>
                </div>

                <div>
                  <p className="text-xs md:text-sm font-normal mb-1" style={{ color: 'var(--color-gray-600)' }}>
                    Objet
                  </p>
                  <p className="text-sm md:text-base font-medium line-clamp-2" style={{ color: 'var(--color-gray-900)' }}>
                    Demande de partenariat stratégique pour le développement numérique
                  </p>
                </div>

                <div>
                  <p className="text-xs md:text-sm font-normal mb-1" style={{ color: 'var(--color-gray-600)' }}>
                    Département
                  </p>
                  <p className="text-sm md:text-base font-medium" style={{ color: 'var(--color-gray-900)' }}>
                    Relations Extérieures
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs md:text-sm font-normal mb-1" style={{ color: 'var(--color-gray-600)' }}>
                      Reçu le
                    </p>
                    <p className="text-sm md:text-base font-medium" style={{ color: 'var(--color-gray-900)' }}>
                      15/01/2024
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-normal mb-1" style={{ color: 'var(--color-gray-600)' }}>
                      Deadline
                    </p>
                    <p className="text-sm md:text-base font-medium" style={{ color: 'var(--color-gray-900)' }}>
                      20/01/2024
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs md:text-sm font-normal mb-1" style={{ color: 'var(--color-gray-600)' }}>
                    Priorité
                  </p>
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded inline-block"
                    style={{ color: '#b91c1c', backgroundColor: '#fee2e2' }}
                  >
                    Haute
                  </span>
                </div>
              </div>
            </div>

            {/* Action Tracking */}
            <div 
              className="bg-white rounded-md border border-(--color-gray-100) p-4 md:p-6"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 
                className="text-base md:text-lg font-semibold mb-4"
                style={{ color: 'var(--color-gray-900)' }}
              >
                Suivi des actions
              </h3>

              <div className="space-y-4">
                {/* Timeline Item 1 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                    <div className="w-0.5 flex-1 bg-(--color-gray-200) min-h-8" />
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--color-gray-900)' }}>
                      Date d'assignation
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-gray-400)' }}>
                      15/01/2024 09:30
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                    <div className="w-0.5 flex-1 bg-(--color-gray-200) min-h-8" />
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--color-gray-900)' }}>
                      Imputé à Moussa Sow
                    </p>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--color-gray-500)' }}>
                      Fatou Diop (Assistante)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-gray-400)' }}>
                      15/01/2024 10:15
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--color-gray-900)' }}>
                      Statut changé: En cours
                    </p>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--color-gray-500)' }}>
                      Moussa Sow (Porteur)
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-gray-400)' }}>
                      15/01/2024 14:20
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification Form */}
            <div 
              className="bg-white rounded-md border p-4 md:p-6"
              style={{ borderColor: 'rgba(0, 0, 0, 0.10)' }}
            >
              <h3 
                className="text-base md:text-lg font-semibold mb-4"
                style={{ color: 'var(--color-gray-900)' }}
              >
                Qualification Réponse
              </h3>

              <div className="space-y-3">
                {qualificationOptions.map((option) => (
                  <label 
                    key={option}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="qualification"
                        value={option}
                        checked={selectedQualification === option}
                        onChange={(e) => handleQualificationChange(e.target.value)}
                        className="sr-only"
                      />
                      <div 
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                        style={{ 
                          borderColor: 'var(--color-gray-600)',
                          backgroundColor: selectedQualification === option ? 'var(--color-primary)' : 'transparent'
                        }}
                      >
                        {selectedQualification === option && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <span 
                      className="text-sm md:text-base font-semibold"
                      style={{ color: '#000000' }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => {
                  if (selectedQualification === 'Classé') {
                    alert('Courrier classé avec succès!');
                    navigate('/porteur/courriers-a-solder');
                  } else if (selectedQualification) {
                    setIsModalOpen(true);
                  } else {
                    alert('Veuillez sélectionner une qualification');
                  }
                }}
                disabled={!selectedQualification}
                className="w-full mt-6 px-6 py-3 text-base text-white font-medium rounded-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Solder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={getModalTitle()}
      >
        {renderForm()}
      </Modal>
    </PorteurLayout>
  );
}