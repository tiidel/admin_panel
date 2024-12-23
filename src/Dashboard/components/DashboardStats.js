import { DollarSign, LogIn, LogOut, ShoppingBag, Users } from 'lucide-react';
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const StatCard = ({ title, value, icon, change, period }) => {
  const isPositive = parseFloat(change) > 0;
  const badgeClass = isPositive ? 'badge-success' : 'badge-danger';
  
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h5 className="stat-title">{title}</h5>
        <div className="stat-icon">
          {icon}
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-footer">
        <span className={`badge ${badgeClass}`}>
          <span>{change}%</span>
        </span>
        <span className="text-muted">{period}</span>
      </div>
    </div>
  );
};

const MovementChart = () => {
  const data = [
    { name: 'Jan', value: 2115 },
    { name: 'Feb', value: 1562 },
    { name: 'Mar', value: 1584 },
    { name: 'Apr', value: 1892 },
    { name: 'May', value: 1587 },
    { name: 'Jun', value: 1923 },
  ];

  return (
    <div className="movement-card">
      <div className="movement-header">
        <h5 className="movement-title">Recent Movement</h5>
        <div className="movement-controls">
          <select className="movement-select">
            <option>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
            <option>Apr</option>
          </select>
          <input 
            type="text" 
            className="movement-search"
            placeholder="Search.."
          />
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DashboardStats = () => {

  return (
    <div className="dashboard-stats">
      <div className="stats-cards">
        <div className="stats-row">
          <StatCard
            title="Investments"
            value="2,382"
            icon={<LogIn size={24} />}
            change="-3.65"
            period="Since last week"
          />
          <StatCard
            title="Withdrawals"
            value="$21,300"
            icon={<LogOut size={24} />}
            change="6.65"
            period="Since last week"
          />
        </div>
        <div className="stats-row">
          <StatCard
            title="Visitors"
            value="14,212"
            icon={<Users size={24} />}
            change="5.25"
            period="Since last week"
          />
          <StatCard
            title= "Orders"
            value="64"
            icon= {<ShoppingBag size={24} />}
            change="-2.25"
            period="Since last week"
          />
        </div>
      </div>
      <MovementChart />
    </div>
  );
};

export default DashboardStats;