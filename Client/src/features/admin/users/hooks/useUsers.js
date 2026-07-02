import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/usersApi"

function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

export default useUsers;
