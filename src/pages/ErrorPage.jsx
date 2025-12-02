import React from "react";
import { Link } from "react-router";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center gap-10 justify-center h-screen">
      <h1 className="text-7xl font-black">
        <span className="text-orange-600 pr-3">404</span>Page Not Found
      </h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link to="/">
          <button className="button-2">Go to Home</button>
        </Link>
    </div>
  );
}

export default ErrorPage;
