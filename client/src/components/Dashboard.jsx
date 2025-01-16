import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // For modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/submissions");
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleThumbnailClick = (images) => {
    setSelectedImages(images); // Show modal with all images
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin"); // Clear admin session
    navigate("/admin-login");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6 text-center ">Admin Dashboard</h1>
      <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded mb-4 absolute top-4 right-4">
        Logout
      </button>

      {/* User submissions */}
      <div className="grid grid-cols-1 md:grid-cols-2  min-h-screen lg:grid-cols-3 gap-4 mt-5">
        {submissions.map((user) => (
          <div key={user._id} className="p-4 bg-gray-100 shadow rounded max-h-72">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>@{user.socialHandle}</p>
            <div className="relative w-full h-44">
              {/* First image */}
              <img
                src={user.images[0]}
                alt="User Upload"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleThumbnailClick(user.images)}
              />
              {/* +n badge for additional photos */}
              {user.images.length > 1 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-full">
                  +{user.images.length - 1}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full-size image modal */}
      {selectedImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="p-4 bg-slate-300 rounded shadow-lg max-w-screen-lg max-h-screen overflow-auto">
          <button
              onClick={() => setSelectedImages([])}
              className="p-2 bg-red-500 text-white rounded mt-4"
            >
              Close
            </button>
            <div className="grid grid-cols-1 gap-4  p-4">
              {selectedImages.map((url, index) => (
                <img key={index} src={url} alt="Full Size" className="w-full rounded-lg" />
              ))}
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
