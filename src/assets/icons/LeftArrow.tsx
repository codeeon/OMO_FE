import styled from 'styled-components';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

const LeftArrow: React.FC<Props> = ({ color, width, height }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      $width={width}
      $height={height}
    >
      <Path
        d="M18.8626 5.10039L10.7125 13.2504C9.75005 14.2129 9.75005 15.7879 10.7125 16.7504L18.8625 24.9004"
        $color={color}
      />
    </Svg>
  );
};

export default LeftArrow;

const Svg = styled.svg<{
  $width: string | undefined;
  $height: string | undefined;
}>`
  width: ${({ $width }) => ($width ? $width : '30px')};
  height: ${({ $height }) => ($height ? $height : '30px')};
  fill: none;
`;

const Path = styled.path<{ $color: string | undefined }>`
  stroke: ${({ $color, theme }) =>
    $color === 'border' ? theme.color.border : theme.color.sub2};
  stroke-width: 2.5;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
