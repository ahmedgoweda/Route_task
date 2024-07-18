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
    <div class="container-fluid mt-3 bg-light d-flex align-content-center  justify-content-center">

    <div className="bar-chart bg-dark col-9 ">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="800"
       height="500"
      />
    </div>
    </div>
  );
}

export default TotalAmountsChart;
