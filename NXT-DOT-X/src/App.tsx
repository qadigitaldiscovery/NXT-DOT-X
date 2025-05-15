
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main dashboard
    navigate("/master");
  }, [navigate]);

  return null; // No need to render anything as we're redirecting
}

export default App;
