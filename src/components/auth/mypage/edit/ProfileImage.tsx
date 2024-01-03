import React, { useState } from 'react';
import styled from 'styled-components';
// import { useMutation } from 'react-query';
// import { onImageChange } from '../../../../utils/uploadImage';

interface Props {
  imageURL: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
}

const ProfileImage: React.FC<Props> = ({
  imageURL,
  setImageUrl,
  setFiles,
  files,
}) => {
  // const { mutate } = useMutation(onImageChange);

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
    input.click();

    const changeHandler = async () => {
      const file = input.files?.[0];
      if (!file) return null;

      if (!isValidImageFileType(file)) {
        alert('jpg 혹은 png 파일만 업로드 가능합니다.');
        return;
      }

      try {
        const imageUrl = await fileToUrl(file);
        setFiles((prev) => [file]);
        setImageUrl((prev) => [imageUrl]);
      } catch (error) {
        // console.error('Error converting file to URL:', error);
      } finally {
        input.removeEventListener('change', changeHandler);
      }
    };

    input.addEventListener('change', changeHandler);
  };

  return (
    <>
      {imageURL.length > 0 && (
        <MyImageBox
          onClick={uploadImage}
          imageURL={imageURL[imageURL.length - 1]}
        />
      )}
      <Text
        onClick={uploadImage}
        style={{ marginTop: '24px' }}
        $fontSize="14px"
        $color="#44A5FF"
      >
        프로필 사진
      </Text>
    </>
  );
};

export default ProfileImage;

const MyImageBox = styled.div<{ imageURL: string[] }>`
  background-color: ${({ theme }) => theme.color.border};
  background-image: ${({ imageURL }) => `url("${imageURL}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  width: 88px;
  height: 88px;
  border-radius: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Text = styled.div<{ $color: string; $fontSize: string }>`
  color: ${({ $color, theme }) => $color || theme.color.text};
  font-size: ${({ $fontSize }) => $fontSize || '16px'};
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
`;
