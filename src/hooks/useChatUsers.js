import { useGetChatUsersQuery } from "../store/index";

const useChatUsers = () => {
  const { data, isError, isSuccess } = useGetChatUsersQuery();
  return { chats: data || [], isError, isSuccess };
};

export default useChatUsers;