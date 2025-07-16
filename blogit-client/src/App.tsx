import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BlogsPage from "./pages/BlogsPage";
import ProfilePage from "./pages/ProfilePage";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/blogs"
          element={
            <RequireAuth>
              <BlogsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<h2>404 - Page not found</h2>} />
      </Routes>
    </>
  );
}
