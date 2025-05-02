import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <AlertTriangle className="w-16 h-16 text-error mb-4" />
      <h1 className="text-4xl font-bold text-error">404 - Page Not Found</h1>
      <p className="text-base-content/70 mt-2">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
