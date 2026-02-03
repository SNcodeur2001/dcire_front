import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PorteurLayout from '../../components/layout/PorteurLayout';
import DirectorStatsCard from '../../components/ui/DirectorStatsCard';
import type { DirectorMail } from '../../types';

const mockMails: DirectorMail[] = [
  {
    id: '1',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Prioritaire',
  },
  {
    id: '2',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Prioritaire',
  },
  {
    id: '3',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Non prioritaire',
  },
  {
    id: '4',
    reference: 'CR-2024-001',
    sender: 'Ministère des Finances',
    subject: 'Demande de partenariat stratégique',
    receptionDate: '15/01/2024',
    status: 'Non prioritaire',
  },
];

export default function PorteurDashboard() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <PorteurLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 shrink-0">
          <div>
            <h1 
              className="text-lg md:text-xl lg:text-2xl font-bold mb-1"
              style={{ color: 'var(--color-gray-900)' }}
            >
              Tableau de bord
            </h1>
            <p 
              className="text-sm md:text-base font-normal"
              style={{ color: 'var(--color-gray-500)' }}
            >
              Bienvenue, Salimata Sane
            </p>
          </div>
          
          <button
            onClick={() => navigate('/porteur/courriers-a-solder')}
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white font-medium rounded-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Toutes les Courriers
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-4 md:mb-6 shrink-0">
          <DirectorStatsCard
            title="Total Courriers"
            value="104"
            icon="/icons/mail-blue.svg"
            iconBgColor="#3B82F6"
            trend={{ value: '+12%', direction: 'up', label: '' }}
          />
          <DirectorStatsCard
            title="Total du jour"
            value="04"
            icon="/icons/mail-blue.svg"
            iconBgColor="#3B82F6"
            trend={{ value: '+12%', direction: 'up', label: 'vs hier' }}
          />
          <DirectorStatsCard
            title="Courriers Solder"
            value="01"
            icon="/icons/check-circle-green.svg"
            iconBgColor="#16A34A"
            trend={{ value: '+8%', direction: 'up', label: 'vs hier' }}
          />
          <DirectorStatsCard
            title="En attente"
            value="03"
            icon="/icons/clock-orange.svg"
            iconBgColor="#F97316"
            trend={{ value: '-3%', direction: 'down', label: 'vs hier' }}
          />
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
                        style={{ color: mail.status === 'Prioritaire' ? '#16a34a' : '#c2410c' }}
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
        </div>
      </div>
    </PorteurLayout>
  );
}