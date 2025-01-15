import { useGetChatUsersApiQuery } from "../store/apis/getChatUsersApi";

export const useChatUsers = () => {
  const { data, isError, isSuccess } = useGetChatUsersApiQuery();
  return { users: data || [], isError, isSuccess };
};