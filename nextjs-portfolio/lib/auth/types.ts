export interface User {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  
  export interface Tokens {
    access: string;
    refresh: string;
  }
  
  export interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    isLoading: boolean;
  }