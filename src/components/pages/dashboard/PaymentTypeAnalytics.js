import React from 'react';
import ChartistGraph from 'react-chartist';
import { useHistory } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../services/routeService';

const PaymentTypeAnalytics = () => {
  const { push } = useHistory();
  const onClick = () => {
    push(PAGE_ROUTES.paymentTypeAnalytics);
  };
  const paymetTypeAnalyticOptions = {
    title: 'Pie chart',
    desc: 'Pie chart description',
    className: 'ct-octave',
    // TODO
    // Set the correct paymet type
    data: {
      series: [10, 2, 4, 3],
      labels: ['Cash', 'E-Cards', 'Credit sales', 'Cheques'],
    },
    type: 'Pie',
    mainPath: PAGE_ROUTES.mostSelledItems,
  };
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = paymetTypeAnalyticOptions;
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
export default PaymentTypeAnalytics;
