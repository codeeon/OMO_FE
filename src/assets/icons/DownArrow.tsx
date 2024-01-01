import React from 'react';
import styled from 'styled-components';

const DownArrow = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
      <Path d="M2.37963 5.19727L6.18296 9.0006C6.63213 9.44977 7.36713 9.44977 7.8163 9.0006L11.6196 5.19727" />
    </Svg>
  );
};

export default DownArrow;

const Svg = styled.svg`
  width: 14px;
  height: 14px;
  fill: none;
`;

const Path = styled.path`
  stroke: #808080;
  stroke-width: 1.5;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
