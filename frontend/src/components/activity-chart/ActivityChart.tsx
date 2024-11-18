import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import YearSelector from './YearSelector';
import './ActivityChart.css'; // Import CSS

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActivityChart: React.FC<{ userId: string }> = ({ userId }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [activityData, setActivityData] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:8080/api/reviews/activity-summary`, {
          params: { userId, year },
        });
        const transformedData = Object.entries(response.data).map(([month, mediaTypes]) => ({
          month,
          ...(mediaTypes as Record<string, number>),
        }));
        setActivityData(transformedData);
      } catch (error) {
        console.error('Error fetching activity data', error);
        setActivityData([]); 
      }
    };
    fetchActivityData();
  }, [userId, year]);

  const data = {
    labels: activityData.map((data) => data.month),
    datasets: [
      { label: 'Book', data: activityData.map((data) => data['Book'] || 0), backgroundColor: '#4caf50' },
      { label: 'Movie', data: activityData.map((data) => data['Movie'] || 0), backgroundColor: '#ff9800' },
      { label: 'TV Show', data: activityData.map((data) => data['TV Show'] || 0), backgroundColor: '#2196f3' },
      { label: 'Video Game', data: activityData.map((data) => data['Video Game'] || 0), backgroundColor: '#f44336' },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { 
        stacked: true, 
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Only show whole numbers on y-axis
          callback: (value: any) => Number(value).toFixed(0), // Convert values to integers
        },
      },
    },
  };

  return (
    <div className="activity-container">
      <div style={{ flex: 1 }}>
        <Bar data={data} options={options} />
      </div>
      <YearSelector selectedYear={year} onYearChange={setYear} userId={userId} />
    </div>
  );
};

export default ActivityChart;