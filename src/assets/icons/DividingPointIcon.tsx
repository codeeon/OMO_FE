import React from 'react';
import styled from 'styled-components';

const DividingPointIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2">
      <Circle cx="1" cy="1" r="1" />
    </Svg>
  );
};

export default DividingPointIcon;

const Svg = styled.svg`
  width: 2px;
  height: 2px;
  fill: none;
`;

const Circle = styled.circle`
  fill: #b1b1b1;
`;
