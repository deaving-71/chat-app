import { ConversationWithMessages } from "@/types";
import { API_URL } from "../../utils";

async function getMyConversations() {
  const response = await fetch(`${API_URL}/conversations/my-conversations`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok)
    throw {
      message: "Failed to fetch conversations.",
      reason: result,
    };

  if (response.status !== 200) throw result;

  return result as ConversationWithMessages[];
}

export default getMyConversations;
