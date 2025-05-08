n// BACKUP: Previous placeholder code
// const MasterDash = () => {
//   // ... existing code ...
// }
// export default MasterDash;

import React from "react";
import { useNavigate } from "react-router-dom";

const MasterDash = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/masterdash-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content with z-index to appear above the background */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to NXT Level Platform</h1>
        <p className="text-lg text-gray-200 mb-10">Select a module to get started</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Data Management */}
          <button
            className="bg-nxt-primary text-white rounded-xl p-8 shadow-lg hover:bg-nxt-primary/90 transition flex flex-col items-center"
            onClick={() => navigate("/data-management")}
          >
            <span className="text-2xl font-semibold mb-2">Data Management</span>
            <span className="text-sm opacity-80">Manage costs, pricing, suppliers, and more</span>
          </button>
          {/* Loyalty Rewards */}
          <button
            className="bg-nxt-secondary text-white rounded-xl p-8 shadow-lg hover:bg-nxt-secondary/90 transition flex flex-col items-center"
            onClick={() => navigate("/loyalty-rewards")}
          >
            <span className="text-2xl font-semibold mb-2">Loyalty Rewards</span>
            <span className="text-sm opacity-80">Reward and engage your loyal customers</span>
          </button>
          {/* Trading System */}
          <button
            className="bg-nxt-accent text-white rounded-xl p-8 shadow-lg hover:bg-nxt-accent/90 transition flex flex-col items-center"
            onClick={() => navigate("/trading-system")}
          >
            <span className="text-2xl font-semibold mb-2">Trading System</span>
            <span className="text-sm opacity-80">Access trading analytics and operations</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterDash; 