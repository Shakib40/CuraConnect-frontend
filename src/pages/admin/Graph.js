import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Graph() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 19, 14, 22, 17, 28, 24],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Bookings Overview' },
    },
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Graph</h2>

      <div className="max-w-3xl rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
