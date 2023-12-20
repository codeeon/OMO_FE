import styled from 'styled-components';

export const RightArrow = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <Path d="M11.1375 24.8996L19.2875 16.7496C20.25 15.7871 20.25 14.2121 19.2875 13.2496L11.1375 5.09961" />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 30px;
  height: 30px;
  fill: none;
`;

const Path = styled.path`
  stroke: ${({ theme }) => theme.color.sub2};
  stroke-width: 2.5;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
