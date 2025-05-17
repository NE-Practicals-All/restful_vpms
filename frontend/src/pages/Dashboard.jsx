import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getSlotRequests, getUsers, getVehicles, getParkingSlots } from '../utils/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    totalUsers: 0,
    totalVehicles: 0,
    totalSlots: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const [requestsRes, usersRes, vehiclesRes, slotsRes] = await Promise.all([
          getSlotRequests(1, 1000, ''),
          getUsers(1, 1000, ''),
          getVehicles(1, 1000, ''),
          getParkingSlots(1, 1000, ''),
        ]);

        const requests = requestsRes.data.data;
        const pending = requests.filter((r) => r.request_status === 'pending').length;
        const approved = requests.filter((r) => r.request_status === 'approved').length;
        const rejected = requests.filter((r) => r.request_status === 'rejected').length;

        setStats({
          pending,
          approved,
          rejected,
          totalUsers: usersRes.data.meta.totalItems,
          totalVehicles: vehiclesRes.data.meta.totalItems,
          totalSlots: slotsRes.data.meta.totalItems,
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch stats');
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  const pieData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        data: [stats.pending, stats.approved, stats.rejected],
        backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],  // Yellow, Green, Red
        borderColor: ['#D97706', '#059669', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const statItems = [
    { label: 'Total Users', value: stats.totalUsers, bgColor: 'bg-green-700' },
    { label: 'Total Vehicles', value: stats.totalVehicles, bgColor: 'bg-green-500' },
    { label: 'Total Slots', value: stats.totalSlots, bgColor: 'bg-green-400' },
    { label: 'Pending Requests', value: stats.pending, bgColor: 'bg-yellow-400' },
  ];

  return (
    <div className="container mx-auto p-6 bg-accent min-h-screen">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Dashboard</h1>

      {error && <p className="text-red-600 font-semibold mb-6 text-center">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-secondary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
              Slot Request Status
            </h2>
            <Pie
              data={pieData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#166534',
                      font: { weight: 'bold' },
                    },
                  },
                  tooltip: { backgroundColor: '#10B981' },
                },
              }}
            />
          </div>

          <div className="max-w-lg mx-auto space-y-6">
            {statItems.map(({ label, value, bgColor }) => (
              <div
                key={label}
                className="flex justify-between items-center bg-white p-5 rounded-xl shadow-lg"
              >
                <div className="text-lg font-semibold text-gray-800">{label}</div>
                <div
                  className={`text-3xl font-bold text-white px-6 py-3 rounded-lg ${bgColor} min-w-[90px] text-center`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
