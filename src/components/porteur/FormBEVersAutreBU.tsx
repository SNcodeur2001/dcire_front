import { useState } from 'react';

interface FormBEVersAutreBUProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function FormBEVersAutreBU({ onSubmit, onCancel }: FormBEVersAutreBUProps) {
  const [nomBU, setNomBU] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nomBU, commentaire, file });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div 
        className="border rounded-xl p-4 md:p-6 space-y-4"
        style={{ borderColor: 'rgba(0, 0, 0, 0.12)' }}
      >
        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#ef4444' }}>
              Nom de la BU cible*
            </label>
            <input
              type="text"
              value={nomBU}
              onChange={(e) => setNomBU(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-lg border outline-none focus:border-(--color-primary) transition-colors"
              style={{ borderColor: '#d1d5db' }}
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#ef4444' }}>
              Commentaire de transfert*
            </label>
            <input
              type="text"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-lg border outline-none focus:border-(--color-primary) transition-colors"
              style={{ borderColor: '#d1d5db' }}
            />
          </div>
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