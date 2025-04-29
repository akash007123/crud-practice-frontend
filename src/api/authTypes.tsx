// src/api/authTypes.ts

export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    message?: string;
  }
  
  export interface SignupRequest {
    username: string;
    password: string;
  }
  
  export interface SignupResponse {
    message: string;
  }