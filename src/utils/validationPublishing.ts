import toast from 'react-hot-toast';

export const validatePublishing = (
  fileLength: number,
  PlaceName: string,
  starNum: number,
  text: string,
) => {
  if (fileLength === 0) {
    toast.error('이미지를 추가해주세요.', {
      position: 'top-right',
      duration: 3000,
      style: { fontSize: '14px' },
    });
    return false;
  }
  if (!PlaceName) {
    toast.error('장소에 대한 위치를 지정해주세요.', {
      position: 'top-right',
      duration: 3000,
      style: { fontSize: '14px' },
    });
    return false;
  }
  if (starNum < 1) {
    toast.error('별점을 지정해주세요.', {
      position: 'top-right',
      duration: 3000,
      style: { fontSize: '14px' },
    });
    return false;
  }
  if (!text) {
    toast.error('장소에 대한 내용을 적어주세요.', {
      position: 'top-right',
      duration: 3000,
      style: { fontSize: '14px' },
    });
    return false;
  }
  if (text.length <= 10) {
    toast.error('장소에 대한 내용은 10자 이상 적어주세요.', {
      position: 'top-right',
      duration: 3000,
      style: { fontSize: '14px' },
    });
    return false;
  }
  return true;
};
