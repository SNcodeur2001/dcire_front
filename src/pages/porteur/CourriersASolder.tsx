import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PorteurLayout from '../../components/layout/PorteurLayout';
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

export default function CourriersASolder() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(2);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const totalPages = 3;

  return (
    <PorteurLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm md:text-base font-normal"
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
          
          <button
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white font-medium rounded-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Tableau de Bord
          </button>
        </div>

        {/* Data Table */}
        <div 
          className="flex-1 min-h-0 bg-white rounded-md border border-(--color-gray-100) overflow-hidden flex flex-col"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          {/* Header */}
          <div className="px-3 md:px-4 lg:px-6 py-3 md:py-4 shrink-0">
            <h2 
              className="text-base md:text-lg lg:text-xl font-bold mb-0.5"
              style={{ color: 'var(--color-gray-900)' }}
            >
              Liste des Couriers à Solder
            </h2>
            <p 
              className="text-xs md:text-sm font-normal"
              style={{ color: 'var(--color-gray-600)' }}
            >
              Votre mission principale : vérifier et valider les données extraites
            </p>
          </div>

          {/* Search Bar */}
          <div className="px-3 md:px-4 lg:px-6 pb-3 md:pb-4 shrink-0">
            <div 
              className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 rounded-full border"
              style={{ borderColor: '#d1d1d1' }}
            >
              <input
                type="text"
                placeholder="Rechercher un courrier"
                className="flex-1 outline-none text-sm md:text-base"
                style={{ 
                  color: '#989898',
                  fontFamily: 'Roboto, sans-serif'
                }}
              />
              <img 
                src="/icons/search.svg" 
                alt="Search"
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead style={{ backgroundColor: 'var(--color-gray-50)' }} className="sticky top-0">
                <tr>
                  <th 
                    className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase"
                    style={{ 
                      color: 'var(--color-gray-600)',
                      letterSpacing: '0.60px'
                    }}
                  >
                    Référence
                  </th>
                  <th 
                    className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase hidden md:table-cell"
                    style={{ 
                      color: 'var(--color-gray-600)',
                      letterSpacing: '0.60px'
                    }}
                  >
                    Expéditeur
                  </th>
                  <th 
                    className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase"
                    style={{ 
                      color: 'var(--color-gray-600)',
                      letterSpacing: '0.60px'
                    }}
                  >
                    Objet
                  </th>
                  <th 
                    className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase hidden lg:table-cell"
                    style={{ 
                      color: 'var(--color-gray-600)',
                      letterSpacing: '0.60px',
                      lineHeight: '16px'
                    }}
                  >
                    Date de réception
                  </th>
                  <th 
                    className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase"
                    style={{ 
                      color: 'var(--color-gray-600)',
                      letterSpacing: '0.60px'
                    }}
                  >
                    Etat
                  </th>
                  <th 
                    className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase"
                    style={{ 
                      color: 'var(--color-gray-600)',
                      letterSpacing: '0.60px'
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockMails.map((mail, index) => (
                  <tr 
                    key={mail.id}
                    className={index > 0 ? 'border-t border-(--color-gray-100)' : ''}
                  >
                    <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4">
                      <span 
                        className="text-xs md:text-sm lg:text-base font-semibold"
                        style={{ 
                          color: 'var(--color-gray-900)',
                          lineHeight: '1.5'
                        }}
                      >
                        {mail.reference}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 hidden md:table-cell">
                      <span 
                        className="text-xs md:text-sm lg:text-base font-normal line-clamp-2"
                        style={{ 
                          color: 'var(--color-gray-700)',
                          lineHeight: '1.5'
                        }}
                      >
                        {mail.sender}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4">
                      <span 
                        className="text-xs md:text-sm lg:text-base font-normal line-clamp-3"
                        style={{ 
                          color: 'var(--color-gray-700)',
                          lineHeight: '1.5'
                        }}
                      >
                        {mail.subject}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1 md:gap-2">
                        <img 
                          src="/icons/calendar.svg" 
                          alt="" 
                          className="w-2.5 h-2.5 md:w-3 md:h-3"
                          style={{ filter: 'invert(66%) sepia(6%) saturate(479%) hue-rotate(181deg) brightness(94%) contrast(89%)' }}
                        />
                        <span 
                          className="text-xs md:text-sm font-normal whitespace-nowrap"
                          style={{ color: 'var(--color-gray-600)' }}
                        >
                          {mail.receptionDate}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4">
                      <span 
                        className="text-xs md:text-sm font-semibold"
                        style={{ color: mail.status === 'priorité' ? '#16a34a' : '#c2410c' }}
                      >
                        {mail.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4">
                      <div className="relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === mail.id ? null : mail.id)}
                          className="hover:opacity-70 transition-opacity"
                          aria-label="Voir les options"
                        >
                          <img 
                            src="/icons/eye.svg" 
                            alt="" 
                            className="w-3 h-2 md:w-4 md:h-2.5"
                          />
                        </button>
                        {openMenuId === mail.id && (
                          <div 
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100"
                            style={{ boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.10)' }}
                          >
                            <button
                              onClick={() => {
                                navigate(`/porteur/courrier/${mail.id}`);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors border-b border-gray-100"
                              style={{ color: '#111827' }}
                            >
                              Voir les détails
                            </button>
                            <button
                              onClick={() => {
                                navigate(`/porteur/courrier-consultatif/${mail.id}`);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
                              style={{ color: '#111827' }}
                            >
                              Voir plus (Consultatif)
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-3 md:px-4 lg:px-6 py-4 border-t border-(--color-gray-100) flex items-center justify-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 md:w-12 md:h-12 rounded border border-(--color-primary) flex items-center justify-center hover:bg-(--color-gray-50) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img 
                src="/icons/arrow-left.svg" 
                alt="Previous" 
                className="w-3 h-3"
                style={{ filter: 'invert(43%) sepia(95%) saturate(2476%) hue-rotate(359deg) brightness(99%) contrast(98%)' }}
              />
            </button>
            
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded border flex items-center justify-center text-base md:text-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'border-(--color-primary) text-white'
                    : 'border-(--color-primary) hover:bg-(--color-gray-50)'
                }`}
                style={{
                  backgroundColor: currentPage === page ? 'var(--color-primary)' : 'transparent',
                  color: currentPage === page ? '#ffffff' : '#000000',
                  borderColor: 'var(--color-primary)',
                }}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 md:w-12 md:h-12 rounded border border-(--color-primary) flex items-center justify-center hover:bg-(--color-gray-50) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img 
                src="/icons/arrow-right.svg" 
                alt="Next" 
                className="w-3 h-3"
                style={{ filter: 'invert(43%) sepia(95%) saturate(2476%) hue-rotate(359deg) brightness(99%) contrast(98%)' }}
              />
            </button>
          </div>
        </div>
      </div>
    </PorteurLayout>
  );
}