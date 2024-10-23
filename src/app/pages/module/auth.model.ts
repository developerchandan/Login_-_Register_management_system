export interface User {
  email: string;
  username: string;
  userId: string;
  token?: string;
  profileImage?: string;
}

export interface Auth {
  success: boolean;
  message: string;
  data: {
    token: string;
    email: string;
    username: string;
    userId: string;
  };
}