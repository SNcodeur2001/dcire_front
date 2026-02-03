import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import FileUploadZone from '../components/upload/FileUploadZone';
import type { CourrierFormData } from '../types';
import { api } from '../services';

export default function NewCourrierForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CourrierFormData>({
    sender: '',
    phone: '',
    email: '',
    receptionDate: '',
    type: '',
    priority: false,
    subject: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      alert('Veuillez télécharger un document PDF');
      return;
    }

    // Generate unique reference
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const existingCourriers = await api.courriers.getAll();
    const nextId = existingCourriers.data ? existingCourriers.data.length + 1 : 1;
    const reference = `CR-${year}-${String(nextId).padStart(3, '0')}`;

    // Simulate file upload by copying to public/documents
    // In a real app, this would be done on the server
    const fileName = `${reference}.pdf`;
    const filePath = `/documents/${fileName}`;

    // For demo purposes, we'll store the file in localStorage as base64
    // In production, this would be uploaded to a server
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      // Store file in localStorage for demo
      localStorage.setItem(`pdf_${reference}`, base64Data);

      // Create courrier object
      const courrierData = {
        id: String(nextId),
        reference,
        sender: formData.sender,
        senderPhone: formData.phone,
        senderEmail: formData.email,
        subject: formData.subject,
        receptionDate: formData.receptionDate,
        registrationDate: now.toISOString(),
        type: formData.type as 'officiel' | 'administratif' | 'commercial',
        priority: (formData.priority ? 'priority' : 'normal') as 'priority' | 'normal',
        workflowStatus: 'pending' as 'pending' | 'assigned' | 'in_progress' | 'settled',
        assignedDepartmentId: null,
        assignedPorteurId: null,
        deadline: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
        escalationLevel: 0,
        tags: [formData.type],
        duration: 15,
        createdBy: '4', // Assistant ID
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        documentUrl: filePath,
        responses: []
      };

      try {
        await api.courriers.create(courrierData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error creating courrier:', error);
        alert('Erreur lors de la création du courrier');
      }
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleReset = () => {
    setFormData({
      sender: '',
      phone: '',
      email: '',
      receptionDate: '',
      type: '',
      priority: false,
      subject: '',
    });
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Page Header */}
        <div className="mb-4 shrink-0">
          <h1 
            className="text-lg md:text-xl font-bold"
            style={{ color: 'var(--color-gray-900)' }}
          >
            Enrégistrement courrier
          </h1>
        </div>

        <div className="flex gap-4 md:gap-6 lg:gap-8 flex-1 min-h-0 overflow-hidden">
          {/* Form Section */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 lg:space-y-6 pb-4">
              {/* Row 1: Expéditeur and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div>
                  <label 
                    className="text-xs md:text-sm font-medium mb-1.5 md:mb-2 flex items-center gap-1"
                    style={{ color: 'var(--color-gray-700)' }}
                  >
                    Expéditeur
                    <span style={{ color: 'var(--color-red-500)' }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.sender}
                      onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                      className="input-field text-xs md:text-sm"
                      required
                    />
                    <img 
                      src="/icons/calendar-filled.svg" 
                      alt="" 
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-2.5 h-3 md:w-3 md:h-3.5"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="text-xs md:text-sm font-medium mb-1.5 md:mb-2 flex items-center gap-1"
                    style={{ color: 'var(--color-gray-700)' }}
                  >
                    Date de réception
                    <span style={{ color: 'var(--color-red-500)' }}>*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.receptionDate}
                    onChange={(e) => setFormData({ ...formData, receptionDate: e.target.value })}
                    className="input-field text-xs md:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Téléphone and Mail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              <div>
                  <label 
                    className="text-xs md:text-sm font-medium mb-1.5 md:mb-2 flex items-center gap-1"
                    style={{ color: 'var(--color-gray-700)' }}
                  >
                    Téléphone
                    <span style={{ color: 'var(--color-red-500)' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field text-xs md:text-sm"
                    required
                  />
                </div>

                <div>
                  <label 
                    className="text-xs md:text-sm font-medium mb-1.5 md:mb-2 flex items-center gap-1"
                    style={{ color: 'var(--color-gray-700)' }}
                  >
                    Mail
                    <span style={{ color: 'var(--color-red-500)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field text-xs md:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Type de courrier and Mail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              <div>
                  <label 
                    className="text-xs md:text-sm font-medium mb-1.5 md:mb-2 flex items-center gap-1"
                    style={{ color: 'var(--color-gray-700)' }}
                  >
                    Type de courrier
                    <span style={{ color: 'var(--color-red-500)' }}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="input-field appearance-none text-xs md:text-sm"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="officiel">Officiel</option>
                      <option value="administratif">Administratif</option>
                      <option value="commercial">Commercial</option>
                    </select>
                    <img 
                      src="/icons/chevron-down.svg" 
                      alt="" 
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="text-xs md:text-sm font-medium mb-1.5 md:mb-2 flex items-center gap-1"
                    style={{ color: 'var(--color-gray-700)' }}
                  >
                    Mail
                    <span style={{ color: 'var(--color-red-500)' }}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="input-field appearance-none text-xs md:text-sm"
                    >
                      <option value="">Sélectionner</option>
                    </select>
                    <img 
                      src="/icons/chevron-down.svg" 
                      alt="" 
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Objet */}
              <div>
                <label 
                  className="text-xs md:text-sm font-medium mb-1.5 md:mb-2 flex items-center gap-1"
                  style={{ color: 'var(--color-gray-700)' }}
                >
                  Objet
                  <span style={{ color: 'var(--color-red-500)' }}>*</span>
                </label>
                <textarea
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field min-h-[60px] md:min-h-[80px] lg:min-h-[100px] resize-none text-xs md:text-sm"
                  required
                />
              </div>

              {/* Priorité */}
              <div className="flex items-center gap-2 md:gap-3">
                <label
                  className="text-xs md:text-sm font-medium"
                  style={{ color: 'var(--color-black)' }}
                >
                  Priorité
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: !formData.priority })}
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 transition-colors ${
                    formData.priority
                      ? 'border-(--color-gray-600) bg-(--color-gray-600)'
                      : 'border-(--color-gray-600)'
                  }`}
                  aria-label="Toggle priority"
                />
              </div>

              {/* File Upload */}
              <FileUploadZone onFileSelect={(file) => {
                setUploadedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }} />

              {/* Action Buttons */}
              <div className="flex gap-3 md:gap-4 pt-2 md:pt-4">
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={handleReset}
                  className="flex-1 text-xs md:text-sm lg:text-base px-3 py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3"
                >
                  Réinitialiser
                </Button>
                <Button 
                  type="submit"
                  variant="primary"
                  icon="/icons/arrow-right.svg"
                  className="flex-1 text-xs md:text-sm lg:text-base px-3 py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3"
                >
                  Valider
                </Button>
              </div>
            </form>
          </div>

          {/* Document Preview */}
          <div className="w-64 md:w-80 lg:w-96 xl:w-[436px] shrink-0 overflow-y-auto">
            <img 
              src="/document-preview.jpg" 
              alt="Document Preview" 
              className="w-full rounded-sm sticky top-0"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}