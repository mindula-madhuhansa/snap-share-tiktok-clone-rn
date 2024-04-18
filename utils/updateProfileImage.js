import { supabase } from "../lib/supabase";

export const updateProfileImage = async (imgUrl, email) => {
  const { data, error } = await supabase
    .from("users")
    .update({ profileImgUrl: imgUrl })
    .eq("email", email)
    .is("profileImgUrl", null)
    .select();

  if (error) {
    return console.error(error);
  }

  console.log(data);
};
