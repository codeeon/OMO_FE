import styled from 'styled-components';

const Text1 = styled.div<{
  $color?: string;
  $fontSize?: string;
  $fontWeight?: string;
}>`
  color: ${({ $color, theme }) =>
    $color === 'sub2'
      ? theme.color.sub2
      : $color === 'sub'
      ? theme.color.sub
      : $color === 'link'
      ? theme.color.link
      : $color === 'btn'
      ? '#fff'
      : $color
      ? $color
      : theme.color.text};
  text-align: center;
  font-size: ${({ $fontSize }) => $fontSize || '16px'};
  font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
  box-sizing: border-box;
`;

export default Text1;
