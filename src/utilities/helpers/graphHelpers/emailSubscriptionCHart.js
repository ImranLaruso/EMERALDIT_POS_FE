export const getEmailSubscriptionChart = (delays2 = 80, durations2 = 500) => {
  return {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [[542, 443, 320, 780, 553, 453]],
    },
    options: {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0,
      },
    },
    responsiveOptions: [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            },
          },
        },
      ],
    ],
    animation: {
      draw: function(data) {
        if (data.type === 'bar') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
        data.element.attr({
          style: 'stroke-width: 20px',
        });
      },
    },
  };
};
