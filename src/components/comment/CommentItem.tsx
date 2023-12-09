import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment, patchComment } from '../../apis/apis';
import { getToday } from '../../function/getToday';
import { CommentType } from '../../model/interface';
import CommentDropdown from './CommentDropdown';
import Button from '../share/Button';

//TODO 유저 데이터
const CommentItem: React.FC<{
  comment: CommentType;
}> = ({ comment }) => {
  const { id, postId, userName, text, createdAt, updatedAt } = comment;
  const [textValue, setTextValue] = useState(text);
  const [isEditMode, setIsEditMode] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: patchMutate } = useMutation<
    void,
    unknown,
    { id: number | undefined; updatedComment: CommentType }
  >(patchComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const { mutate: deleteMutate } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const onClickpatchComment = () => {
    const updatedComment = {
      ...comment,
      text: textValue,
      updatedAt: getToday(),
    };
    setIsEditMode(false);
    patchMutate({ id, updatedComment });
  };

  const onClickdeleteComment = () => {
    deleteMutate(id);
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <Base>
      <UserProfile />
      <BodyContainer>
        <UserInfoContainer>
          <UserName>{userName}</UserName>
          <CreateAt>{createdAt}</CreateAt>
          {isEditMode ? (
            <BtnWrapper>
              <Button
                padding="5px"
                outlineColor="blue"
                onClick={onClickpatchComment}
              >
                완료하기
              </Button>
            </BtnWrapper>
          ) : (
            <EllipsisBtn>
              <CommentDropdown
                onClickpatchComment={onClickpatchComment}
                onClickdeleteComment={onClickdeleteComment}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
              />
            </EllipsisBtn>
          )}
        </UserInfoContainer>
        <CommentText
          disabled={!isEditMode}
          value={textValue}
          onChange={(e) => onChangeText(e)}
        />
      </BodyContainer>
    </Base>
  );
};

export default CommentItem;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  &:first-child {
    margin-top: 20px;
  }
`;

const UserProfile = styled.div`
  width: 50px;
  height: 50px;
  background: #d9d9d9;
  border-radius: 100%;
`;

const BodyContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 9px;
  width: 90%;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
`;

const UserName = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const CreateAt = styled.div`
  color: #a5a5a5;
  font-size: 16px;
  font-weight: 500;
`;

const CommentText = styled.input`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
  outline: none;
  border: none;
`;

const EllipsisBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  color: #a5a5a5;
  font-size: 25px;
`;

const BtnWrapper = styled.div`
  margin-left: auto;
`;
