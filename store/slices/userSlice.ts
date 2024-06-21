"use client";

import getUserData, { UserDataResponse } from "@/apis/getUserData";
import updateUserData, { UserUpdateDTO } from "@/apis/updateUserData";
import { HttpResponse } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type UserSlice = {
  data: {
    uid?: string;
    email?: string;
    name?: string;
    age?: string;
    address?: string;
    telp?: string;
  };
  status: "idle" | "loading" | "error" | "success";
  mode: "fetch" | "update";
  error: string | null;
};

const initialState: UserSlice = {
  data: {
    uid: undefined,
    email: undefined,
    name: undefined,
    age: undefined,
    address: undefined,
    telp: undefined,
  },
  status: "idle",
  mode: "fetch",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserStore.pending, (state) => {
      state.mode = "fetch";
      state.status = "loading";
    });
    builder.addCase(fetchUserStore.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchUserStore.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
    });

    builder.addCase(updateUserStore.pending, (state) => {
      state.mode = "update";
      state.status = "loading";
    });
    builder.addCase(updateUserStore.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(updateUserStore.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
    });
  },
});

export const fetchUserStore = createAsyncThunk<UserDataResponse>(
  "user/fetchUser",
  async () => {
    const res = await getUserData();
    return res.data as UserDataResponse;
  }
);

export const updateUserStore = createAsyncThunk(
  "user/updateUser",
  async (data: UserUpdateDTO) => {
    const res = await updateUserData(data);
    return res;
  }
);

export default userSlice.reducer;
