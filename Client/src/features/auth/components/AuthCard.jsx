import { useNavigate } from "react-router-dom";

function AuthCard({ title, children }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100  px-4 text-white"
    >
      <div className="absolute right-0 top-0 bg-gradient-to-bl from-cyan-600 via-teal-900 to-gray-950 text-white p-2 text-sm lg:p-5  lg:gap-3 lg:flex flex-col ">
        <p className=" lg:text-xl underline">
          Admin Credentials below for test purpose only
        </p>
        <div className="d">
          <p>Abhinavnair.dev@gmail.com</p>
          <p>Abhinav@1011</p>
        </div>

        <p className=" lg:text-xl underline">
          User Credentials below for test purpose only
        </p>
        <div className="">
          <p>abhivish1011@gmail.com</p>
          <p>Abhinav@1011</p>
        </div>
      </div>

      <div
        className="w-full max-w-lg rounded-xl  p-9 shadow-lg  bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      >
        <h1 className="mb-6 text-center text-blue-900 text-3xl font-bold  ">
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
}

export default AuthCard;
