import toast from 'react-hot-toast';

export const validateComments = (text: string) => {
  const trimmedText = text.trim();
  if (!trimmedText) {
    toast.error('댓글 내용을 입력해주세요!', {
      position: 'top-right',
      duration: 4000,
      style: { fontSize: '14px' },
    });
    return false;
  }
  if (trimmedText.length < 2 || trimmedText.length > 2000) {
    toast.error('댓글은 2글자 이상 2000글자 미만으로 작성해주세요.', {
      position: 'top-right',
      duration: 4000,
      style: { fontSize: '14px' },
    });
    return false;
  }
  return true;
};
