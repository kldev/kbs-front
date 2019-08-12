export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}

export interface SalesmanListItem {
  id: string;
  username: string;
  email: string;
  address: string;
}
