import { Heart, Bell, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarActions() {
  return (
    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
      <Link
        to="/saved-jobs"
        className="hover:text-red-500 transition"
        title="Saved Jobs"
      >
        <Heart size={18} />
      </Link>
      <Link
        to="/messages"
        className="hover:text-black dark:hover:text-white transition"
        title="Messages"
      >
        <Mail size={18} />
      </Link>
    </div>
  );
}
