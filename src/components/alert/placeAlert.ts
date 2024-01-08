import toast from "react-hot-toast";

export const scopeAreaToast = () => {
  toast.error('지금은 서울시 내에서만 등록이 가능해요.', {
    position: 'bottom-right',
    duration: 4000,
  });
};
