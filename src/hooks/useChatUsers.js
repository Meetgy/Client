import { useGetChatUsersQuery } from "../store/index";

export const useChatUsers = () => {
  const { data, isError, isSuccess } = useGetChatUsersQuery();
  return { userss: data || [], usersIsError: isError, usersIsSuccess: isSuccess };
};
