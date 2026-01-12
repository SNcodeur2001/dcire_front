import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import type { CourrierFormData } from '../types';

export default function NewCourrierForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CourrierFormData>({
    sender: "Ministère de l'Économie",
    phone: '+221 77 123 45 67',
    email: '',
    receptionDate: '',
    type: '',
    priority: false,
    subject: 'Demande de collaboration pour le développement des infrastructures numériques',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    navigate('/dashboard');
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