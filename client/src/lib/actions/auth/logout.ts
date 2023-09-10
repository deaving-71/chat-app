import { API_URL } from "@/lib/utils";

async function logout() {
  const response = await fetch(`${API_URL}/auth/sign-out`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw {
      message: "Failed to sign-out.",
      reason: await response.json(),
    };
  }
}

export default logout;
