export interface User {
  name: string;
  role: string;
  avatar: string;
}

export interface Mail {
  id: string;
  reference: string;
  sender: string;
  subject: string;
  receptionDate: string;
}

export interface Stats {
  totalMonth: number;
  totalDay: number;
  processed: number;
}

export interface CourrierFormData {
  sender: string;
  phone: string;
  email: string;
  receptionDate: string;
  type: string;
  priority: boolean;
  subject: string;
  document?: File;
}