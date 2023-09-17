import { LoginCredentials, LoginResponse } from "@/types";
import { API_URL } from "../../utils";

async function login({
  username,
  password,
}: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(
    `${API_URL}/auth/login?username=${username}&password=${password}`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok)
    throw {
      message: "Failed to login.",
      reason: data,
    };

  if (response.status !== 200) throw data;

  return data as LoginResponse;
}

export default login;
