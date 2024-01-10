import styled from 'styled-components';

const Input1 = styled.input<{ $width: string; $check: string }>`
  width: ${({ $width }) => $width || '400px'};
  color: ${({ theme }) => theme.color.text};
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: none;
  padding: 0 15px;
  box-sizing: border-box;
  &::placeholder {
    color: ${({ theme }) => theme.color.sub2};
    font-size: 14px;
    font-weight: 700;
  }
  border-color: ${({ $check }) =>
    $check === 'rejected'
      ? 'var(--error_accent, #FF3263)'
      : $check === 'confirmed'
      ? '#0BD961'
      : '#D9D9D9'};
`;

export default Input1;
