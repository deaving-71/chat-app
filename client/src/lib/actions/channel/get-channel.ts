import { ChannelExtended } from "@/types";
import { API_URL } from "../../utils";

async function getChannel(id: string) {
  const response = await fetch(`${API_URL}/channels/${id}`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok)
    throw {
      message: "Failed to fetch conversation.",
      reason: result,
    };

  if (response.status !== 200) throw result;

  return result as ChannelExtended;
}

export default getChannel;
