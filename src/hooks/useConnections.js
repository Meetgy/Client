import { useFetchUsersQuery } from "../store/index";

export const useConnections = () => {
  const { data, isSuccess, isError } = useFetchUsersQuery();
  return { connections: data || [], isError, isSuccess};
};
