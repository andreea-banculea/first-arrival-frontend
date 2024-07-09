import { useMutation } from "@tanstack/react-query";
import { saveToken } from "../services/user/saveToken";
import { SaveTokenType } from "../notifications/registerForPushNotificationsAsync";

export const useSaveToken = () => {
  const { mutate: tokenSave, error: tokenSaveError } = useMutation({
    mutationKey: ["acceptEmergency"],
    mutationFn: (tokenRequest: SaveTokenType) => saveToken(tokenRequest),
  });

  return { tokenSave, tokenSaveError };
};
