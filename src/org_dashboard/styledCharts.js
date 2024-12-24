import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StyledCharts = ({ revenueGrowth, investorDistribution }) => {
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          callback: function(value) {
            return value + 'k';
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderColor: '#ffa726',
        borderWidth: 1
      },
      point: {
        radius: 1,
        borderColor: '#ffa726',
        backgroundColor: '#ffa726',
        hoverRadius: 4
      }
    }
  };

  const lineData = {
    labels: revenueGrowth.map(metric => 
      new Date(metric.report_month).toLocaleString("default", { month: "short" })
    ),
    datasets: [
      {
        data: revenueGrowth.map(metric => parseFloat(metric.net_income) / 1000),
        fill: false,
      }
    ]
  };

  const pieData = {
    labels: investorDistribution.map(investor => investor.name),
    datasets: [
      {
        data: investorDistribution.map(investor => investor.percentage),
        backgroundColor: investorDistribution.map((_, index) => 
          `rgba(66, 133, 244, ${1 - index * 0.2})`
        ),
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#7F7F7F',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <>
      <div className="chart-container">
        <h3 className="section-title">Revenue Graph</h3>
        <div className="chart-box">
          <div style={{ height: '250px' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="section-title">Investor Distribution</h3>
        <div className="chart-box">
          <div style={{ height: '220px' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StyledCharts;