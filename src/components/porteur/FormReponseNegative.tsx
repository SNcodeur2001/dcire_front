import { useState } from 'react';

interface FormReponseNegativeProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function FormReponseNegative({ onSubmit, onCancel }: FormReponseNegativeProps) {
  const [typeDemande, setTypeDemande] = useState<'subvention' | 'sponsoring'>('subvention');
  const [motifRefus, setMotifRefus] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ typeDemande, motifRefus, file });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div 
        className="border rounded-xl p-4 md:p-6 space-y-4"
        style={{ borderColor: 'rgba(0, 0, 0, 0.12)' }}
      >
        {/* Type de demande */}
        <div>
          <h3 className="text-sm md:text-base font-semibold mb-3" style={{ color: '#000000' }}>
            Type de demande
          </h3>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="typeDemande"
                  value="subvention"
                  checked={typeDemande === 'subvention'}
                  onChange={() => setTypeDemande('subvention')}
                  className="sr-only"
                />
                <div 
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: 'var(--color-gray-600)' }}
                >
                  {typeDemande === 'subvention' && (
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-gray-600)' }} />
                  )}
                </div>
              </div>
              <span className="text-xs md:text-sm" style={{ color: '#000000' }}>Subvention</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="typeDemande"
                  value="sponsoring"
                  checked={typeDemande === 'sponsoring'}
                  onChange={() => setTypeDemande('sponsoring')}
                  className="sr-only"
                />
                <div 
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: 'var(--color-gray-600)' }}
                >
                  {typeDemande === 'sponsoring' && (
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-gray-600)' }} />
                  )}
                </div>
              </div>
              <span className="text-xs md:text-sm" style={{ color: '#000000' }}>Sponsoring</span>
            </label>
          </div>
        </div>

        {/* Motif du refus */}
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#ef4444' }}>
            Motif du refus*
          </label>
          <textarea
            value={motifRefus}
            onChange={(e) => setMotifRefus(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 rounded-lg border outline-none focus:border-(--color-primary) transition-colors resize-none"
            style={{ borderColor: '#d1d5db' }}
          />
        </div>

        {/* File Upload */}
        <div>
          <h3 className="text-sm md:text-base font-semibold mb-3" style={{ color: '#000000' }}>
            Pièce jointe réponse*
          </h3>
          <label 
            className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-(--color-gray-50) transition-colors"
            style={{ borderColor: '#d1d5db' }}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="sr-only"
              required
            />
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: '#ffe8db' }}
            >
              <img 
                src="/icons/upload-cloud.svg" 
                alt="" 
                className="w-7 h-6"
                style={{ filter: 'invert(43%) sepia(95%) saturate(2476%) hue-rotate(359deg) brightness(99%) contrast(98%)' }}
              />
            </div>
            <p className="text-sm md:text-base font-medium" style={{ color: 'var(--color-gray-700)' }}>
              {file ? file.name : 'Cliquez pour importer ou glissez le fichier'}
            </p>
            <p className="text-xs md:text-sm" style={{ color: 'var(--color-gray-500)' }}>
              PDF uniquement, max 10MB
            </p>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-lg border font-medium transition-colors hover:bg-(--color-gray-50)"
          style={{ 
            borderColor: 'var(--color-gray-300)',
            color: 'var(--color-gray-700)'
          }}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Soumettre
        </button>
      </div>
    </form>
  );
}