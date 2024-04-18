import { supabase } from "../lib/supabase";

export const createNewAccount = async (name, username, email) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, username, email }])
    .select();

  if (error) {
    return console.error(error);
  }

  return data;
};
