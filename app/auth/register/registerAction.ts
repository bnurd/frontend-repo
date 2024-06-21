"use server";


import { auth, firestore } from "@/config/firebaseConfig";
import { AuthResponse } from "@/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const registerAction = async (
  prev: AuthResponse,
  data: FormData
): Promise<AuthResponse> => {
  let status: string | null = null;

  try {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    const usersRef = collection(firestore, "USERS");
    await setDoc(doc(usersRef, userCredential.user.uid), {
      email,
      name: "",
      address: "",
      telp: "",
      createdAt: new Date(),
    });

    cookies().set({
      name: "EBUDDY_TOKEN",
      value: token,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });
    status = "success";

    return {
      status: "success",
      message: "Registration successful.",
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

export default registerAction;
