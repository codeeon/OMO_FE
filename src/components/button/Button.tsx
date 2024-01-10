import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  theme?: string;
  children: ReactNode;
  outlineColor?: string;
  padding?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  outlineColor,
  padding,
  width,
  height,
  fontSize,
  fontWeight,
  onClick,
  disabled,
  theme,
}) => {
  return (
    <Base
      $outlineColor={outlineColor}
      $padding={padding}
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      onClick={onClick}
      disabled={disabled}
      $theme={theme}
    >
      {children}
    </Base>
  );
};

export default Button;

interface BtnProps {
  $outlineColor?: string;
  $padding?: string;
  $width?: string;
  $height?: string;
  $fontSize?: string;
  $fontWeight?: string;
  $theme?: string;
}

const Base = styled.button<BtnProps>`
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};

  border-radius: 8px;

  width: ${({ $width }) => ($width ? $width : '60px')};
  height: ${({ $height }) => ($height ? $height : '30px')};
  padding: ${({ $padding }) => ($padding ? $padding : '10px 3px')};
  cursor: pointer;

  ${({ $theme }) =>
    $theme === 'gray'
      ? css`
          background: #b1b1b1;
          color: #fff;
          border: none;
          &:hover {
            background: #848484;
          }
        `
      : $theme === 'blue'
      ? css`
          background: ${({ theme }) => theme.color.link};
          color: ${({ theme }) => theme.color.bg};
          border: none;
          &:hover {
            background: #1a8df9;
          }
        `
      : null}

  ${({ $outlineColor }) =>
    $outlineColor === 'red'
      ? css`
          border: 1px solid #fc2b4e;
          background: ${({ theme }) => theme.color.cardBg};
          color: #fc2b4e;
          &:hover {
            background: #fc2b4e;
            color: #fff;
          }
        `
      : $outlineColor === 'blue'
      ? css`
          border: 1px solid #44a5ff;
          background: ${({ theme }) => theme.color.cardBg};
          color: #44a5ff;
          &:hover {
            background: #44a5ff;
            color: #fff;
          }
        `
      : $outlineColor === 'gray'
      ? css`
          border: 1px solid #b1b1b1;
          color: #b1b1b1;
          &:hover {
            background: ${({ theme }) => theme.color.cardBg};
            color: #fff;
          }
        `
      : null};

  span {
    color: #fff;
  }
`;
