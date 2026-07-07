function UserTable({ users }) {
  return (
   <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
          User
        </th>

        <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
          Contact
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Role
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Joined
        </th>
      </tr>
    </thead>

    <tbody>
      {users.map((user) => (
        <tr
          key={user.id}
          className="border-t border-slate-100 transition hover:bg-slate-50"
        >
          <td className="px-8 py-5">
            <div>
              <p className="font-medium text-slate-900">
                {user.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                @{user.userName}
              </p>
            </div>
          </td>

          <td className="px-8 py-5">
            <p className="text-slate-900">
              {user.email}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {user.phone}
            </p>
          </td>

          <td className="px-8 py-5 text-center">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                user.role === "admin"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {user.role}
            </span>
          </td>

          <td className="px-8 py-5 text-center text-slate-600">
            {new Date(user.createdAt).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default UserTable;