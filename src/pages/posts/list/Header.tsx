import React from 'react';
import styled from 'styled-components';
import PencilIcon from '../../../assets/icons/PencilIcon';
import Button from '../../../components/button/Button';

interface Props {
  openPostModalHandler: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => string | undefined;
}

const Header: React.FC<Props> = ({ openPostModalHandler }) => {
  return (
    <Base onClick={openPostModalHandler}>
      <Title>게시글</Title>
      <Button theme="blue" width="91px" height="32px" padding="none">
        <PencilIcon />새 게시글
      </Button>
    </Base>
  );
};

export default Header;

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;
