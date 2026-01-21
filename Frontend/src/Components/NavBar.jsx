import { useState } from "react";
import NavbarGuest from "../context/NavbarGuest";
import NavbarLoggedIn from "./NavbarLoggedIn";
import { useAuth } from "../context/AuthContext";
import ProfileDrawer from "./ProfileDrawer";

export default function NavBar() {
  const { user, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  if (loading) {
    return <div className="h-18.25 w-full animate-pulse bg-white" />;
  }

  return (
    <>
      {user ? (
        <NavbarLoggedIn onProfileOpen={() => setShowProfile(true)} />
      ) : (
        <NavbarGuest />
      )}
      <ProfileDrawer
        open={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
}
