// API client to replace Supabase calls

export interface Package {
  id: string;
  name: string;
  description: string | null;
  price: string;
  created_at: string;
}

export interface Registration {
  id: string;
  user_id: string | null;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  contact_phone: string | null;
  company_name: string | null;
  company_address: string | null;
  package_id: string;
  total_amount: string;
  invoice_number: string;
  payment_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  registration_id: string;
  player_name: string;
  player_email: string | null;
  tshirt_size: string;
  dietary_requirements: string | null;
  attending_gala_dinner: boolean | null;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  access_token: string;
  user: AuthUser;
}

class ApiClient {
  private baseUrl = '/api';

  async login(email: string, password: string): Promise<AuthSession> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async signUp(email: string, password: string): Promise<AuthSession> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Sign up failed');
    }

    return response.json();
  }

  async getPackages(): Promise<Package[]> {
    const response = await fetch(`${this.baseUrl}/packages`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }

    return response.json();
  }

  async createRegistration(data: {
    contact_first_name: string;
    contact_last_name: string;
    contact_email: string;
    contact_phone?: string;
    company_name?: string;
    company_address?: string;
    package_id: string;
    total_amount: number;
    user_id?: string;
    players?: {
      player_name: string;
      player_email?: string;
      tshirt_size: string;
      dietary_requirements?: string;
      attending_gala_dinner: boolean;
    }[];
  }): Promise<Registration> {
    const response = await fetch(`${this.baseUrl}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create registration');
    }

    return response.json();
  }

  async sendInvoice(registrationId: string): Promise<{ success: boolean; message: string; invoiceNumber: string }> {
    const response = await fetch(`${this.baseUrl}/send-invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ registrationId }),
    });

    if (!response.ok) {
      throw new Error('Failed to send invoice');
    }

    return response.json();
  }
}

export const api = new ApiClient();