import { UserProfileInfo } from "@/types";
import { API_URL } from "../../utils";

async function getProfile(): Promise<UserProfileInfo> {
  const response = await fetch(`${API_URL}/users/my-profile`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok)
    throw {
      message: "Failed to login.",
      reason: result,
    };

  if (response.status !== 200) throw result;

  return result as UserProfileInfo;
}

export default getProfile;
