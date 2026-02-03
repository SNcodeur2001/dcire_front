import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import StatsCard from '../components/ui/StatsCard';
import DataTable from '../components/dashboard/DataTable';
import Button from '../components/ui/Button';
import type { Mail } from '../types';
import { api } from '../services';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

// Hardcoded data removed

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [mails, setMails] = useState<Mail[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalMonth: 0,
    totalDay: 0,
    processed: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [userRes, statsRes, courriersRes] = await Promise.all([
        api.users.getById("4"),
        api.stats.getByUser("4"),
        api.courriers.getCreatedByUser("4")
      ]);

      if (userRes.data) setUser(userRes.data);
      if (statsRes.data) setStats(statsRes.data.find(s => s.period === 'monthly'));
      if (courriersRes.data) {
        const today = new Date().toISOString().split('T')[0];
        const allCourriers = courriersRes.data;
        const pendingMails = allCourriers.filter(c => c.workflowStatus !== 'settled').map(c => ({
          id: c.id,
          reference: c.reference,
          sender: c.sender,
          subject: c.subject,
          receptionDate: formatDate(c.receptionDate)
        }));
        setMails(pendingMails);
        const monthlyStats = statsRes.data?.find(s => s.period === 'monthly');
        const totalMonth = monthlyStats?.metrics?.totalCreated || allCourriers.length;
        const totalDay = allCourriers.filter(c => c.receptionDate === today).length;
        const processed = allCourriers.filter(c => c.workflowStatus === 'settled').length;
        setDashboardStats({
          totalMonth,
          totalDay,
          processed,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 shrink-0">
          <div>
            <h1 
              className="text-lg md:text-xl font-bold mb-1"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Tableau de bord
          </h1>
          <p
            className="text-sm md:text-base font-normal"
            style={{ color: 'var(--color-gray-500)' }}
          >
            Bienvenue, {user?.name || 'Inconnu'}
          </p>
        </div>
        
          <Button 
            variant="primary"
            icon="/icons/plus.svg"
            onClick={() => navigate('/nouveau-courrier')}
            className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
          >
            <span className="hidden sm:inline">Nouveau Courrier</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 mb-4 shrink-0">
        <StatsCard
          title="Total du Moi"
          value={dashboardStats.totalMonth}
          icon="/icons/mail-blue.svg"
          iconBgColor="#3B82F6"
        />
        <StatsCard
          title="Total du jour"
          value={String(dashboardStats.totalDay).padStart(2, '0')}
          icon="/icons/mail-blue.svg"
          iconBgColor="#3B82F6"
        />
        <StatsCard
          title="Courriers Traiter"
          value={String(dashboardStats.processed).padStart(2, '0')}
          icon="/icons/check-green.svg"
          iconBgColor="#10B981"
        />
      </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DataTable mails={mails} />
        </div>
      </div>
    </MainLayout>
  );
}