import PorteurLayout from '../../components/layout/PorteurLayout';

export default function CourriersSoldes() {
  return (
    <PorteurLayout>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Courriers Soldés
          </h1>
          <p 
            className="text-base"
            style={{ color: 'var(--color-gray-500)' }}
          >
            Cette page sera développée prochainement
          </p>
        </div>
      </div>
    </PorteurLayout>
  );
}