import styled from 'styled-components';

const LargeButton = styled.button<{ $validation?: boolean }>`
  width: 400px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${({ $validation, theme }) =>
    $validation ? '#f97393' : theme.color.btnBg};
  border: none;
  margin: 0 0 61px 0;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  box-sizing: border-box;
`;

export default LargeButton;
