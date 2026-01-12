import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import FileUploadZone from '../components/upload/FileUploadZone';

export default function NewCourrierUpload() {
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    // After file upload, navigate to form page
    console.log('File selected:', file.name);
    setTimeout(() => {
      navigate('/nouveau-courrier/formulaire');
    }, 500);
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col justify-center">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 
            className="text-lg md:text-xl font-bold"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Enrégistrement courrier
          </h1>
        </div>

        {/* Upload Card */}
        <div className="max-w-3xl mx-auto">
          <div 
            className="bg-white rounded-md border border-(--color-gray-100) p-4 md:p-6 lg:p-8"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="mb-4 md:mb-6">
              <h2 
                className="text-base md:text-lg lg:text-xl font-bold mb-2"
                style={{ color: 'var(--color-gray-900)' }}
              >
                Importer un courrier
              </h2>
              <p 
                className="text-sm md:text-base font-normal"
                style={{ color: 'var(--color-gray-500)' }}
              >
                Importez et validez les données extraites automatiquement
              </p>
            </div>

            <FileUploadZone onFileSelect={handleFileSelect} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}