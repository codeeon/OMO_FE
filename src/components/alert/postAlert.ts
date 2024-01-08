import toast from 'react-hot-toast';

export const postLoading = () => {
  toast.loading('게시물을 업로드 중입니다...', {
    position: 'bottom-right',
    duration: 4000,
    id: '10',
  });
};

export const duplicateFiles = () => {
  toast.error('중복된 파일입니다.', {
    position: 'bottom-right',
    duration: 4000,
  });
};

export const imageUploadSuccess = () => {
  toast.success('이미지 업로드 성공!', {
    position: 'bottom-right',
    duration: 4000,
  });
};

export const imageTypeError = () => {
  toast.error('jpg, png파일만 업로드 가능합니다.', {
    position: 'bottom-right',
    duration: 4000,
  });
};

export const imageSizeError = () => {
  toast.error('이미지 크기는 3mb까지만 업로드 가능합니다.', {
    position: 'bottom-right',
    duration: 4000,
  });
};
