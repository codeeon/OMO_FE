import styled from 'styled-components';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

export const RightArrow: React.FC<Props> = ({ color, width, height }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      $width={width}
      $height={height}
    >
      <Path
        d="M11.1375 24.8996L19.2875 16.7496C20.25 15.7871 20.25 14.2121 19.2875 13.2496L11.1375 5.09961"
        $color={color}
      />
    </Svg>
  );
};

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
