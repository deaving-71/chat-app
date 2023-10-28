import { UserProfileInfo } from "@/types";
import { API_URL } from "../../utils";

async function getAccessToken() {
  const response = await fetch(`${API_URL}/auth/refresh-access`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok)
    throw {
      message: "Failed to refresh tokens.",
      reason: result,
    };

  if (response.status !== 200) throw result;

  return result as UserProfileInfo;
}

export default getAccessToken;
