
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
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-10">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to NXT Level Platform</h1>
        <p className="text-lg text-gray-200 mb-10">Select a module to get started</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Data Management */}
          <div
            className="bg-nxt-primary text-white rounded-xl p-8 shadow-lg hover:bg-nxt-primary/90 transition flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/data-management")}
          >
            <span className="text-2xl font-semibold mb-2">Data Management</span>
            <span className="text-sm opacity-80 text-center">Manage costs, pricing, suppliers, and more</span>
          </div>
          
          {/* Loyalty Rewards */}
          <div
            className="bg-nxt-secondary text-white rounded-xl p-8 shadow-lg hover:bg-nxt-secondary/90 transition flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/loyalty-rewards")}
          >
            <span className="text-2xl font-semibold mb-2">Loyalty Rewards</span>
            <span className="text-sm opacity-80 text-center">Reward and engage your loyal customers</span>
          </div>
          
          {/* Trading System */}
          <div
            className="bg-nxt-accent text-white rounded-xl p-8 shadow-lg hover:bg-nxt-accent/90 transition flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/trading-system")}
          >
            <span className="text-2xl font-semibold mb-2">Trading System</span>
            <span className="text-sm opacity-80 text-center">Access trading analytics and operations</span>
          </div>
          
          {/* Tech Hub */}
          <div
            className="bg-purple-600 text-white rounded-xl p-8 shadow-lg hover:bg-purple-700 transition flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/tech-hub")}
          >
            <span className="text-2xl font-semibold mb-2">Tech Hub</span>
            <span className="text-sm opacity-80 text-center">Access AI tools and technical integrations</span>
          </div>
          
          {/* Social Media */}
          <div
            className="bg-blue-600 text-white rounded-xl p-8 shadow-lg hover:bg-blue-700 transition flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/social-media")}
          >
            <span className="text-2xl font-semibold mb-2">Social Media</span>
            <span className="text-sm opacity-80 text-center">Manage social accounts and content</span>
          </div>
          
          {/* DOT-X */}
          <div
            className="bg-indigo-600 text-white rounded-xl p-8 shadow-lg hover:bg-indigo-700 transition flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/dot-x")}
          >
            <span className="text-2xl font-semibold mb-2">DOT-X</span>
            <span className="text-sm opacity-80 text-center">Advanced command center with AI agents</span>
          </div>
          
          {/* Additional modules can be added as needed */}
        </div>
      </div>
    </div>
  );
};

export default MasterDash;
