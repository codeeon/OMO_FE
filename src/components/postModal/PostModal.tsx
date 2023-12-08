import React, { useId, useState } from 'react';
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';
import PostModalImage from './PostModalImage';
import PostModalPlace from './PostModalPlace';
import PostModalText from './PostModalText';
import ConfirmModal from './ConfirmModal';
import useModalCtr from '../../hooks/useModalCtr';
import Modal from '../Modal';
import { SelectedInfoType } from '../../model/interface';
import { getToday } from '../../function/getToday';
import { postContent } from '../../apis/apis';
import { useMutation, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import Stars from './Stars';
interface Props {
  closePostModalHandler: () => void;
}

const PostModal: React.FC<Props> = ({ closePostModalHandler }) => {
  const { isOpen, openModalHandler, closeModalHandler } = useModalCtr();
  const [imageURL, setImageUrl] = useState<string[]>([]);
  const [starNum, setStarNum] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfoType>({
    placeName: '',
    addressName: '',
    categoryName: '',
    latitude: '',
    longitude: '',
  });
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const clearPostHandler = () => {
    closePostModalHandler();
    setImageUrl([]);
    setSelectedInfo({
      placeName: '',
      addressName: '',
      categoryName: '',
      latitude: '',
      longitude: '',
    });
    setText('');
  };

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    postContent,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contents');
      },
    },
  );

  const savePostHandler = () => {
    const newContent = {
      id: uuidv4(),
      userId: '철', //TODO 추후에 추가
      categoryName: selectedInfo.categoryName,
      locationName: selectedInfo.addressName,
      content: text,
      imageURL: imageURL,
      likeCount: 0,
      placeName: selectedInfo.placeName,
      latitude: Number(selectedInfo.latitude),
      longitude: Number(selectedInfo.longitude),
      createdAt: getToday(),
      updatedAt: getToday(),
      star: starNum,
    };
    mutate(newContent);
    clearPostHandler();
  };

  return (
    <Base>
      {isLoading && '업로드 중!'}
      <Header>
        <BackBtn onClick={openModalHandler}>
          <MdArrowBack />
        </BackBtn>
        <Title>새 게시글</Title>
        <CompleteBtn onClick={savePostHandler}>작성완료</CompleteBtn>
      </Header>
      <PostModalImage imageURL={imageURL} setImageUrl={setImageUrl} />
      <PostModalPlace
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
      />
      <Stars starNum={starNum} setStarNum={setStarNum} />
      <PostModalText text={text} setText={setText} />
      <Modal isOpen={isOpen} onClose={closeModalHandler}>
        <ConfirmModal
          clearPostHandler={clearPostHandler}
          closeModalHandler={closeModalHandler}
        />
      </Modal>
    </Base>
  );
};

export default PostModal;

const Base = styled.div`
  width: 700px;
  height: 1120px;
  border-radius: 16px;
  background: #fff;

  padding: 27px 50px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackBtn = styled.div`
  font-size: 40px;
  color: #a5a5a5;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.2px;
`;

const CompleteBtn = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 9px 14px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  background: #b1b1b1;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #c7c7c7;
  }
`;

const PlaceName = styled.div`
  margin-top: 20px;
  width: 100%;
  color: #000;

  font-family: Wanted Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 24px */
`;
