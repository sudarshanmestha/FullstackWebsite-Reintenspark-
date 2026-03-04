// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.non_field_errors?.[0] || 'An error occurred');
    }

    return response.json();
  }

  private getAuthHeader(): HeadersInit {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    }
    return {};
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<LoginResponse> {
    return this.request<LoginResponse>('/api/auth/registration/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<LoginResponse> {
    return this.request<LoginResponse>('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      const refresh = localStorage.getItem('refresh_token');
      return this.request('/api/auth/logout/', {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify({ refresh }),
      });
    }
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/user/', {
      headers: this.getAuthHeader(),
    });
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/api/auth/user/', {
      method: 'PATCH',
      headers: this.getAuthHeader(),
      body: JSON.stringify(data),
    });
  }

  async changePassword(data: {
    old_password: string;
    new_password1: string;
    new_password2: string;
  }): Promise<{ detail: string }> {
    return this.request('/api/auth/password/change/', {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(data),
    });
  }

  async requestPasswordReset(email: string): Promise<{ detail: string }> {
    return this.request('/api/auth/password/reset/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async confirmPasswordReset(data: {
    new_password1: string;
    new_password2: string;
    uid: string;
    token: string;
  }): Promise<{ detail: string }> {
    return this.request('/api/auth/password/reset/confirm/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    return this.request('/api/auth/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async verifyToken(token: string): Promise<void> {
    return this.request('/api/auth/token/verify/', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
}

export const api = new ApiClient();