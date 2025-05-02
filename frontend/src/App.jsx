import React, { useEffect } from "react";
import Navbar from "./assets/components/Navbar";
import HomePage from "./assets/Pages/HomePage";
import SignUpPage from "./assets/Pages/SignUpPage";
import LoginPage from "./assets/Pages/LoginPage";
import SettingsPage from "./assets/Pages/SettingsPage";
import ProfilePage from "./assets/Pages/ProfilePage";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore";
import NotFound from "./assets/Pages/NotFound";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="dlex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
  <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
  <Route path="/signup" element={<SignUpPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

  <Route path="*" element={<NotFound />} />
</Routes>


      <Toaster />
    </div>
  );
};

export default App;
