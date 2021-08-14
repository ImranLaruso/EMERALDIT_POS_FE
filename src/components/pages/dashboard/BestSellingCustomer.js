import React from 'react';
import { useHistory } from 'react-router-dom';
import { getEmailSubscriptionChart } from '../../../utilities/helpers/graphHelpers/emailSubscriptionCHart';
import ChartistGraph from 'react-chartist';
import { PAGE_ROUTES } from '../../../services/routeService';

const BestSellingCustomer = () => {
  const { push } = useHistory();
  const onClick = () => {
    push(PAGE_ROUTES.bestSellingCustomer);
  };
  const emailsSubscriptionChart = getEmailSubscriptionChart();
  const emailsSubscriptionChartOptions = {
    title: 'Email subscription Chart',
    desc: 'Email subscription Chart description',
    className: 'ct-octave',
    data: emailsSubscriptionChart.data,
    type: 'Bar',
    options: emailsSubscriptionChart.options,
    listener: emailsSubscriptionChart.animation,
    responsiveOption: emailsSubscriptionChart.responsiveOptions,
  };
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = emailsSubscriptionChartOptions;

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

export default BestSellingCustomer;
