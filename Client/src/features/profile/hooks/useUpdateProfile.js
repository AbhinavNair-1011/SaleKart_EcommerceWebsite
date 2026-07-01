import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "../api/profileApi";

function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
  });
}

export default useUpdateProfile;