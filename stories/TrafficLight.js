import React from 'react';

const TrafficLight = ({ light }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '40px',
      gridTemplateRows: '40px 40px 40px'
    }}
  >
    {['red', 'yellow', 'green'].map((c, i) => {
      let val = typeof light === 'string' ? light : Object.keys(light)[0];
      return (
        <div
          key={i}
          style={{
            backgroundColor: c === val ? val : '#ccc',
            borderRadius: '50%'
          }}
        />
      );
    })}
  </div>
);

export default TrafficLight;
