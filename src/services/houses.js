import { supabase } from "@/config/supabase";

export function fetchHouses(range) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("houses")
      .select(`*, agent:profiles(*)`)
      .range(range.start, range.end)
      .eq("available", true)
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

export function fetchAgentHouses(agent_id) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("houses")
      .select(`*`)
      .eq("profiles_id", agent_id);
    if (error) reject(error);
    resolve(data);
  });
}

export function addHouse(payload) {
  return new Promise(async (resolve, reject) => {
    const { error } = await supabase.from("houses").insert({ ...payload });
    if (error) reject(error);
    resolve();
  });
}

export function updateHouse(payload) {
  return new Promise(async (resolve, reject) => {
    const { error } = await supabase
      .from("houses")
      .update({ ...payload })
      .eq("house_id", payload.house_id);
    if (error) reject(error);
    resolve();
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

export function fetchAllAgents() {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("account_type", "landlord");
    if (error) reject(error);
    resolve(data);
  });
}

export function updateAgent(payload) {
  return new Promise(async (resolve, reject) => {
    const { error } = await supabase
      .from("profiles")
      .update({ ...payload })
      .eq("email", payload.email);
    if (error) reject(error);
    resolve();
  });
}
