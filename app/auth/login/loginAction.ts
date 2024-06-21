"use server";

import { auth } from "@/config/firebaseConfig";
import { AuthResponse } from "@/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginAction = async (
  prev: AuthResponse,
  data: FormData
): Promise<AuthResponse> => {
  let status: string | null = null;

  try {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const credential = await signInWithEmailAndPassword(auth, email, password);
    const token = await credential.user.getIdToken();

    cookies().set({
      name: "EBUDDY_TOKEN",
      value: token,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    if (!credential.user) {
      throw new Error("User not found.");
    }

    status = "success";
    return {
      status: "success",
      message: "Login successful.",
    };
  } catch (error: any) {
    status = "error";
    return {
      status: "error",
      message: error?.message ?? "Invalid email or password. Please try again.",
    };
  } finally {
    if (status === "success") {
      redirect("/");
    }
  }
};

export default loginAction;
