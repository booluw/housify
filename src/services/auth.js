import { supabase } from "@/config/supabase";

export function login(payload) {
  return new Promise(async (resolve, reject) => {
    const { error } = await supabase.auth.signInWithPassword({ ...payload });
    if (error) reject(error);
    resolve();
  });
}

export function register(payload) {
  return new Promise(async (resolve, reject) => {
    const { error } = await supabase.auth.signUp({ ...payload });
    if (error) reject(error);
    resolve();
  });
}

export function addUser(payload) {
  return new Promise(async (resolve, reject) => {
    const { error } = await supabase.from("profiles").insert({ ...payload });
    if (error) reject(error);
    resolve();
  });
}

export function fetchUser(email) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("email", email);
    if (error) reject(error);
    resolve(data);
  });
}
