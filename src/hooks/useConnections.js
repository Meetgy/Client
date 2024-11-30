import { useFetchUsersQuery } from "../store/apis/connectionsApi";

export const useConnections = () => {
  const { data, isSuccess, isError } = useFetchUsersQuery();
  return { connections: data || [], isError, isSuccess};
};
