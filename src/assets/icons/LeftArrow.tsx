import styled from 'styled-components';

const LeftArrow = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <Path d="M18.8626 5.10039L10.7125 13.2504C9.75005 14.2129 9.75005 15.7879 10.7125 16.7504L18.8625 24.9004" />
    </Svg>
  );
};

export default LeftArrow;

const Svg = styled.svg`
  width: 30px;
  height: 30px;
  fill: none;
`;

const Path = styled.path`
  stroke: ${({ theme }) => theme.color.border};
  stroke-width: 2.5;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
