export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  services: string[];
  handled: boolean;
  createdAt: string;
}
