function UserTable({ users }) {
  return (
    <>

      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900">
                  {user.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  @{user.userName}
                </p>
              </div>


              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-violet-100 text-violet-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {user.role}
              </span>

            </div>



            <div className="mt-5 space-y-3 text-sm">

              <div>
                <p className="text-slate-500">
                  Email
                </p>

                <p className="truncate font-medium text-slate-900">
                  {user.email}
                </p>
              </div>


              <div>
                <p className="text-slate-500">
                  Phone
                </p>

                <p className="font-medium text-slate-900">
                  {user.phone}
                </p>
              </div>


              <div>
                <p className="text-slate-500">
                  Joined
                </p>

                <p className="font-medium text-slate-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>





      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

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



          <tbody className="divide-y divide-slate-100">

            {users.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-slate-50"
              >

                <td className="px-8 py-5">
                  <p className="font-semibold text-slate-900">
                    {user.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    @{user.userName}
                  </p>
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

    </>
  );
}


export default UserTable;