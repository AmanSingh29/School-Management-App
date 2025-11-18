export type AuthStackParamList = {
Login: undefined;
};


export type AppStackParamList = {
Home: undefined;
};

export type UserType = {
  id: string;
  name: string;
  className: string;
  role: 'student' | 'teacher' | 'admin';
  email: string;
  profilePic?: string;
};