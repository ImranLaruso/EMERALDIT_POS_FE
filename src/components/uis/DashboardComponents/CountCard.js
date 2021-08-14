import React from 'react';
import GridItem from './Grid/GridItem';

const CountCard = ({ count, description }) => {
  return (
    <GridItem xs={12} sm={12} md={2}>
      <div style={{ width: '100%', margin: 'auto' }}>
        <div>
          <center>
            <h1 style={{ color: 'red' }}>{count}</h1>
            <h3>{description}</h3>
          </center>
        </div>
      </div>
    </GridItem>
  );
};

export default CountCard;
