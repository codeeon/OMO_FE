import React, { useEffect, useId, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowRoundBack } from 'react-icons/io';
import PostModalImage from './Image';
import PostModalPlace from './Place';
import PostModalText from './Text';
import ConfirmModal from './ConfirmModal';
import { PostDetailType, SelectedInfoType } from '../../../model/interface';
import Stars from './Stars';
import SubModal from '../../Modal/SubModal';
import usePatchPostMutation from '../../../hooks/reactQuery/post/usePatchPostMutation';

interface Props {
  post: PostDetailType;
  closeMainModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  isSubModalOpen: boolean;
  openSubModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  closeSubModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
}

const PatchModal: React.FC<Props> = ({
  post,
  closeMainModal,
  isSubModalOpen,
  openSubModal,
  closeSubModal,
}) => {
  const { postId, content, imgUrl, star, createdAt, Location } = post;
  const [isValidate, setIsValidate] = useState<boolean>(true);
  const [imageURL, setImageUrl] = useState<string[]>(imgUrl);
  const [starNum, setStarNum] = useState(star);
  const [searchValue, setSearchValue] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfoType>({
    placeName: post.Location.storeName,
    addressName: post.Location.address,
    categoryName: post.Location.Category.categoryName,
    latitude: post.Location.latitude,
    longitude: post.Location.longitude,
  });
  const [text, setText] = useState(content);
  const { patchMutate, isPatchLoading } = usePatchPostMutation();
  const clearPostHandler = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    closeMainModal(e);
    closeSubModal(e);
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

  const savePostHandler = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    const newPost = {
      content: text.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
      star: starNum,
      categoryName: selectedInfo.categoryName,
      storeName: selectedInfo.placeName,
      address: selectedInfo.addressName,
      latitude: selectedInfo.latitude,
      longitude: selectedInfo.longitude,
    };
    if (isValidate) {
      patchMutate({ postId, newPost });
      clearPostHandler(e);
    }
  };

  return (
    <Base>
      <Header>
        <BackBtn onClick={openSubModal}>
          <IoIosArrowRoundBack />
        </BackBtn>
        <Title>새 게시글</Title>
        <CompleteBtn onClick={(e) => savePostHandler(e)} disable={!isValidate}>
          작성완료
        </CompleteBtn>
      </Header>
      <PostModalImage imageURL={imageURL} setImageUrl={setImageUrl} />
      <PostModalPlace
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        address={Location.address}
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

export default PatchModal;

const Base = styled.div`
  width: 700px;
  height: 950px;
  border-radius: 16px;
  background: ${({ theme }) => theme.color.bg};

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
  color: ${({ theme }) => theme.color.sub2};
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
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
