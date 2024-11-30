import { useGetChatUsersQuery } from "../store/apis/getChatUsers";

export const useChatUsers = () => {
  const { data, isError, isSuccess } = useGetChatUsersQuery();
  return { users: data || [], isError, isSuccess };
};