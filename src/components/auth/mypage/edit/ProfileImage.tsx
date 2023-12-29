import React, { useState } from 'react';
import styled from 'styled-components';
import { LuImagePlus } from 'react-icons/lu';
import { GrFormClose } from 'react-icons/gr';
import { useMutation, useQueryClient } from 'react-query';
import { onImageChange } from '../../../../function/uploadImage';
import { MoonLoader } from 'react-spinners';

interface Props {
  imageURL: string[];
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
  const [progressPercent, setProgressPercent] = useState<number | null>(100);

  const { mutate } = useMutation(onImageChange);

  // 삭제 핸들러
  const deleteImageHandler = (image: string) => {
    setImageUrl(imageURL.filter((img) => img !== image));
  };

  // 확장자 유효성 검사
  const isValidImageFileType = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  // 파일을 URL로
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

      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
      console.log('fireToUrl -> ', file);
    });
  };

  // 업로드
  const uploadImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    // input.setAttribute('accept', 'image/*');
    input.click();

    const changeHandler = async () => {
      const file = input.files?.[0];
      if (!file) return null;
      // if (!isValidImageFileType(file)) {
      //   alert('jpg 혹은 png 파일만 업로드 가능합니다.');
      //   return;
      // }

      try {
        const imageUrl = await fileToUrl(file);
        console.log('imageUrl -> ', imageUrl);
        setFiles((prev) => [file]);
        console.log('setFiles -> ', files);
        setImageUrl((prev) => [imageUrl]);
        console.log('setImageURL -> ', imageURL);
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
      {/* {progressPercent === 0 ? (
        <LoadingBox>
          <MoonLoader color="#44a5ff" size={50} />
        </LoadingBox>
      ) : imageURL.length > 0 ? (
        <ImageBox imageURL={imageURL[imageURL.length - 1]} />
      ) : (
        <Base
          onClick={() => mutate({ setImageUrl, imageURL, setProgressPercent })}
        >
          <ImageIcon fontsize="45px">
            <LuImagePlus />
          </ImageIcon>
          <Description fontsize="18px">이미지 추가하기</Description>
        </Base>
      )} */}
      {
        imageURL.length > 0 && (
          <MyImageBox
            onClick={uploadImage}
            imageURL={imageURL[imageURL.length - 1]}
          />
        )
        //    : (
        //     <Base onClick={uploadImage}>
        //       {/* <Base
        //       onClick={() => mutate({ setImageUrl, imageURL, setProgressPercent })}
        //     > */}
        //       {/* <ImageIcon fontsize="45px">
        //         <LuImagePlus />
        //       </ImageIcon>
        //       <Description fontsize="18px">이미지 추가하기</Description> */}
        //     </Base>
        //   )
      }

      {/* 
      {imageURL.length > 0 && (
        <ImageContainer>
          {imageURL.map((image) => (
            <ImageCard key={image} imageURL={image}>
              <DeleteBtn onClick={() => deleteImageHandler(image)}>
                {/* <DeleteBtn onClick={() => deleteImageHandler(image)}> */}
      {/*                 <GrFormClose />
              </DeleteBtn>
            </ImageCard>
          ))}
          {imageURL.length !== 5 ? (
            <AddImageCard onClick={uploadImage}>
              {/* <AddImageCard
              onClick={() =>
                mutate({ setImageUrl, imageURL, setProgressPercent })
              }
            > */}
      {/*               <ImageIcon fontsize="30px">
                <LuImagePlus />
              </ImageIcon>
              <Description fontsize="14px">이미지 추가하기</Description>
            </AddImageCard>
          ) : null}
        </ImageContainer>
      )}*/}
    </>
  );
};

export default ProfileImage;

const Base = styled.div`
  margin-top: 31px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 16px;
  border: 1px solid #44a5ff;

  background: ${({ theme }) => theme.color.bg};

  width: 100%;
  height: 550px;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
  transition: all 200ms ease-in;
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.bg};
  margin-top: 31px;
  border-radius: 16px;
  width: 100%;
  height: 613px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const ImageBox = styled.div<{ imageURL: string }>`
  margin-top: 31px;
  border-radius: 16px;
  background-image: ${({ imageURL }) => `url("${imageURL}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 380px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const AddImageCard = styled.div`
  width: 114px;
  height: 114px;
  border: 1px solid #44a5ff;
  border-radius: 16px;
  background: ${({ theme }) => theme.color.bg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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

const MyImageBox = styled.div<{ imageURL: string }>`
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
