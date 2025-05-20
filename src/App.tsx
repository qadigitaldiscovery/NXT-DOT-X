import React, { useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";

function App() {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (error) {
    // If useNavigate is used outside Router context, fallback to no-op
    navigate = () => {};
  }

  useEffect(() => {
    // Redirect to main dashboard
    navigate("/master");
  }, [navigate]);

  return null; // No need to render anything as we're redirecting
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
