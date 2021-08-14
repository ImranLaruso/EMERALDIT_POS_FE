import React from 'react';
import dashboardStyles from '../../../styles/dashboard/dashboardStyles';
import GridItem from './Grid/GridItem';

const VisualCard = ({ children, title, desc }) => {
  const classes = dashboardStyles();
  return (
    <GridItem xs={12} sm={12} md={4}>
      <div className={classes.card}>
        <div className={classes.cardInnerDiv}>
          <div className={classes.cardShading}>
            <div className={classes.cardInnerDiv2}>{children}</div>
            <div className={classes.cardBody}>
              <h4 className={classes.cardTitle}>{title}</h4>
              <p className={classes.cardOuterDiv}>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default VisualCard;
