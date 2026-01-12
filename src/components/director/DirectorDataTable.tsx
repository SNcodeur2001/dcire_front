import type { DirectorMail } from '../../types';

interface DirectorDataTableProps {
  title: string;
  subtitle: string;
  mails: DirectorMail[];
  showStatus?: boolean;
  showDuration?: boolean;
  statusType?: 'priority' | 'imputer' | 'solder';
}

export default function DirectorDataTable({ 
  title, 
  subtitle, 
  mails, 
  showStatus = true,
  showDuration = false,
  statusType = 'priority'
}: DirectorDataTableProps) {
  
  const getStatusBadge = (status: string) => {
    if (statusType === 'priority') {
      return status === 'priorité' ? (
        <div className="inline-flex items-center">
          <span 
            className="text-xs md:text-sm font-semibold"
            style={{ color: '#16a34a' }}
          >
            {status}
          </span>
        </div>
      ) : (
        <div className="inline-flex items-center">
          <span 
            className="text-xs md:text-sm font-semibold"
            style={{ color: '#c2410c' }}
          >
            {status}
          </span>
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center">
          <span 
            className="text-xs md:text-sm font-semibold"
            style={{ color: '#16a34a' }}
          >
            {status}
          </span>
        </div>
      );
    }
  };

  const getDurationBadge = (duration: string) => {
    const days = parseInt(duration);
    let color = '#16a34a'; // green
    let icon = null;
    
    if (days >= 10) {
      color = '#f80909'; // red
      icon = '/icons/warning-red.svg';
    } else if (days >= 7) {
      color = '#ee9d0f'; // orange
    }

    return (
      <div className="flex items-center gap-1.5">
        <span 
          className="text-xs font-semibold"
          style={{ color }}
        >
          {duration}
        </span>
        {icon && (
          <img 
            src={icon} 
            alt="" 
            className="w-4 h-4"
          />
        )}
      </div>
    );
  };

  return (
    <div 
      className="bg-white rounded-md border border-(--color-gray-100) overflow-hidden h-full flex flex-col"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header */}
      <div className="px-3 md:px-4 lg:px-6 py-3 md:py-4 shrink-0">
        <h2 
          className="text-base md:text-lg lg:text-xl font-bold mb-0.5"
          style={{ color: 'var(--color-gray-900)' }}
        >
          {title}
        </h2>
        <p 
          className="text-xs md:text-sm font-normal"
          style={{ color: 'var(--color-gray-600)' }}
        >
          {subtitle}
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
              {showStatus && (
                <th 
                  className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase"
                  style={{ 
                    color: 'var(--color-gray-600)',
                    letterSpacing: '0.60px'
                  }}
                >
                  {statusType === 'priority' ? 'Etat' : statusType === 'imputer' ? 'Status' : 'Status'}
                </th>
              )}
              <th 
                className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase"
                style={{ 
                  color: 'var(--color-gray-600)',
                  letterSpacing: '0.60px'
                }}
              >
                Actions
              </th>
              {showDuration && (
                <th 
                  className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase hidden xl:table-cell"
                  style={{ 
                    color: 'var(--color-gray-600)',
                    letterSpacing: '0.60px'
                  }}
                >
                  Durée actuelle de traitement
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {mails.map((mail, index) => (
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
                {showStatus && mail.status && (
                  <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4">
                    {getStatusBadge(mail.status)}
                  </td>
                )}
                <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4">
                  <button 
                    className="hover:opacity-70 transition-opacity"
                    aria-label="Voir les détails"
                  >
                    <img 
                      src="/icons/eye.svg" 
                      alt="" 
                      className="w-3 h-2 md:w-4 md:h-2.5"
                    />
                  </button>
                </td>
                {showDuration && mail.duration && (
                  <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 hidden xl:table-cell">
                    {getDurationBadge(mail.duration)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}