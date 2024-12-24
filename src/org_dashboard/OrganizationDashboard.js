import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, XCircle, TrendingUp, X } from 'lucide-react';
import './OrganizationDashboard.css';
import StyledCharts from './styledCharts';
import { getRequest } from '../api/api';
import { useParams } from 'react-router';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

const OrganizationDashboard = () => {
  const [activeTab, setActiveTab] = useState('investors');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [organization, setOrganization] = useState({})
  const { id } = useParams()

  const investorsData = [
    { investor: "John Doe", amount: 500000, date: "2024-01-15" },
    { investor: "Jane Smith", amount: 750000, date: "2024-02-20" },
    { investor: "Bob Johnson", amount: 300000, date: "2024-03-01" }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  
  useEffect(() => {
    fetch_organization_data();
  }, [])
  

  const fetch_organization_data = async () => {
    console.log('==========???fetching organization data...');
    
    try {
        const response = await getRequest(`/organizations/${id}/`);
        setOrganization(response.data);
    } catch (error) {
        console.error(error);
    }
  }

//   const showGraphs = (type) => {
//     setModalContent(
//       <div className="graphs-container">
//         <div className="graph-section">
//           <h3>Investment Timeline</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={investorsData}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="amount" stroke="var(--primary-color)" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
        
//         <div className="graph-section">
//           <h3>Investment Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 innerRadius={60}
//                 outerRadius={100}
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     );
//     setIsModalOpen(true);
//   };

const showGraphs = (type) => {
    const data = {
        revenueGrowth: [
          { report_month: '2024-01', net_income: '30000' },
          { report_month: '2024-02', net_income: '45000' }
        ],
        investorDistribution: [
          { name: 'Investor A', percentage: 40 },
          { name: 'Investor B', percentage: 30 }
        ]
      };
    setModalContent(
      <div className="graphs-container">
        <StyledCharts revenueGrowth={data.revenueGrowth} investorDistribution={data.investorDistribution} />
      </div>
    );
    setIsModalOpen(true);
  };


  const renderTable = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 className="section-title">Investment History</h2>
        <button className="plot-button" onClick={() => showGraphs('investors')}>
          <TrendingUp size={16} />
          Plot Graphs
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Investor</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {investorsData.map((investor, i) => (
            <tr key={i}>
              <td>{investor.investor}</td>
              <td>{investor?.email}</td>
              <td>{investor?.phone}</td>
              <td>${investor.amount.toLocaleString()}</td>
              <td>{new Date(investor.date).toLocaleDateString()}</td>
              <td>
                <span className='badge pending'>pending</span>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="dashboard-container">
      
      <div className="card org-header">
        <div className="org-info">
          <div className="org-primary">
            <img src={ 'http://localhost:8000' + organization?.logo} alt="logo" className="org-logo" />
            <div>
              <h1 className="org-name">{organization?.name}</h1>
                <div className="badge-container">
                    <span className="badge org-type">{organization?.organization_type}</span>
                    {organization?.verification_status === "VERIFIED" ? (
                    <span className="badge verified">
                        <CheckCircle size={16} /> Verified
                    </span>
                    ) : (
                    <span className="badge unverified">
                        <XCircle size={16} /> Unverified
                    </span>
                    )}
                </div>
              <p className="org-description">{organization?.description}</p>
            </div>
          </div>
        </div>
        <div className="org-metrics">
          <div className="metric">
            <p className="metric-label">Headquarters</p>
            <p className="metric-value">{organization?.headquarters}</p>
          </div>
          <div className="metric">
            <p className="metric-label">Founded</p>
            <p className="metric-value">{new Date(organization?.founded_date).getFullYear()}</p>
          </div>
          <div className="metric">
            <p className="metric-label">Market Cap</p>
            <p className="metric-value">${Number(organization?.market_cap).toLocaleString()}</p>
          </div>
          <div className="metric">
            <p className="metric-label">Share Price</p>
            <p className="metric-value">${Number(organization?.share_price).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-list">
          {['investors', 'financial', 'customer'].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'investors' && renderTable()}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Investment Analytics"
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default OrganizationDashboard;