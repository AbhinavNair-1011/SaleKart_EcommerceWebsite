import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../api/dashboardApi";

function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}

export default useDashboard;
