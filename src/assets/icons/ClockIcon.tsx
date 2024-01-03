import React from 'react';
import styled from 'styled-components';

const ClockIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <Path d="M16.5 9C16.5 13.14 13.14 16.5 9 16.5C4.86 16.5 1.5 13.14 1.5 9C1.5 4.86 4.86 1.5 9 1.5C13.14 1.5 16.5 4.86 16.5 9Z" />
      <Path d="M11.7827 11.3853L9.45766 9.99781C9.05266 9.75781 8.72266 9.18031 8.72266 8.70781V5.63281" />
    </Svg>
  );
};

export default ClockIcon;

const Svg = styled.svg`
  width: 18px;
  height: 18px;
  fill: none;
`;

const Path = styled.path`
  stroke: #7b7b7b;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
