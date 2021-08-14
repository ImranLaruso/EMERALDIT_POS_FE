import React from 'react';
import ChartistGraph from 'react-chartist';
import { useHistory } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../services/routeService';

const LineGraph = () => {
  const { push } = useHistory();
  const onClick = () => {
    push(PAGE_ROUTES.lineGraph);
  };
  const lineGraphOptions = {
    title: 'Sample Line Graph2',
    desc: 'Sample Line Graph2 description',
    className: 'ct-octave',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
    },
    type: 'Line',
    mainPath: PAGE_ROUTES.bestSellingCustomer,
  };

  const { className, type, data, options } = lineGraphOptions;
  return (
    <div onClick={onClick}>
      <ChartistGraph
        className={className}
        data={data}
        type={type}
        options={options}
      />
    </div>
  );
};

export default LineGraph;
