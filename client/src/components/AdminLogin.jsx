import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id === "admin" && password === "password_2025") {
      sessionStorage.setItem("isAdmin", "true"); // Save admin session
      navigate("/admin");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => navigate("/user")}
        className="absolute top-4 right-4 p-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
      >
        Go to User Page
      </button>

      <div className="w-1/3 p-8 bg-gray-100 shadow-lg rounded">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <h2 className="text-xl mb-4">If not responding, Please refresh.</h2>
        <input
          type="text"
          placeholder="Admin ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Guest Admin ID: <strong>admin</strong>, Password: <strong>password_2025</strong>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
