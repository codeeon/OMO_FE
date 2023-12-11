import React, { useEffect, useId, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowRoundBack } from 'react-icons/io';
import PostModalImage from './PostModalImage';
import PostModalPlace from './PostModalPlace';
import PostModalText from './PostModalText';
import ConfirmModal from './ConfirmModal';
import { SelectedInfoType } from '../../model/interface';
import { getToday } from '../../function/getToday';
import Stars from './Stars';
import SubModal from '../Modal/SubModal';
import usePostContentQuery from '../../hooks/usePostContentQuery';

interface Props {
  closeMainModal: () => void;
  isSubModalOpen: boolean;
  openSubModal: () => void;
  closeSubModal: () => void;
}

const PostModal: React.FC<Props> = ({
  closeMainModal,
  isSubModalOpen,
  openSubModal,
  closeSubModal,
}) => {
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [imageURL, setImageUrl] = useState<string[]>([]);
  const [starNum, setStarNum] = useState(0);
  const [searchValue, setSearchValue] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfoType>({
    placeName: '',
    addressName: '',
    categoryName: '',
    latitude: '',
    longitude: '',
  });
  const [text, setText] = useState('');

  const { postMutate, isPostLoading } = usePostContentQuery();

  const clearPostHandler = () => {
    closeMainModal();
    closeSubModal();
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

  useEffect(() => {
    if (imageURL.length !== 0 && text && selectedInfo.placeName) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  }, [imageURL, text, searchValue, selectedInfo.placeName]);

  const savePostHandler = () => {
    const newContent = {
      userId: '철', //TODO 추후에 추가
      categoryName: selectedInfo.categoryName,
      locationName: selectedInfo.addressName,
      content: text.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
      imageURL: imageURL,
      likeCount: 0,
      placeName: selectedInfo.placeName,
      latitude: Number(selectedInfo.latitude),
      longitude: Number(selectedInfo.longitude),
      createdAt: getToday(),
      updatedAt: getToday(),
      star: starNum,
    };
    if (isValidate) {
      postMutate(newContent);
      clearPostHandler();
    }
  };

  return (
    <Base>
      <Header>
        <BackBtn onClick={openSubModal}>
          <IoIosArrowRoundBack />
        </BackBtn>
        <Title>새 게시글</Title>
        <CompleteBtn onClick={savePostHandler} disable={!isValidate}>
          작성완료
        </CompleteBtn>
      </Header>
      <PostModalImage imageURL={imageURL} setImageUrl={setImageUrl} />
      <PostModalPlace
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Stars starNum={starNum} setStarNum={setStarNum} />
      <PostModalText text={text} setText={setText} />
      <SubModal isOpen={isSubModalOpen}>
        <ConfirmModal
          clearPostHandler={clearPostHandler}
          closeModalHandler={closeSubModal}
        />
      </SubModal>
    </Base>
  );
};

export default PostModal;

const Base = styled.div`
  width: 700px;
  height: 900px;
  border-radius: 16px;
  background: #fff;

  padding: 27px 50px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  transition: all 200ms ease-in;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 40px;
  color: #a5a5a5;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.2px;
`;

const CompleteBtn = styled.div<{ disable: boolean }>`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  ${({ disable }) =>
    disable
      ? css`
          background: #b1b1b1;
        `
      : css`
          background: #44a5ff;
          &:hover {
            background-color: #f97476;
          }
        `}

  transition: all 200ms ease-in;
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
