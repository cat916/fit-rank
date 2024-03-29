"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

export function CaloriesBurnedChart({ fitnessHistory }) {
  const [startDate, setStartDate] = useState(""); // Start date for filter
  const [endDate, setEndDate] = useState(""); // End date for filter

  // Extracting data for the chart based on the selected date range
  const filteredData = fitnessHistory.filter(
    (entry) =>
      (!startDate || entry.date >= startDate) &&
      (!endDate || entry.date <= endDate)
  );

  const caloriesData = {};
  filteredData.forEach((entry) => {
    entry.activeInfo.choosenActivity.forEach((activity) => {
      const activityName = activity.activityName;
      const caloriesBurned = activity.caloriesBurned;
      caloriesData[activityName] = {
        ...caloriesData[activityName],
        [entry.date]:
          (caloriesData[activityName]?.[entry.date] || 0) + caloriesBurned,
      };
    });
  });

  const labels = Object.keys(caloriesData["swim"]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "swim",
        data: Object.values(caloriesData["swim"] || {}),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "run",
        data: Object.values(caloriesData["run"] || {}),
        backgroundColor: "rgba(245, 40, 145, 0.8)",
        borderColor: "rgba(245, 40, 145, 1)",
        borderWidth: 2,
      },
      {
        label: "bike",
        data: Object.values(caloriesData["bike"] || {}),
        backgroundColor: "rgba(56, 39, 245, 0.8)",
        borderColor: "rgba(56, 39, 245, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Calories Burned",
        },
      },
      x: {
        ticks: {
          maxRotation: 45, // or any angle you prefer
          minRotation: 45,  // making minRotation the same as maxRotation forces a fixed angle
          font: {
            size: 10 // Set this to the size you want
          }
        },
        title: {
          display: true,
          text: 'Date',

        },
      },
    },
  };

  

  return (
    <div className="mx-4">
      <h2 className="flex justify-center text-sm py-4">Calories Burned by Activity</h2>
      <div>
        <label className="block text-xxs">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-200 rounded pl-2 w-32 my-1"
        />
      </div>
      <div>
        <label className="block text-xxs">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-200 rounded pl-2 w-32 my-1 "
        />
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};