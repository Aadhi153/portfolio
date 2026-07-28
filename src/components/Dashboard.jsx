import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Filter, Calendar, ChevronDown, Info, Maximize2, 
  LayoutDashboard, Table as TableIcon, TrendingUp, Users 
} from 'lucide-react';
import './Dashboard.css';

// --- Mock Data ---
const kpiData = [
  { label: 'Total Revenue (YTD)', value: '$86.4K', trend: '+8%', color: 'var(--accent-purple)' },
  { label: 'Total Orders (YTD)', value: '21.3K', trend: '+5%', color: 'var(--accent-pink)' },
];

const caseTypeData = [
  { name: 'Classic', value: 45, color: '#0088FE' },
  { name: 'Supreme', value: 28, color: '#00C49F' },
  { name: 'Veggie', value: 15, color: '#FFBB28' },
  { name: 'Chicken', value: 12, color: '#a78bfa' },
];

const timeBandData = [
  { band: 'Q1 2019', 'Small': 28, 'Medium': 94, 'Large': 133, total: 255 },
  { band: 'Q2 2019', 'Small': 22, 'Medium': 88, 'Large': 128, total: 238 },
  { band: 'Q3 2019', 'Small': 26, 'Medium': 96, 'Large': 140, total: 262 },
  { band: 'Q4 2019', 'Small': 30, 'Medium': 102, 'Large': 148, total: 280 },
  { band: 'Q1 2020', 'Small': 24, 'Medium': 90, 'Large': 135, total: 249 },
  { band: 'Q2 2020', 'Small': 32, 'Medium': 110, 'Large': 155, total: 297 },
  { band: 'Q3 2020', 'Small': 35, 'Medium': 118, 'Large': 162, total: 315 },
];

const trendData = [
  { date: 'Jul 2018', classic: 5200, supreme: 3100, veggie: 1600 },
  { date: 'Jan 2019', classic: 5350, supreme: 3050, veggie: 1650 },
  { date: 'Jul 2019', classic: 5100, supreme: 3200, veggie: 1580 },
  { date: 'Jan 2020', classic: 5700, supreme: 3350, veggie: 1720 },
  { date: 'Jul 2020', classic: 6100, supreme: 3600, veggie: 1810 },
  { date: 'Jan 2021', classic: 6350, supreme: 3750, veggie: 1890 },
];

const specialtyData = [
  { name: 'Classic Pepperoni', count: 80 },
  { name: 'BBQ Chicken', count: 36 },
  { name: 'Margherita', count: 34 },
  { name: 'Veggie Supreme', count: 35 },
  { name: 'Hawaiian', count: 26 },
];

export default function Dashboard() {
  const [view, setView] = useState('summary'); // 'summary' or 'detailed'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Header / Nav */}
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>{view === 'summary' ? 'Pizza Sales Dashboard' : 'Detailed View'}</h1>
          <span className="last-updated">Last Updated: Nov 2025</span>
        </div>
        
        <div className="dashboard-controls">
          <div className="view-toggle">
            <button 
              className={view === 'summary' ? 'active' : ''} 
              onClick={() => setView('summary')}
            >
              <LayoutDashboard size={16} /> Summary
            </button>
            <button 
              className={view === 'detailed' ? 'active' : ''} 
              onClick={() => setView('detailed')}
            >
              <TableIcon size={16} /> Detailed
            </button>
          </div>
          
          <button className="filter-btn" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter size={18} /> Filters
          </button>
        </div>
      </header>

      {/* Filters Sidebar/Top */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            className="filters-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="filter-group">
              <label><Calendar size={14} /> Order Date Range</label>
              <div className="date-inputs">
                <input type="text" defaultValue="01-06-2025" />
                <span>to</span>
                <input type="text" defaultValue="30-11-2025" />
              </div>
            </div>
            <div className="filter-group">
              <label>Pizza Category</label>
              <select><option>All</option></select>
            </div>
            <div className="filter-group">
              <label>Store Region</label>
              <select><option>All</option></select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'summary' ? (
        <div className="dashboard-content summary-view">
          {/* Top Row: KPIs and Key Indicators */}
          <div className="dashboard-row top-row">
            <div className="kpi-section">
              {kpiData.map((kpi, i) => (
                <motion.div 
                  key={i} 
                  className="kpi-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ '--card-accent': kpi.color }}
                >
                  <div className="kpi-val">{kpi.value}</div>
                  <div className="kpi-label">{kpi.label}</div>
                  <div className="kpi-trend">{kpi.trend}</div>
                </motion.div>
              ))}
            </div>

            <div className="main-chart-card card-glass">
              <div className="card-header">
                <h3>Quarterly Orders by Size</h3>
                <div className="chart-actions">
                  <button className="active">Average</button>
                  <button>Median</button>
                </div>
              </div>
              <div className="chart-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeBandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="band" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 12}} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend iconType="circle" />
                    <Bar dataKey="Small" stackId="a" fill="var(--accent-cyan)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Medium" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="Large" stackId="a" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="specialty-list card-glass">
              <h3>Top Selling Pizzas</h3>
              <div className="specialty-items">
                {specialtyData.map((item, i) => (
                  <div key={i} className="specialty-item">
                    <span className="spec-name">{item.name}</span>
                    <span className="spec-count">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Row: Donut and Trends */}
          <div className="dashboard-row middle-row">
            <div className="donut-card card-glass">
              <h3>Sales by Pizza Category</h3>
              <div className="donut-wrapper">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={caseTypeData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {caseTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
                <div className="donut-center">
                  <div className="center-val">100</div>
                  <div className="center-label">% of Sales</div>
                </div>
              </div>
            </div>

            <div className="trend-card card-glass">
              <h3>Monthly Sales Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 11}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 11}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="classic" stroke="var(--accent-cyan)" fillOpacity={1} fill="url(#colorOut)" />
                  <Line type="monotone" dataKey="supreme" stroke="var(--accent-pink)" dot={false} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-content detailed-view">
          <div className="matrix-card card-glass">
            <div className="matrix-table-wrapper">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th>Category / Size</th>
                    <th>Small</th>
                    <th>Medium</th>
                    <th>Large</th>
                    <th className="total-col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group-header">
                    <td>Nov 2025</td>
                    <td>572</td>
                    <td>2,293</td>
                    <td>5,024</td>
                    <td className="total-col">7,889</td>
                  </tr>
                  <tr>
                    <td className="indent-1">Classic Pepperoni</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td className="total-col">3,502</td>
                  </tr>
                  <tr>
                    <td className="indent-2">BBQ Chicken</td>
                    <td>...</td>
                    <td>...</td>
                    <td>821</td>
                    <td className="total-col">821</td>
                  </tr>
                  {/* More rows would be here */}
                  <tr className="footer-row">
                    <td>Total</td>
                    <td>1,885</td>
                    <td>7,776</td>
                    <td>19,857</td>
                    <td className="total-col">29,518</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
