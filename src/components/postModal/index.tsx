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
import toast from 'react-hot-toast';
import Button from '../button/Button';

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
}

const PostModal: React.FC<Props> = ({
  closeMainModal,
  isSubModalOpen,
  openSubModal,
  closeSubModal,
}) => {
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
  const [googleSearchResult, setGoogleSearchResult] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);

  const { postContentMutate } = usePostContentMutate();

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
    setGoogleSearchResult(null);
  };

  const savePostHandler = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    if (files.length === 0) {
      return toast.error('이미지를 추가해주세요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    if (!selectedInfo.placeName) {
      return toast.error('장소에 대한 위치를 지정해주세요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    if (starNum < 1) {
      return toast.error('별점을 지정해주세요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    if (!text) {
      return toast.error('장소에 대한 내용을 적어주세요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    if (text.length <= 10) {
      return toast.error('장소에 대한 내용은 10자 이상 적어주세요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }

    const newContent = {
      content: text.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
      star: starNum,
      categoryName: selectedInfo.categoryName,
      imgUrl: files,
      storeName: selectedInfo.placeName,
      address: selectedInfo.addressName,
      latitude: selectedInfo.latitude,
      longitude: selectedInfo.longitude,
      placeInfoId: googleSearchResult && googleSearchResult[0].place_id,
    };

    postContentMutate(newContent);
    closeMainModal(e);
  };

  return (
    <Base>
      <Header>
        <BackBtn onClick={openSubModal}>
          <IoIosArrowRoundBack />
        </BackBtn>
        <Title>새 게시글</Title>
        <Button
          theme="gray"
          padding="9px 14px"
          width="49px"
          height="14px"
          onClick={(e) => savePostHandler(e)}
        >
          작성완료
        </Button>
      </Header>
      <ImageFile
        imageURL={imageURL}
        setImageUrl={setImageUrl}
        files={files}
        setFiles={setFiles}
      />
      <PostModalPlace
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        googleSearchResult={googleSearchResult}
        setGoogleSearchResult={setGoogleSearchResult}
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 720px;
  min-height: 800px;
  max-height: 1000px;
  height: 80%;
  padding: 45px;
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

const CompleteBtn = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;

  transition: all 200ms ease-in;
`;
