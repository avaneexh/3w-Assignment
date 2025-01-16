import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/user" />} /> {/* Default route */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
          path="/admin"
          element={sessionStorage.getItem("isAdmin") === "true" ? (<AdminPage />) : (<Navigate to="/admin-login" />)}
        />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
