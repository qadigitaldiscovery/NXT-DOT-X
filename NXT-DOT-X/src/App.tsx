
import React from "react";
import MasterDash from "../../src/pages/MasterDash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main dashboard
    navigate("/master");
  }, [navigate]);

  return (
    <div>
      <MasterDash />
    </div>
  );
}

export default App;
