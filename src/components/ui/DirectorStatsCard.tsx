interface DirectorStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
    label: string;
  };
}

export default function DirectorStatsCard({ title, value, icon, iconBgColor, trend }: DirectorStatsCardProps) {
  return (
    <div 
      className="bg-white rounded-md p-3 md:p-4 lg:p-5 border border-(--color-gray-100) flex items-start justify-between gap-3"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex-1 min-w-0">
        <p 
          className="text-xs md:text-sm font-normal mb-2"
          style={{ 
            color: 'var(--color-gray-600)',
          }}
        >
          {title}
        </p>
        <p 
          className="text-2xl md:text-3xl font-bold mb-1.5"
          style={{ color: 'var(--color-gray-900)' }}
        >
          {value}
        </p>
        {trend && (
          <div className="flex items-center gap-1">
            <img 
              src={trend.direction === 'up' ? '/icons/arrow-up-orange.svg' : '/icons/arrow-down-red.svg'}
              alt=""
              className="w-2 h-2"
              style={{
                filter: trend.direction === 'up' 
                  ? 'invert(43%) sepia(95%) saturate(2476%) hue-rotate(359deg) brightness(99%) contrast(98%)'
                  : 'invert(26%) sepia(89%) saturate(2893%) hue-rotate(346deg) brightness(93%) contrast(89%)'
              }}
            />
            <span 
              className="text-xs md:text-sm font-medium"
              style={{ 
                color: trend.direction === 'up' ? 'var(--color-primary)' : '#dc2626'
              }}
            >
              {trend.value}
            </span>
            <span 
              className="text-xs md:text-sm font-normal"
              style={{ color: 'var(--color-gray-500)' }}
            >
              {trend.label}
            </span>
          </div>
        )}
      </div>
      <div 
        className="w-10 h-10 md:w-12 md:h-12 rounded-sm flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBgColor }}
      >
        <img 
          src={icon} 
          alt="" 
          className="w-4 h-4 md:w-5 md:h-5"
        />
      </div>
    </div>
  );
}