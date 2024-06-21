export type AuthResponse = {
  status: "success" | "error" | null;
  message: string;
};

export type HttpResponse<T = any> = {
  status: number;
  message: string;
  data?: T;
};
