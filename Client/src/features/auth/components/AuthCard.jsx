import { useNavigate } from "react-router-dom";

function AuthCard({ title, children }) {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-bl from-blue-500 via-cyan-800 to-cyan-900 px-4 text-white">
      <div className="absolute right-0 top-0 bg-slate-300 text-black  p-5 rounded-3xl gap-3 flex flex-col ">
        <p className="text-xl underline">Admin Credentials below for test purpose only</p>
        <p>Abhinavnair.dev@gmail.com</p>
        <p>Abhinav@1011</p>

             <p className="text-xl underline">User Credentials below for test purpose only</p>
        <p>abhivish1011@gmail.com</p>
        <p>Abhinav@1011</p>
      </div>

      <div className="w-full max-w-lg rounded-xl  p-9 shadow-lg  bg-linear-to-bl from-gray-500 via-cyan-900 to-gray-900 ">
        <h1 className="mb-6 text-center text-3xl font-bold underline ">
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
}

export default AuthCard;
