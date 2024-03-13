import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TotalAppointmentChat = (props) => {
  const {data:{totalAppointmentMonthly}} = props

  const getMonthName = (monthValue) => {
    const monthDate = new Date(2023, monthValue - 1, 1); // Using a specific year (2023) and setting the day to 1
    const monthName = monthDate.toLocaleString('en-US', { month: 'short' });
    return monthName;
  }

  let dataSet = []
  if(totalAppointmentMonthly) {
    dataSet = totalAppointmentMonthly.map((item) => {
      return { label: getMonthName(item.x), y: item.y }
    })
  }

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: false,
    title: {
      text: "Number of Appointments"
    },
    
    data: [
    {
      type: "area",
      xValueFormatString: "YYYY",
      dataPoints: dataSet
    }
    ]
  }


  return (
    <div>
    {
      totalAppointmentMonthly && (
        <CanvasJSChart options={options} />
      )
    }
      
    </div>
  );
};

export default TotalAppointmentChat;
