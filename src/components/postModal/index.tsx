import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowRoundBack } from 'react-icons/io';
import PostModalPlace from './Place';
import PostModalText from './Text';
import ConfirmModal from './ConfirmModal';
import { SelectedInfoType } from '../../model/interface';
import Stars from './Stars';
import SubModal from '../Modal/SubModal';

import usePostContentMutate from '../../hooks/reactQuery/post/usePostContentQuery';
import ImageFile from './Image2';
import GooglePlace from './GooglePlace';
import useAlertModalCtr from '../../hooks/useAlertModalCtr';
import AlertModal from '../Modal/AlertModal';
import ContentAlert from '../share/alert/ContentAlert';

interface Props {
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
  map: google.maps.Map | null;
}

const PostModal: React.FC<Props> = ({
  closeMainModal,
  isSubModalOpen,
  openSubModal,
  closeSubModal,
  map,
}) => {
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const { isModalOpen, handleModalOpen, handleModalClose } = useAlertModalCtr();
  const [imageURL, setImageUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
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

  const {
    postContentMutate,
    isPostContentLoading,
    isPostContentError,
    isPostContentSuccess,
  } = usePostContentMutate();

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
    const newContent = {
      content: text.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
      star: starNum,
      categoryName: selectedInfo.categoryName,
      imgUrl: files,
      storeName: selectedInfo.placeName,
      address: selectedInfo.addressName,
      latitude: selectedInfo.latitude,
      longitude: selectedInfo.longitude,
    };

    if (isValidate) {
      postContentMutate(newContent);
      clearPostHandler(e);
      handleModalOpen();
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
      <ImageFile
        imageURL={imageURL}
        setImageUrl={setImageUrl}
        setFiles={setFiles}
        files={files}
      />
      {/* <GooglePlace
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        map={map}
      /> */}
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
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        position="topRight"
      >
        <ContentAlert
          isPostContentLoading={isPostContentLoading}
          isPostContentError={isPostContentError}
          isPostContentSuccess={isPostContentSuccess}
        />
      </AlertModal>
    </Base>
  );
};

export default PostModal;

const Base = styled.div`
  box-sizing: border-box;
  width: 600px;

  min-height: 700px;
  max-height: 900px;
  height: 80%;

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
