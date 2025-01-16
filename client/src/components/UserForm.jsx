import { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [formData, setFormData] = useState({ name: "", socialHandle: "", images: [] });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const images = [];
    for (const file of files) {
      const reader = new FileReader();
      const imagePromise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const base64Image = await imagePromise;
      images.push(base64Image);
    }
    setFormData({ ...formData, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.socialHandle || formData.images.length === 0) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/submissions", formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setFormData({ name: "", socialHandle: "", images: [] });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-w-full justify-center items-center ">
      <h1 className="text-2xl mb-4">User Submission Form</h1>
      <form onSubmit={handleSubmit} className="w-1/2 bg-gray-100 p-8 shadow-lg rounded">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 mb-4 border"
          required
        />
        <input
          type="text"
          placeholder="Social Media Handle"
          value={formData.socialHandle}
          onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
          className="w-full p-2 mb-4 border"
          required
        />
        <input type="file" multiple onChange={handleImageChange} className="w-full p-2 mb-4" required />
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${loading ? "bg-gray-500" : "bg-green-500"}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {success && (
        <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-500 text-blue-800 px-4 py-2 rounded shadow">
          <p>Submission successful!</p>
          <button onClick={() => setSuccess(false)} className="text-sm text-blue-600 mt-2">
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default UserForm;
