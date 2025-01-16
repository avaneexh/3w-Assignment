import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm"; // Import the UserForm component

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-screen">
      <button
        onClick={() => navigate("/admin-login")}
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
      >
        Admin Login
      </button>

      <h1 className="text-2xl mb-4">Welcome to the User Submission Page</h1>
      <p className="text-gray-600 mb-8">You can select multiple images.</p>

      {/* Call the UserForm component */}
      <div className="w-screen flex justify-center">
        <UserForm />
      </div>
    </div>
  );
};

export default UserPage;
