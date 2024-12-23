import React, { useState, useEffect } from 'react';
import DashboardStats from './components/DashboardStats';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './dashboard.css';
import CalendarComponent from './components/calendar/CalendarComponent';



const ActionsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button 
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        •••
      </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <a href="#" className="dropdown-item">Action</a>
        <a href="#" className="dropdown-item">Another action</a>
        <a href="#" className="dropdown-item">Something else here</a>
      </div>
    </div>
  );
};

const BrowserUsage = () => {
  const browsers = [
    { name: 'Chrome', usage: 4306, percentage: 45, color: '#4285f4' },
    { name: 'Firefox', usage: 3801, percentage: 30, color: '#ff7800' },
    { name: 'Edge', usage: 1689, percentage: 15, color: '#ff4444' },
    { name: 'Other', usage: 3251, percentage: 10, color: '#333333' }
  ];

  const total = browsers.reduce((sum, browser) => sum + browser.usage, 0);

  return (
    <div className="card browser-usage">
      <div className="card-header">
        <h5 className="card-title">Browser Usage</h5>
        <ActionsDropdown />
      </div>
      <div className="card-content">
        <div className="chart-container">
        <svg viewBox="0 0 100 100" className="pie-chart">
          {browsers.map((browser, index) => {
            const startAngle = browsers
              .slice(0, index)
              .reduce((sum, b) => sum + b.percentage, 0);
            const endAngle = startAngle + browser.percentage;
            
            const x1 = 50 + 50 * Math.cos(Math.PI * 2 * startAngle / 100);
            const y1 = 50 + 50 * Math.sin(Math.PI * 2 * startAngle / 100);
            const x2 = 50 + 50 * Math.cos(Math.PI * 2 * endAngle / 100);
            const y2 = 50 + 50 * Math.sin(Math.PI * 2 * endAngle / 100);
            
            const largeArcFlag = browser.percentage > 50 ? 1 : 0;
            
            return (
              <path
                key={browser.name}
                d={`M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                fill={browser.color}
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
      </div>

        <div className="browser-stats">
          {browsers.map((browser, index) => (
            <div key={index} className="browser-row">
              <div className="browser-info">
                <div 
                  className="browser-dot" 
                  style={{ backgroundColor: browser.color }}
                />
                <span>{browser.name}</span>
                {browser.change && (
                  <span className={`badge badge-${browser.changeType}`}>
                    {browser.change}
                  </span>
                )}
              </div>
              <span>{browser.usage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const WorldMap = () => {

  return (
    <div className="card world-map">
      <div className="card-header">
        <h5 className="card-title">Real-Time</h5>
        <ActionsDropdown />
      </div>
      <div className="card-content">
        <ComposableMap>
          <Geographies geography='/features.json'>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>

  )
}


const Calendar = () => (
  <div className="card calendar">
    <div className="card-header">
      <h5 className="card-title">Calendar</h5>
      <ActionsDropdown />
    </div>
    <div className="card-content">
      <CalendarComponent />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#F2F4F8'}}>
    <DashboardStats />
    <div className="dashboard">
      <BrowserUsage />
      <WorldMap />
      <Calendar />
    </div>
    </div>
  );
};

export default Dashboard;