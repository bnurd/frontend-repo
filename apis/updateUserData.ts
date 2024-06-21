import fetchApi from "@/apis/fetchApi";
import { HttpResponse } from "@/types";

export type UserUpdateDTO = {
  name: string;
  age: string;
  address: string;
  telp: string;
};

const updateUserData = async (dto: UserUpdateDTO) => {
  const res = await fetchApi().put("/update-user-data", {
    body: JSON.stringify({
      name: dto.name,
      age: dto.age,
      address: dto.address,
      telp: dto.telp,
    }),
  });

  return res as HttpResponse<unknown>;
};

export default updateUserData;
