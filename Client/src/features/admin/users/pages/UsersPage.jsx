import Loader from "../../../../shared/components/Loader";

import UserTable from "../components/UserTable";

import useUsers from "../hooks/useUsers";

function UsersPage() {
  const {
    data,
    isLoading,
  } = useUsers();

  if (isLoading) {
    return <Loader />;
  }

  const users =
    data?.data?.users ?? [];

    if(isLoading){
        return <Loader/>
    }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Users
      </h1>

      <UserTable
        users={users}
      />
    </div>
  );
}

export default UsersPage;