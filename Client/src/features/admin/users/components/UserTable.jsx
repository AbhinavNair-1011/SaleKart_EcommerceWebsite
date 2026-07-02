function UserTable({ users }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow">
      <table className="min-w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Name
            </th>

            <th className="px-4 py-3 text-left">
              Username
            </th>

            <th className="px-4 py-3 text-left">
              Email
            </th>

            <th className="px-4 py-3 text-left">
              Phone
            </th>

            <th className="px-4 py-3 text-left">
              Role
            </th>

            <th className="px-4 py-3 text-left">
              Joined
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t"
            >
              <td className="px-4 py-4">
                {user.name}
              </td>

              <td className="px-4 py-4">
                {user.userName}
              </td>

              <td className="px-4 py-4">
                {user.email}
              </td>

              <td className="px-4 py-4">
                {user.phone}
              </td>

              <td className="px-4 py-4 capitalize">
                {user.role}
              </td>

              <td className="px-4 py-4">
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default UserTable;