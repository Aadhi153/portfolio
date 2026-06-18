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
  { label: 'Latest Month Wait List', value: '679K', trend: '+12%', color: 'var(--accent-purple)' },
  { label: 'PY Latest Month Wait List', value: '620K', trend: '+5%', color: 'var(--accent-pink)' },
];

const caseTypeData = [
  { name: 'Outpatient', value: 80, color: '#0088FE' },
  { name: 'Day Case', value: 19, color: '#00C49F' },
  { name: 'Inpatient', value: 12, color: '#FFBB28' },
];

const timeBandData = [
  { band: '18+ Months', '0-15': 118, '16-64': 94, '65+': 133, total: 345 },
  { band: '0-3 Months', '0-15': 66, '16-64': 45, '65+': 108, total: 219 },
  { band: '3-6 Months', '0-15': 51, '16-64': 44, '65+': 74, total: 169 },
  { band: '6-9 Months', '0-15': 44, '16-64': 40, '65+': 60, total: 144 },
  { band: '9-12 Months', '0-15': 38, '16-64': 35, '65+': 52, total: 125 },
  { band: '12-15 Months', '0-15': 32, '16-64': 30, '65+': 45, total: 107 },
  { band: '15-18 Months', '0-15': 28, '16-64': 25, '65+': 40, total: 93 },
];

const trendData = [
  { date: 'Jul 2018', outpatient: 52000, dayCase: 15000, inpatient: 8000 },
  { date: 'Jan 2019', outpatient: 53500, dayCase: 14800, inpatient: 8200 },
  { date: 'Jul 2019', outpatient: 51000, dayCase: 15200, inpatient: 7900 },
  { date: 'Jan 2020', outpatient: 54000, dayCase: 14500, inpatient: 8500 },
  { date: 'Jul 2020', outpatient: 58000, dayCase: 16000, inpatient: 9000 },
  { date: 'Jan 2021', outpatient: 60500, dayCase: 15800, inpatient: 8800 },
];

const specialtyData = [
  { name: 'Accident & Emergency', count: 80 },
  { name: 'Ophthalmology', count: 36 },
  { name: 'Paed Orthopaedic', count: 34 },
  { name: 'Paediatric Respiratory Med', count: 35 },
  { name: 'Pain Relief', count: 26 },
];

export default function Dashboard() {
  const [view, setView] = useState('summary'); // 'summary' or 'detailed'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Header / Nav */}
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>{view === 'summary' ? 'Patient Wait List Analysis' : 'Detailed View'}</h1>
          <span className="last-updated">Last Updated: Jan 23, 2021</span>
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
              <label><Calendar size={14} /> Archive Date</label>
              <div className="date-inputs">
                <input type="text" defaultValue="31-01-2018" />
                <span>to</span>
                <input type="text" defaultValue="23-01-2021" />
              </div>
            </div>
            <div className="filter-group">
              <label>Case Type</label>
              <select><option>All</option></select>
            </div>
            <div className="filter-group">
              <label>Specialty Name</label>
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
                <h3>Key Indicators - Patient Wait List (Average)</h3>
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
                    <Bar dataKey="0-15" stackId="a" fill="var(--accent-cyan)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="16-64" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="65+" stackId="a" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="specialty-list card-glass">
              <h3>Specialty Ranking</h3>
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
              <h3>Wait List by Case Type</h3>
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
                  <div className="center-val">54</div>
                  <div className="center-label">Overall</div>
                </div>
              </div>
            </div>

            <div className="trend-card card-glass">
              <h3>Wait List Trends</h3>
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
                  <Area type="monotone" dataKey="outpatient" stroke="var(--accent-cyan)" fillOpacity={1} fill="url(#colorOut)" />
                  <Line type="monotone" dataKey="dayCase" stroke="var(--accent-pink)" dot={false} strokeWidth={2} />
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
                    <th>Specialty / Age</th>
                    <th>Day Case</th>
                    <th>Inpatient</th>
                    <th>Outpatient</th>
                    <th className="total-col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group-header">
                    <td>31 January 2018</td>
                    <td>57,267</td>
                    <td>22,937</td>
                    <td>502,482</td>
                    <td className="total-col">582,686</td>
                  </tr>
                  <tr>
                    <td className="indent-1">Accident & Emergency</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td className="total-col">502,482</td>
                  </tr>
                  <tr>
                    <td className="indent-2">0-15</td>
                    <td>...</td>
                    <td>...</td>
                    <td>82,148</td>
                    <td className="total-col">82,148</td>
                  </tr>
                  {/* More rows would be here */}
                  <tr className="footer-row">
                    <td>Total</td>
                    <td>1,885,182</td>
                    <td>777,683</td>
                    <td>19,857,125</td>
                    <td className="total-col">22,519,990</td>
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
