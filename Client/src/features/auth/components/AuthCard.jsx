function AuthCard({ title, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-bl from-blue-500 via-cyan-800 to-cyan-900 px-4 text-white">

      <div className="w-full max-w-lg rounded-xl  p-9 shadow-lg  bg-linear-to-bl from-gray-500 via-cyan-900 to-gray-900 ">
        <h1 className="mb-6 text-center text-3xl font-bold underline ">{title}</h1>

        {children}
      </div>
    </div>
  );
}

export default AuthCard;
