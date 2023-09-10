import { API_URL } from "../../utils";

async function getAccessToken() {
  const response = await fetch(`${API_URL}/auth/refresh-access`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok)
    throw {
      message: "Failed to refresh tokens.",
      reason: data,
    };

  if (response.status !== 200) throw data;

  return data;
}

export default getAccessToken;
