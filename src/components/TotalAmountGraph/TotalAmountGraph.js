import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const TotalAmountsChart = ({ transactions }) => {
  const [options, setOptions] = useState({
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: []
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'Total amount',
      data: []
    }
  ]);

  useEffect(() => {
    const categories = transactions.map(transaction => transaction.date); // Assuming transactions have a 'date' field
    const data = transactions.map(transaction => transaction.amount); // Assuming transactions have an 'amount' field

    setOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        categories
      }
    }));

    setSeries([{
      name: 'Total amount',
      data
    }]);
  }, [transactions]);

  return (
    <div className="bar-chart">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="1000"
      />
    </div>
  );
}

export default TotalAmountsChart;
