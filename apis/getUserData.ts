import fetchApi from "@/apis/fetchApi";
import { HttpResponse } from "@/types";

export type UserDataResponse = {
  uid: string;
  email: string;
  name: string;
  age: string;
  address: string;
  telp: string;
};

const getUserData = async () => {
  const res = await fetchApi().get("/fetch-user-data");
  return res as HttpResponse<UserDataResponse>;
};

export default getUserData;
