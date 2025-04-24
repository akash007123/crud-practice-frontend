export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    gender: string;
  }
  
  export interface UserFormData extends Omit<User, '_id'> {}