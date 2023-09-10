import { SignupForm } from "@/types";
import { API_URL } from "../../utils";

async function register(formdata: SignupForm) {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formdata),
  });

  const data = await response.json();

  if (!response.ok)
    throw {
      message: "Failed to sign up.",
      reason: data,
    };

  if (response.status !== 201) throw data;

  return data;
}

export default register;
