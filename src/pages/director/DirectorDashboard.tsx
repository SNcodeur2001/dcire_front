import { useState, useEffect } from 'react';
import DirectorLayout from '../../components/layout/DirectorLayout';
import DirectorStatsCard from '../../components/ui/DirectorStatsCard';
import DirectorDataTable from '../../components/director/DirectorDataTable';
import { api } from '../../services';
// import type { DirectorMail } from '../../types';
import type { Courrier, Stats, User } from '../../types/api';

export default function DirectorDashboard() {
   const [courriers, setCourriers] = useState<Courrier[]>([]);
   const [stats, setStats] = useState<Stats | null>(null);
   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const [dailyCount, setDailyCount] = useState(0);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Utiliser l'endpoint unifié pour le tableau de bord
        const dashboardResult = await api.getDirectorDashboardData();
        if (dashboardResult.error) {
          setError(dashboardResult.error);
        } else if (dashboardResult.data) {
          setCurrentUser(dashboardResult.data.user);
          setStats(dashboardResult.data.stats || null);
          setCourriers(dashboardResult.data.pendingCourriers);
          setDailyCount(dashboardResult.data.dailyCount);
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DirectorLayout>
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </DirectorLayout>
    );
  }

  if (error) {
    return (
      <DirectorLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600">Erreur: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </DirectorLayout>
    );
  }
  return (
    <DirectorLayout>
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
              Bienvenue, {currentUser?.name || 'Directeur'}
            </p>
          </div>
          
          <button
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-white font-medium rounded-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Toutes les Courriers
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-4 shrink-0">
          <DirectorStatsCard
            title="Total du mois"
            value={stats?.metrics.totalReceived?.toString() || "0"}
            icon="/icons/mail-blue.svg"
            iconBgColor="#3B82F6"
          />
          <DirectorStatsCard
            title="Total du jour"
            value={dailyCount.toString()}
            icon="/icons/mail-blue.svg"
            iconBgColor="#3B82F6"
          />
          <DirectorStatsCard
            title="Courriers imputés"
            value={stats?.metrics.totalAssigned?.toString() || "0"}
            icon="/icons/check-circle-green.svg"
            iconBgColor="#16A34A"
          />
          <DirectorStatsCard
            title="En attente"
            value={stats?.metrics.totalPending?.toString() || "0"}
            icon="/icons/clock-orange.svg"
            iconBgColor="#F97316"
          />
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DirectorDataTable
            title="Liste des Courriers à imputés"
            subtitle={`Votre mission principale : vérifier et valider les données extraites (${courriers.length} courriers)`}
            mails={courriers.map(c => ({
              id: c.id,
              reference: c.reference,
              sender: c.sender,
              subject: c.subject,
              receptionDate: c.receptionDate,
              status: c.priority === 'priority' ? 'priorité' : 'Non priorité',
              duration: c.duration.toString()
            }))}
            statusType="priority"
          />
        </div>
      </div>
    </DirectorLayout>
  );
}