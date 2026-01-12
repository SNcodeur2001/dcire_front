import type { Mail } from '../../types';

interface DataTableProps {
  mails: Mail[];
}

export default function DataTable({ mails }: DataTableProps) {
  return (
    <div 
      className="bg-white rounded-md border border-(--color-gray-100) overflow-hidden h-full flex flex-col"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header */}
      <div className="px-3 md:px-4 lg:px-6 py-3 md:py-4 shrink-0">
        <h2 
          className="text-base md:text-lg font-bold"
          style={{ color: 'var(--color-gray-900)' }}
        >
          Courriers enregistrés
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full">
          <thead style={{ backgroundColor: 'var(--color-gray-50)' }} className="sticky top-0">
            <tr>
              <th 
                className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider"
              style={{ 
                color: 'var(--color-gray-600)',
                letterSpacing: '0.60px'
              }}
              >
                Référence
              </th>
              <th 
                className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider hidden md:table-cell"
              style={{ 
                color: 'var(--color-gray-600)',
                letterSpacing: '0.60px'
              }}
              >
                Expéditeur
              </th>
              <th 
                className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider"
              style={{ 
                color: 'var(--color-gray-600)',
                letterSpacing: '0.60px'
              }}
              >
                Objet
              </th>
              <th 
                className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider hidden lg:table-cell"
                style={{ 
                  color: 'var(--color-gray-600)',
                  letterSpacing: '0.60px',
                  lineHeight: '16px'
                }}
              >
                Date
              </th>
              <th 
                className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wider"
              style={{ 
                color: 'var(--color-gray-600)',
                letterSpacing: '0.60px'
              }}
              >
                Détails
              </th>
            </tr>
          </thead>
          <tbody>
            {mails.map((mail, index) => (
              <tr 
                key={mail.id}
                className={index > 0 ? 'border-t border-(--color-gray-100)' : ''}
              >
                <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3">
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
                <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 hidden md:table-cell">
                  <span 
                    className="text-xs md:text-sm lg:text-base font-normal"
                    style={{ 
                      color: 'var(--color-gray-700)',
                      lineHeight: '1.5'
                    }}
                  >
                    {mail.sender}
                  </span>
                </td>
                <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3">
                  <span 
                    className="text-xs md:text-sm lg:text-base font-normal line-clamp-2"
                    style={{ 
                      color: 'var(--color-gray-700)',
                      lineHeight: '1.5'
                    }}
                  >
                    {mail.subject}
                  </span>
                </td>
                <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3 hidden lg:table-cell">
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
                <td className="px-3 md:px-4 lg:px-6 py-2 md:py-3">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}