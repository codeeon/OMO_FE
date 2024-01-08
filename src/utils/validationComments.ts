import toast from 'react-hot-toast';

export const validateComments = (text: string) => {
  const trimmedText = text.trim();
  if (!trimmedText) {
    toast.error('댓글 내용을 입력해주세요!', {
      position: 'bottom-right',
      duration: 4000,
    });
    return false;
  }
  if (trimmedText.length < 2 || trimmedText.length > 2000) {
    toast.error('2글자 이상 2000글자 미만으로 작성해주세요.', {
      position: 'bottom-right',
      duration: 4000,
    });
    return false;
  }
  return true;
};
