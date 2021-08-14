import { Interpolation, Svg } from 'chartist';

export const getCompletedTasksChart = (delays = 80, durations = 500) => {
  return {
    data: {
      labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    },
    options: {
      lineSmooth: Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      draw: function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };
};
