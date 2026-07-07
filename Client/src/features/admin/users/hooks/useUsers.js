import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/usersApi"

function useUsers(params) {
  return useQuery({
    queryKey: ["users",params],
    queryFn: ()=>getUsers(params),
  });
}

export default useUsers;
