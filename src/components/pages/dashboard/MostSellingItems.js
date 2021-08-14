import React from 'react';
import { getCompletedTasksChart } from '../../../utilities/helpers/graphHelpers/completedSalesChart';
import { useHistory } from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import { PAGE_ROUTES } from '../../../services/routeService';

const MostSellingItems = () => {
  const { push } = useHistory();
  const onClick = () => {
    push(PAGE_ROUTES.mostSelledItems);
  };
  const completedTasksChart = getCompletedTasksChart();
  const completedTasksChartOptions = {
    title: 'Complted Tasks Chart Title',
    desc: 'Complted Tasks Chart description',
    className: 'ct-chart',
    data: completedTasksChart.data,
    type: 'Line',
    options: completedTasksChart.options,
    listener: completedTasksChart.animation,
  };
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = completedTasksChartOptions;
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
export default MostSellingItems;
