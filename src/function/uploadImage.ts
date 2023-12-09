import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.ts';
import { getToday } from './getToday.ts';
import { MutationFunction } from 'react-query';

interface OnImageChangeParams {
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
  imageURL: string[];
  setProgressPercent: React.Dispatch<React.SetStateAction<number>>;
}

export const onImageChange: MutationFunction<
  void,
  OnImageChangeParams
> = async ({ setImageUrl, imageURL, setProgressPercent }) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  const changeHandler = async () => {
    try {
      const file = input.files?.[0];
      if (!file) return null;

      if (!isValidImageFileType(file)) {
        alert('jpg 혹은 png 파일만 업로드 가능합니다.');
        return;
      }
      const storageRef = ref(storage, `files/${getToday()}_${file.name}`);
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
              alert('업로드가 취소되었습니다.');
              break;
            default:
              alert('업로드 중 오류가 발생했습니다.');
              break;
          }
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          setImageUrl([...imageURL, downloadURL]);
        },
      );

      // 이벤트 리스너 제거
      input.removeEventListener('change', changeHandler);
    } catch (error) {
      console.log(error);
    }
  };

  // 변경 이벤트 리스너 등록
  input.addEventListener('change', changeHandler);
};

const isValidImageFileType = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  return allowedTypes.includes(file.type);
};
