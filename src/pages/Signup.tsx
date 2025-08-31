import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  onSignup: () => void;
}

const Signup: React.FC<Props> = ({ onSignup }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSignup();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-50 shadow-md rounded-xl p-8 w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>

        <button
          onClick={handleClick}
          className="w-full bg-green-500 text-white py-2 rounded-md cursor-pointer"
        >
          Signup
        </button>

        <p className="text-xs text-center text-gray-500 mt-2">
          Click <span className="font-semibold text-green-600">Signup</span> to go home
        </p>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
