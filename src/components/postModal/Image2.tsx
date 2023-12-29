import React, { useState } from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import ImageIcon from '../../assets/icons/ImageIcon';
import AlertModal from '../Modal/AlertModal';
import useAlertModalCtr from '../../hooks/useAlertModalCtr';
import PostErrorAlert from '../share/alert/PostErrorAlert';
import PostSuccessAlert from '../share/alert/PostSuccessAlert';

interface Props {
  imageURL: string[];
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const Image: React.FC<Props> = ({ imageURL, setImageUrl, files, setFiles }) => {
  const { isModalOpen, handleModalClose, handleModalOpen } = useAlertModalCtr();
  const [isUploadError, setIsUploadError] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);
  const deleteImageHandler = (image: string) => {
    const imageIndex = imageURL.findIndex((img) => img === image);
    if (imageIndex !== -1) {
      const updatedFiles = [...files];
      updatedFiles.splice(imageIndex, 1);
      setImageUrl(imageURL.filter((img) => img !== image));
      setFiles(updatedFiles);
    }
  };

  const isValidImageFileType = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  const fileToUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        resolve(dataUrl);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const uploadImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    const changeHandler = async () => {
      const file = input.files?.[0];
      if (!file) return null;
      if (!isValidImageFileType(file)) {
        setIsUploadError(true);
        handleModalOpen();
        return;
      }

      try {
        const imageUrl = await fileToUrl(file);

        setFiles([...files, file]);
        setImageUrl([...imageURL, imageUrl]);
        setIsUploadSuccess(true);
        handleModalOpen();
      } catch (error) {
        console.error('Error converting file to URL:', error);
      } finally {
        input.removeEventListener('change', changeHandler);
      }
    };

    input.addEventListener('change', changeHandler);
  };

  return (
    <>
      {imageURL.length > 0 ? (
        <ImageBox imageURL={imageURL[imageURL.length - 1]} />
      ) : (
        <Base onClick={uploadImage}>
          <ImageIcon width="53px" height="53px" />
          <Description fontsize="18px">이미지 추가하기</Description>
        </Base>
      )}

      {imageURL.length > 0 && (
        <ImageContainer>
          {imageURL.map((image) => (
            <ImageCard key={image} imageURL={image}>
              <DeleteBtn onClick={() => deleteImageHandler(image)}>
                <GrFormClose />
              </DeleteBtn>
            </ImageCard>
          ))}
          {imageURL.length !== 5 ? (
            <AddImageCard onClick={uploadImage}>
              <ImageIcon width="25px" height="25px" />
              <Description fontsize="14px">이미지 추가하기</Description>
            </AddImageCard>
          ) : null}
        </ImageContainer>
      )}
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        position="topRight"
        setIsUploadError={setIsUploadError}
        setIsUploadSuccess={setIsUploadSuccess}
      >
        {isUploadError && (
          <PostErrorAlert errorMsg="jpg 혹은 png 파일만 업로드 가능합니다." />
        )}
        {isUploadSuccess && (
          <PostSuccessAlert successMsg="이미지가 업로드 되었어요." />
        )}
      </AlertModal>
    </>
  );
};

export default Image;

const Base = styled.div`
  margin-top: 31px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 16px;
  border: 1px solid var(--link, #44a5ff);
  background: rgba(68, 165, 255, 0.05);

  width: 100%;
  min-height: 600px;

  cursor: pointer;
  transition: all 300ms ease-in;

  &:hover {
    background: rgba(68, 165, 255, 0.2);
  }
`;

const ImageBox = styled.div<{ imageURL: string }>`
  margin-top: 31px;

  border-radius: 16px;

  background-image: ${({ imageURL }) => `url("${imageURL}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  min-height: 600px;
`;

const Description = styled.div<{ fontsize: string }>`
  color: #44a5ff;
  font-size: ${({ fontsize }) => fontsize};
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
`;

const ImageCard = styled.div<{ imageURL: string }>`
  width: 114px;
  height: 114px;
  border-radius: 16px;
  background-image: ${({ imageURL }) => `url("${imageURL}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const AddImageCard = styled.div`
  width: 114px;
  height: 114px;
  border-radius: 16px;
  border: 1px solid var(--link, #44a5ff);
  background: rgba(68, 165, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  cursor: pointer;
  transition: all 300ms ease-in;

  &:hover {
    background: rgba(68, 165, 255, 0.2);
  }
`;

const DeleteBtn = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;

  font-size: 20px;
  color: #fff;

  border-radius: 100%;
  background: #f97393;
  cursor: pointer;
  &:hover {
    background: #f97476;
    width: 22px;
    height: 22px;
    top: -7px;
    right: -7px;
  }
`;
