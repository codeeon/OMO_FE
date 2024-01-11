import styled from 'styled-components';

const SmallButton = styled.button`
  box-sizing: border-box;
  width: 106px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.locBg};
  border: 1px solid #f97393;
  margin-left: 10px;
  color: #f97393;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-sizing: border-box;
`;

export default SmallButton;
