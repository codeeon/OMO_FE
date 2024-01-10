import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DetailModalDropdown from '../../components/detailModal/ModalDropdown';
import { PostDetailType } from '../../model/interface';
import toast from 'react-hot-toast';

const DetailModalHeader: React.FC<{
  userName: string;
  userProfile: string;
  createdAt: string;
  contentId: number | undefined;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  post: PostDetailType;
  userId: number;
}> = ({
  userProfile,
  userName,
  createdAt,
  contentId,
  closeModalHandler,
  post,
  userId,
}) => {
  const currentUserId = Number(window.sessionStorage.getItem('userId'));
  const navigate = useNavigate();

  const onClickMoveUserPage = () => {
    const checkUserId = sessionStorage.getItem('userId');
    !checkUserId
      ? toast.error('로그인 후 이용해주세요.', {
          position: 'top-right',
          duration: 3000,
          style: { fontSize: '14px' },
        })
      : navigate(`/userpage/${userName}`);
  };

  return (
    <Base>
      <UserProfile $userProfile={userProfile} onClick={onClickMoveUserPage} />
      <UserInfoContainer>
        <UserName onClick={onClickMoveUserPage}>{userName}</UserName>
        <CreationDate>{createdAt.split('T')[0]}</CreationDate>
      </UserInfoContainer>
      {userId === currentUserId && (
        <DetailModalDropdown
          contentId={contentId}
          closeModalHandler={closeModalHandler}
          post={post}
        />
      )}
    </Base>
  );
};

export default DetailModalHeader;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const UserProfile = styled.div<{ $userProfile: string }>`
  background-image: ${({ $userProfile }) => `url(${$userProfile})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: 100%;
  cursor: pointer;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
`;

const CreationDate = styled.div`
  font-size: 16px;
  font-weight: 500x;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.sub};
`;
