import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  children: ReactNode;
  outlineColor?: string;
  theme?: string;
  padding?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  children,
  outlineColor,
  padding,
  theme,
  width,
  height,
  fontSize,
  fontWeight,
  onClick,
}) => {
  return (
    <Base
      outlineColor={outlineColor}
      padding={padding}
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={onClick}
      theme={theme}
    >
      {children}
    </Base>
  );
};

export default Button;

interface BtnProps {
  outlineColor?: string;
  padding?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  theme?: string;
}

const Base = styled.div<BtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};

  border-radius: 8px;

  width: ${({ width }) => (width ? width : '60px')};
  height: ${({ height }) => (height ? height : '30px')};
  padding: ${({ padding }) => (padding ? padding : '10px 3px')};
  cursor: pointer;

  ${({ theme }) =>
    theme === 'gray'
      ? css`
          background: #b1b1b1;
          color: #fff;
          border: none;
          &:hover {
            background: #cfcfcf;
          }
        `
      : null}

  ${({ outlineColor }) =>
    outlineColor === 'red'
      ? css`
          border: 1px solid #fc2b4e;
          color: #fc2b4e;
          &:hover {
            background: #fc2b4e;
            color: #fff;
          }
        `
      : outlineColor === 'blue'
      ? css`
          border: 1px solid #44a5ff;
          color: #44a5ff;
          &:hover {
            background: #44a5ff;
            color: #fff;
          }
        `
      : outlineColor === 'gray'
      ? css`
          border: 1px solid #b1b1b1;
          color: #b1b1b1;
          &:hover {
            background: #b1b1b1;
            color: #fff;
          }
        `
      : null};
`;
