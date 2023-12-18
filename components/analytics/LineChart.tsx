"use client";
import { Line } from "react-chartjs-2";
import moment from "moment";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(54, 162, 235)",
  "rgb(64, 224, 208)",
  "#6366f1",
  "#ec4899",
];

export default function LineChart({ data, name }) {
  const chartData = {
    labels: data?.analytics?.map(
      (dataPoint: { quizTime: moment.MomentInput }) =>
        moment(dataPoint.quizTime).format("YYYY-MM-DD HH:mm:ss")
    ),
    datasets: [
      {
        label: name,
        data: data?.analytics?.map(
          (dataPoint: { quizAvarage: any }) => dataPoint.quizAvarage
        ),
        borderColor: chartColors || "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        yAxisID: "y",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            const dataPoint = data?.analytics?.[index];

            if (dataPoint) {
              return `${moment(dataPoint.quizTime).format(
                "YYYY-MM-DD HH:mm:ss"
              )} - User: ${dataPoint.userName}`;
            }
            return "";
          },
        },
      },
    },
    maintainAspectRatio: true,
    scales: {
      y: {
        display: true,
        position: "left",
      },
      x: {
        display: true,
      },
    },
  } as const;
  return (
    <>
      <Line data={chartData} options={chartOptions} />
    </>
  );
}
