import React from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import ImageIcon from '../../assets/icons/ImageIcon';
import { deleteImageHandler, uploadImage } from '../../utils/imageUpload';

interface Props {
  imageURL: string[];
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUpload: React.FC<Props> = ({
  imageURL,
  setImageUrl,
  files,
  setFiles,
}) => {
  const onClickImageAdd = () => {
    uploadImage(files, setFiles, setImageUrl, imageURL);
  };

  const onClickDeleteImage = (image: string) => {
    deleteImageHandler(image, imageURL, files, setFiles, setImageUrl);
  };

  return (
    <>
      {imageURL.length > 0 ? (
        <ImageBox imageURL={imageURL[imageURL.length - 1]} />
      ) : (
        <Base onClick={onClickImageAdd}>
          <ImageIcon width="53px" height="53px" />
          <Description fontsize="18px">이미지 추가하기</Description>
        </Base>
      )}

      {imageURL.length > 0 && (
        <ImageContainer>
          {imageURL.map((image) => (
            <ImageCard key={image} imageURL={image}>
              <DeleteBtn onClick={() => onClickDeleteImage(image)}>
                <GrFormClose />
              </DeleteBtn>
            </ImageCard>
          ))}
          {imageURL.length !== 5 ? (
            <AddImageCard onClick={onClickImageAdd}>
              <ImageIcon width="25px" height="25px" />
              <Description fontsize="14px">이미지 추가하기</Description>
            </AddImageCard>
          ) : null}
        </ImageContainer>
      )}
    </>
  );
};

export default ImageUpload;

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
