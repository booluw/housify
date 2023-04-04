import { supabase } from "@/config/supabase";

export function fetchHouses(range) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("houses")
      .select(`*, agent:agents(*)`)
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
      .select(`*, agent:agents(*)`)
      .eq("house_id", id);
    if (error) reject(error);
    resolve(data);
  });
}