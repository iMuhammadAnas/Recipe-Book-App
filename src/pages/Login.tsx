import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onLogin();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-50 shadow-md rounded-xl p-8 w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer"
        >
          Login
        </button>

        <p className="text-xs text-center text-gray-500 mt-2">
          Click <span className="font-semibold text-blue-600">Login</span> to go
          home
        </p>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
