import { CreateNewConversationPayload } from "@/types";

const chat_api_url = "https://hostliochatapi-x98jy.kinsta.app/api/v1";
export const CreateNewConversation = async ({
  userId,
  listingId,
  ownerId,
}: CreateNewConversationPayload) => {
  try {
    const res = await fetch(`${chat_api_url}/conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingId, userId, ownerId }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(
      "Error occurred while creating a new conversation.",
      error?.message
    );
  }
};

export const GetAllConversation = async ({
  userId,
}: CreateNewConversationPayload) => {
  try {
    const res = await fetch(`${chat_api_url}/conversation?userId=${userId}`);

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(
      "Error occurred while getting all conversation.",
      error?.message
    );
  }
};

export const SendMessage = async ({
  conversationId,
  content,
  senderId,
}: Record<string, string>) => {
  try {
    const res = await fetch(`${chat_api_url}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversationId, content, senderId }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Err while creating message");
  }
};

export const GetAllMessages = async (convId: string) => {
  try {
    const res = await fetch(`${chat_api_url}/message?convId=${convId}`);

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("Error occurred while getting all message.", error?.message);
  }
};
