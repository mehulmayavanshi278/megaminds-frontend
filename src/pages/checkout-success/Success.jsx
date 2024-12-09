import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 20000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-sm">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-semibold mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">
          Thank you for your payment. You will be redirected to the homepage in
          20 seconds.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
