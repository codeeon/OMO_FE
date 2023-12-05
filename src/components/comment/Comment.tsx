import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

//TODO 유저 데이터 및 컨텐츠 데이터 추가
const dummy = [
  {
    commentId: 'asdklf',
    userName: '오늘은 진짜 뭐하지',
    text: '오늘은 여기로 정했습니다! 좋은 정보 감사드려요~',
    createdAt: '2023.12.05',
    updatedAt: '2023.12.05',
  },
  {
    commentId: 'aslek',
    userName: '룰루랄라',
    text: '네 좋은하루되세요^^',
    createdAt: '2023.12.06',
    updatedAt: '2023.12.06',
  },
];

const Comment = () => {
  return (
    <Base>
      {dummy.map((comment) => (
        <CommentItem comment={comment} />
      ))}
      <CommentInput />
    </Base>
  );
};

export default Comment;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
