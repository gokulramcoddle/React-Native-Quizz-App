import { supabase } from "../lib/supabase";

export const signUpUser = async (name: string, email: string, password: string) => {
  return await supabase.from("users").insert([{ name, email, password }]);
};

export const loginUser = async (email: string, password: string) => {
  return await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();
};

export const getUserById = async (id: string) => {
  return await supabase.from("users").select("*").eq("id", id).single();
};
