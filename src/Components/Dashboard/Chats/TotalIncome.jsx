import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TotalIncome = (props) => {
  const {data:{totalMonthlyIncome}} = props

  const getMonthName = (monthValue) => {
    const monthDate = new Date(2023, monthValue - 1, 1); // Using a specific year (2023) and setting the day to 1
    const monthName = monthDate.toLocaleString('en-US', { month: 'short' });
    return monthName;
  }

  let dataSet = []
  if(totalMonthlyIncome) {
    dataSet = totalMonthlyIncome.map((item) => {
      return { label: getMonthName(item.x), y: item.y }
    })
  }
  const options = {
    title: {
      text: 'Total Income',
    },
    data: [
      {
        type: 'line',
        dataPoints: dataSet,
      },
    ],
  };

  return (
    <div>
      {
        totalMonthlyIncome && (
          <CanvasJSChart options={options} />
        )
      }
      
    </div>
  );
};

export default TotalIncome;
