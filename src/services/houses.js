import { supabase } from "@/config/supabase";

export function fetchHouses(range) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("houses")
      .select(`*, agent:profiles(*)`)
      .range(range.start, range.end)
      .order("created_at", { ascending: true });
    if (error) reject(error);
    resolve(data);
  });
}

export function fetchHouse(id) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("houses")
      .select(`*, agent:profiles(*)`)
      .eq("house_id", id);
    if (error) reject(error);
    resolve(data);
  });
}

export function fetchRoommates(id) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("roommates")
      .select(`*`)
      .eq("house_id", id);
    if (error) reject(error);
    resolve(data);
  });
}

export function setRoommates(payload) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("roommates")
      .insert({ ...payload })
      .select(`*`);
    if (error) reject(error);
    resolve(data);
  });
}
