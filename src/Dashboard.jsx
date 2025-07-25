import React, { useState } from 'react';
import './Dashboard.css';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LabelList
} from 'recharts';

const Dashboard = () => {
  const [streak, setStreak] = useState(5);
  const [completedVideos, setCompletedVideos] = useState(12);
  const [totalVideos, setTotalVideos] = useState(20);

  const leftVideos = totalVideos - completedVideos;

  const data = [
    { day: 'Mon', minutes: 120 },
    { day: 'Tue', minutes: 90 },
    { day: 'Wed', minutes: 150 },
    { day: 'Thu', minutes: 110 },
    { day: 'Fri', minutes: 80 },
    { day: 'Sat', minutes: 200 },
    { day: 'Sun', minutes: 170 }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">📊 Progress Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>🔥 Streak</h3>
          <p>{streak} days</p>
        </div>
        <div className="card">
          <h3>✅ Completed Videos</h3>
          <p>{completedVideos}</p>
        </div>
        <div className="card">
          <h3>📂 Videos Left</h3>
          <p>{leftVideos}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">📈 Weekly Study Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 14 }} />
            <YAxis
              tick={{ fontSize: 14 }}
              label={{
                value: 'Minutes Studied',
                angle: -90,
                position: 'insideLeft',
                offset: 10
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutes" fill="#4f46e5" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="minutes" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;