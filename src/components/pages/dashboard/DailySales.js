import React from 'react';
import { useHistory } from 'react-router-dom';
import { getDailySalesChartProps } from '../../../utilities/helpers/graphHelpers/dailySalesChartHelpers';
import ChartistGraph from 'react-chartist';
import { PAGE_ROUTES } from '../../../services/routeService';

const DailySales = () => {
  const { push } = useHistory();
  const onClick = () => {
    push(PAGE_ROUTES.dailySales);
  };
  const dailySalesChart = getDailySalesChartProps();
  const dailySalesChartOptions = {
    className: 'ct-octave',
    data: dailySalesChart.data,
    type: 'Bar',
    options: dailySalesChart.options,
    listener: dailySalesChart.animation,
  };
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = dailySalesChartOptions;
  return (
    <div onClick={onClick}>
      <ChartistGraph
        className={className}
        data={data}
        type={type}
        options={options}
        responsiveOptions={responsiveOptions}
        listener={listener}
      />
    </div>
  );
};

export default DailySales;
