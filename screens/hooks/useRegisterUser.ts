import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/user/createUser";
import { UserType } from "../../types/User";

export const useRegisterUser = () => {
  const { mutate: userCreate, error: userCreateError } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (user: UserType) => createUser(user),
  });

  return { userCreate, userCreateError };
};
