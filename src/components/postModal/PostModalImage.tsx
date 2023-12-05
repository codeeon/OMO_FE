import React, { useState } from 'react';
import styled from 'styled-components';
import { LuImagePlus } from 'react-icons/lu';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase.ts';
import { GrFormClose } from 'react-icons/gr';

interface Props {
  imageURL: string[];
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

const PostModalImage: React.FC<Props> = ({ imageURL, setImageUrl }) => {
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const onImageChange = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', () => {
      try {
        const file = input.files?.[0];
        if (!file) return null;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setProgressPercent(progress);
          },
          (error) => {
            switch (error.code) {
              case 'storage/canceled':
                alert('Upload has been canceled');
                break;
            }
          },
          async () => {
            await getDownloadURL(storageRef).then((downloadURL) => {
              setImageUrl([...imageURL, downloadURL]);
            });
          },
        );
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteImageHandler = (image: string) => {
    setImageUrl(imageURL.filter((img) => img !== image));
  };

  return (
    <>
      {imageURL.length > 0 ? (
        <ImageBox imageURL={imageURL[imageURL.length - 1]} />
      ) : (
        <Base onClick={onImageChange}>
          <ImageIcon fontsize="53px">
            <LuImagePlus />
          </ImageIcon>
          <Description fontsize="20px">이미지 추가하기</Description>
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
          <AddImageCard onClick={onImageChange}>
            <ImageIcon fontsize="30px">
              <LuImagePlus />
            </ImageIcon>
            <Description fontsize="14px">이미지 추가하기</Description>
          </AddImageCard>
        </ImageContainer>
      )}
    </>
  );
};

export default PostModalImage;

const Base = styled.div`
  margin-top: 31px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 16px;
  border: 1px solid #44a5ff;

  background: #f5faff;

  width: 100%;
  height: 613px;
  &:hover {
    background: #d9dde2;
  }
  cursor: pointer;
`;

const ImageBox = styled.div<{ imageURL: string }>`
  margin-top: 31px;
  border-radius: 16px;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 613px;
`;

const ImageIcon = styled.div<{ fontsize: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ fontsize }) => fontsize};
  color: #44a5ff;
`;

const Description = styled.div<{ fontsize: string }>`
  color: #44a5ff;

  font-family: Wanted Sans;
  font-size: ${({ fontsize }) => fontsize};
  font-style: normal;
  font-weight: 700;

  line-height: 100%; /* 20px */
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
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const AddImageCard = styled.div`
  width: 114px;
  height: 114px;
  border: 1px solid #44a5ff;
  border-radius: 16px;
  background: #f5faff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  &:hover {
    background: #d9dde2;
  }
  cursor: pointer;
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
