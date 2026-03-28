import React from 'react';
import { FaChartLine } from 'react-icons/fa';

const TradingDashboard = () => {
  return (
    <div className="bg-cream h-screen flex flex-col">
      {/* Fixed Price Ticker Bar */}
      <div className="bg-void text-gold px-4 py-2 fixed w-full top-0 flex justify-between items-center shadow-lg">
        <h1 className="font-bebas-neue text-xl">Price Ticker</h1>
        <div className="flex space-x-4">
          <div className="badge bg-gold text-void px-2 py-1 rounded">BTC: $43,000</div>
          <div className="badge bg-gold text-void px-2 py-1 rounded">ETH: $2,500</div>
        </div>
      </div>

      {/* Alert Bar */}
      <div className="bg-gold text-void text-center py-2 mt-14">
        <p>🔔 High-impact events happening now!</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-row mt-20">
        {/* Sidebar */}
        <div className="w-1/4 bg-void text-cream p-4">
          <h2 className="font-bebas-neue text-lg">Market Flash</h2>
          <p>Lorem ipsum dolor sit amet</p>
          <h2 className="font-bebas-neue text-lg mt-4">Economic Calendar</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>

        {/* Main Content Area */}
        <div className="w-2/4 p-4">
          <h2 className="font-bebas-neue text-lg">Market Overview</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <h2 className="font-bebas-neue text-lg mt-4">Trading Insights</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* Status Bar */}
        <div className="w-1/4 bg-void text-cream p-4">
          <h2 className="font-bebas-neue text-lg">Status</h2>
          <p>All systems operational</p>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;
