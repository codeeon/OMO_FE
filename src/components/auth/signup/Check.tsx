import React from 'react';
import styled from 'styled-components';

const Check = (props) => {
  const { verifyCheck, children } = props;
  return (
    <Base check={verifyCheck}>
      <Icon>
        {verifyCheck === 'rejected'
          ? reject
          : verifyCheck === 'confirmed'
          ? confirm
          : ''}
      </Icon>
      <Text check={verifyCheck}>{children}</Text>
    </Base>
  );
};

export default Check;

const Base = styled.div`
  display: ${({ check }) => (check === '' ? 'none' : 'flex')};
  justify-content: flex-start;
  align-items: center;
  margin-top: 9px;
`;

const Icon = styled.div`
  display: ${({ check }) => (check === '' ? 'none' : 'block')};
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-right: 2px;
`;
const reject = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8.00016 14.6663C4.31816 14.6663 1.3335 11.6817 1.3335 7.99967C1.3335 4.31767 4.31816 1.33301 8.00016 1.33301C11.6822 1.33301 14.6668 4.31767 14.6668 7.99967C14.6668 11.6817 11.6822 14.6663 8.00016 14.6663ZM7.3335 9.99967V11.333H8.66683V9.99967H7.3335ZM7.3335 4.66634V8.66634H8.66683V4.66634H7.3335Z"
      fill="#FF3263"
    />
  </svg>
);
const confirm = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clip-path="url(#clip0_1343_16114)">
      <path
        d="M8.00016 14.6663C4.31816 14.6663 1.3335 11.6817 1.3335 7.99967C1.3335 4.31767 4.31816 1.33301 8.00016 1.33301C11.6822 1.33301 14.6668 4.31767 14.6668 7.99967C14.6668 11.6817 11.6822 14.6663 8.00016 14.6663ZM7.3355 10.6663L12.0488 5.95234L11.1062 5.00967L7.3355 8.78101L5.4495 6.89501L4.50683 7.83767L7.3355 10.6663Z"
        fill="#0BD961"
      />
    </g>
    <defs>
      <clipPath id="clip0_1343_16114">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Text = styled.div<{ check: string }>`
  display: ${({ check }) => (check === '' ? 'none' : 'block')};
  color: ${({ check, theme }) =>
    check === 'rejected'
      ? 'var(--error_accent, #FF3263)'
      : check === 'confirmed'
      ? '#0BD961'
      : theme.color.text};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  margin-top: 1.5px;
`;
