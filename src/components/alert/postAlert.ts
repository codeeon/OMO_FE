import toast from 'react-hot-toast';

export const missingImageToast = () => {
  toast.error('이미지를 추가해주세요.', {
    position: 'top-right',
    duration: 4000,
    style: { fontSize: '14px' },
  });
};

export const missingPlaceToast = () => {
  toast.error('장소에 대한 위치를 지정해주세요.', {
    position: 'top-right',
    duration: 4000,
    style: { fontSize: '14px' },
  });
};
