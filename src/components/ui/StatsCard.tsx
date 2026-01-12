interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
}

export default function StatsCard({ title, value, icon, iconBgColor }: StatsCardProps) {
  return (
    <div 
      className="bg-white rounded-md p-3 md:p-4 lg:p-6 border border-(--color-gray-100) flex items-center justify-between"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="min-w-0 flex-1">
        <p 
          className="text-xs md:text-sm lg:text-lg font-medium mb-1 md:mb-2 truncate"
          style={{ 
            color: 'var(--color-gray-600)',
            lineHeight: '20px'
          }}
        >
          {title}
        </p>
        <p 
          className="text-lg md:text-xl lg:text-2xl font-bold"
          style={{ color: 'var(--color-gray-900)' }}
        >
          {value}
        </p>
      </div>
      <div 
        className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-sm flex items-center justify-center shrink-0 ml-2"
        style={{ backgroundColor: iconBgColor }}
      >
        <img 
          src={icon} 
          alt="" 
          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
        />
      </div>
    </div>
  );
}