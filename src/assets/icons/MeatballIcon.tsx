import styled from 'styled-components';

export const MeatballIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 6">
      <Circle cx="3.25" cy="3" r="2.5" />
      <Circle cx="12" cy="3" r="2.5" />
      <Circle cx="20.75" cy="3" r="2.5" />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 24px;
  height: 6px;
  fill: none;
`;

const Circle = styled.circle`
  fill: #808080;
`;
