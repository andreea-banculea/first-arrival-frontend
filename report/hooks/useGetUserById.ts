import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/user/getUserById";

export const useGetUserById = (id: number) => {
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  return { user, userError, userLoading, refetchUser };
};
